import axios, { AxiosError } from 'axios';

const WORKFLOW_ENGINE_URL = 'https://orchestrator.grindery.org/';

type ServerError = { error: any };

export const sendEngineRequest = async (method: string, params: unknown) => {
  try {
    const res = await axios.post(WORKFLOW_ENGINE_URL, {
      jsonrpc: '2.0',
      method: method,
      id: new Date(),
      params: params,
    });
    if (res && res.data && res.data.error) {
      throw new Error(res.data.error);
    }
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
        throw new Error(serverError.response.data.error);
      }
    } else {
      throw new Error((error as Error).message);
    }
  }
};
