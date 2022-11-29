import axios, { AxiosError } from 'axios';
import { Action, Blockchain, Connector, Field, Trigger } from './types';

const WORKFLOW_ENGINE_URL = 'https://orchestrator.grindery.org';

type ServerError = { error: any };

export const sendEngineRequest = async (
  method: string,
  params: unknown,
  token?: string | null
) => {
  const headers: any = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await axios.post(
      WORKFLOW_ENGINE_URL,
      {
        jsonrpc: '2.0',
        method: method,
        id: new Date(),
        params: params,
      },
      {
        headers,
      }
    );
    if (res && res.data && res.data.result) {
      return res.data.result;
    } else {
      throw new Error('Unknown error');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (
        serverError.response &&
        serverError.response.data &&
        serverError.response.data.error
      ) {
        throw new Error(serverError.response.data.error.message);
      }
    } else {
      throw new Error((error as Error).message);
    }
  }
};

export const sendEngineHTTPRequest = async (
  method: string,
  path: string,
  data: unknown,
  token?: string | null
) => {
  const headers: any = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await axios.request({
      method,
      url: WORKFLOW_ENGINE_URL + path,
      data,
      headers,
    });
    if (res && res.data && res.data.result) {
      return res.data.result;
    } else {
      throw new Error('Unknown error');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (
        serverError.response &&
        serverError.response.data &&
        serverError.response.data.error
      ) {
        throw new Error(serverError.response.data.error.message);
      }
    } else {
      throw new Error((error as Error).message);
    }
  }
};

export const enrichDriver = (
  connector: Connector,
  blockchains: Blockchain[]
) => {
  return {
    ...connector,
    triggers:
      connector.triggers?.map((trigger: Trigger) => {
        return {
          ...trigger,
          operation: {
            ...trigger.operation,
            inputFields: [
              ...(trigger.operation?.type === 'blockchain:event' &&
              (trigger.operation?.inputFields || []).filter(
                (field: Field) => field.key === '_grinderyChain'
              ).length < 1
                ? [
                    {
                      key: '_grinderyChain',
                      type: 'string',
                      label: 'Blockchain',
                      placeholder: 'Select a blockchain',
                      required: true,
                      choices: blockchains.map((chain: Blockchain) => ({
                        value: chain.value,
                        label: chain.label,
                        sample: chain.value,
                      })),
                    },
                  ]
                : []),
              ...(trigger.operation?.type === 'blockchain:event' &&
              (trigger.operation?.inputFields || []).filter(
                (field: Field) => field.key === '_grinderyContractAddress'
              ).length < 1
                ? [
                    {
                      key: '_grinderyContractAddress',
                      type: 'string',
                      label: 'Contract address',
                      placeholder: 'Enter contract address',
                      required: true,
                    },
                  ]
                : []),
              ...(trigger.operation?.inputFields || []),
            ],
          },
        };
      }) || [],
    actions:
      connector.actions?.map((action: Action) => {
        return {
          ...action,
          operation: {
            ...action.operation,
            inputFields: [
              ...(action.operation?.type === 'blockchain:call' &&
              (action.operation?.inputFields || []).filter(
                (field: Field) => field.key === '_grinderyChain'
              ).length < 1
                ? [
                    {
                      key: '_grinderyChain',
                      type: 'string',
                      label: 'Blockchain',
                      placeholder: 'Select a blockchain',
                      required: true,
                      choices: blockchains.map((chain: Blockchain) => ({
                        value: chain.value,
                        label: chain.label,
                        sample: chain.value,
                      })),
                    },
                  ]
                : []),
              ...(action.operation?.type === 'blockchain:call' &&
              (action.operation?.inputFields || []).filter(
                (field: Field) => field.key === '_grinderyContractAddress'
              ).length < 1
                ? [
                    {
                      key: '_grinderyContractAddress',
                      type: 'string',
                      label: 'Contract address',
                      placeholder: 'Enter contract address',
                      required: true,
                    },
                  ]
                : []),
              ...(action.operation?.inputFields || []),
            ],
          },
        };
      }) || [],
  };
};
