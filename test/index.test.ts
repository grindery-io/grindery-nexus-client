import axios from 'axios';
import NexusClient from '../src';
import { sendEngineHTTPRequest, sendEngineRequest } from '../src/utils';
import {
  mockedWorkflowKey,
  mockedUserAccountId,
  mockedWorkflow,
  mockedWorkflowExecutionId,
  mockedConnector,
  mockedWeb2CconnectorsPath,
  mockedWeb3CconnectorsPath,
  mockedEmail,
  mockedWalletAddress,
  mockedJsonRpcPayload,
} from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('createWorkflow method', () => {
  it('requires workflow object', async () => {
    await expect(
      // @ts-ignore
      NexusClient.createWorkflow()
    ).rejects.toMatchObject({
      message: 'Workflow object is required',
    });
  });

  it('requires workflow to have creator', async () => {
    await expect(
      NexusClient.createWorkflow({ ...mockedWorkflow, creator: '' })
    ).rejects.toMatchObject({
      message: 'Workflow creator is required',
    });
  });

  it('returns new workflow key on success', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { result: { key: mockedWorkflowKey } },
    });
    await expect(NexusClient.createWorkflow(mockedWorkflow)).resolves.toEqual({
      key: mockedWorkflowKey,
    });
  });
});

describe('listWorkflows method', () => {
  it('requires user account id', async () => {
    await expect(NexusClient.listWorkflows('')).rejects.toMatchObject({
      message: 'User account id is required',
    });
  });

  it('returns array on success', async () => {
    mockedAxios.post.mockResolvedValue({ data: { result: [] } });
    await expect(
      NexusClient.listWorkflows(mockedUserAccountId)
    ).resolves.toEqual([]);
  });
});

describe('updateWorkflow method', () => {
  it('requires user account id', async () => {
    await expect(
      NexusClient.updateWorkflow(mockedWorkflowKey, '', mockedWorkflow)
    ).rejects.toMatchObject({
      message: 'User account id is required',
    });
  });

  it('requires workflow key', async () => {
    await expect(
      NexusClient.updateWorkflow('', mockedUserAccountId, mockedWorkflow)
    ).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('requires workflow to have creator', async () => {
    await expect(
      NexusClient.updateWorkflow(mockedWorkflowKey, mockedUserAccountId, {
        title: '',
        trigger: {
          type: 'trigger',
          connector: '',
          operation: '',
          input: {
            field1: '1',
          },
        },
        actions: [],
        creator: '',
      })
    ).rejects.toMatchObject({
      message: 'Workflow creator is required',
    });
  });

  it('returns workflow key on success', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { result: { key: mockedWorkflowKey } },
    });
    await expect(
      NexusClient.updateWorkflow(
        mockedWorkflowKey,
        mockedUserAccountId,
        mockedWorkflow
      )
    ).resolves.toEqual({ key: mockedWorkflowKey });
  });
});

describe('getWorkflowExecutions method', () => {
  it('requires workflow key', async () => {
    await expect(NexusClient.getWorkflowExecutions('')).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns an array of workflow execution IDs on success ', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: [
          {
            executionId: mockedWorkflowExecutionId,
          },
        ],
      },
    });
    await expect(
      NexusClient.getWorkflowExecutions(mockedWorkflowKey)
    ).resolves.toEqual([
      {
        executionId: mockedWorkflowExecutionId,
      },
    ]);
  });
});

describe('getWorkflowExecutionLog method', () => {
  it('requires workflow execution ID', async () => {
    await expect(NexusClient.getWorkflowExecutionLog('')).rejects.toMatchObject(
      {
        message: 'Workflow execution ID is required',
      }
    );
  });

  it('returns an array of executed workflow steps ', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: [
          {
            executionId: mockedWorkflowExecutionId,
          },
        ],
      },
    });
    await expect(
      NexusClient.getWorkflowExecutionLog(mockedWorkflowExecutionId)
    ).resolves.toEqual([
      {
        executionId: mockedWorkflowExecutionId,
      },
    ]);
  });
});

describe('isAllowedUser method', () => {
  it('requires user account ID', async () => {
    await expect(NexusClient.isAllowedUser('')).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('returns true if user account ID is allowed', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      NexusClient.isAllowedUser(mockedUserAccountId)
    ).resolves.toEqual(true);
  });
});

describe('testAction method', () => {
  it('requires user account ID', async () => {
    await expect(
      NexusClient.testAction('', mockedWorkflow.trigger, {})
    ).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('requires workflow step object', async () => {
    await expect(
      // @ts-ignore
      NexusClient.testAction(mockedUserAccountId, '', {})
    ).rejects.toMatchObject({
      message: 'Workflow step object is required',
    });
  });

  it('requires input object', async () => {
    await expect(
      // @ts-ignore
      NexusClient.testAction(mockedUserAccountId, mockedWorkflow.trigger, '')
    ).rejects.toMatchObject({
      message: 'Sample input object is required',
    });
  });

  it('returns action execution payload on success', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {},
      },
    });
    await expect(
      NexusClient.testAction(mockedUserAccountId, mockedWorkflow.trigger, {})
    ).resolves.toEqual({});
  });
});

describe('getConnectors method', () => {
  it('returns empty array if no connectors found', async () => {
    mockedAxios.get.mockImplementation(url => {
      switch (url) {
        case mockedWeb2CconnectorsPath:
          return Promise.resolve({
            data: [{}],
          });
        case mockedWeb3CconnectorsPath:
          return Promise.resolve({
            data: [{}],
          });
        default:
          return Promise.resolve({ data: mockedConnector });
      }
    });
    await expect(NexusClient.getConnectors()).resolves.toEqual([]);
  });

  it('returns array of connectors on success', async () => {
    mockedAxios.get.mockImplementation(url => {
      switch (url) {
        case mockedWeb2CconnectorsPath:
          return Promise.resolve({
            data: [{ download_url: '/connector-file-url' }],
          });
        case mockedWeb3CconnectorsPath:
          return Promise.resolve({
            data: [{ download_url: '/connector-file-url' }],
          });
        default:
          return Promise.resolve({ data: mockedConnector });
      }
    });
    await expect(NexusClient.getConnectors()).resolves.toEqual([
      mockedConnector,
      mockedConnector,
    ]);
  });
});

describe('deleteWorkflow', () => {
  it('requires user account ID', async () => {
    await expect(
      NexusClient.deleteWorkflow('', mockedWorkflowKey)
    ).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('requires workflow key', async () => {
    await expect(
      NexusClient.deleteWorkflow(mockedUserAccountId, '')
    ).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns true on success deletion', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { deleted: true },
      },
    });
    await expect(
      NexusClient.deleteWorkflow(mockedUserAccountId, mockedWorkflowKey)
    ).resolves.toEqual({ deleted: true });
  });

  it('returns false on failed deletion', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { deleted: false },
      },
    });
    await expect(
      NexusClient.deleteWorkflow(mockedUserAccountId, mockedWorkflowKey)
    ).resolves.toEqual({ deleted: false });
  });
});

describe('requestEarlyAccess', () => {
  it('requires user account ID', async () => {
    await expect(
      NexusClient.requestEarlyAccess('', mockedEmail)
    ).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('requires email', async () => {
    await expect(
      NexusClient.requestEarlyAccess(mockedUserAccountId, '')
    ).rejects.toMatchObject({
      message: 'Email is required',
    });
  });

  it('requires email to be valid', async () => {
    await expect(
      NexusClient.requestEarlyAccess(mockedUserAccountId, 'invalid@email')
    ).rejects.toMatchObject({
      message: 'Invalid email',
    });
  });

  it('returns true on success request', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      NexusClient.requestEarlyAccess(mockedUserAccountId, mockedEmail)
    ).resolves.toEqual(true);
  });
});

describe('saveWalletAddress', () => {
  it('requires user account ID', async () => {
    await expect(
      NexusClient.saveWalletAddress('', mockedWalletAddress)
    ).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('requires wallet address', async () => {
    await expect(
      NexusClient.saveWalletAddress(mockedUserAccountId, '')
    ).rejects.toMatchObject({
      message: 'Wallet address is required',
    });
  });

  it('requires email to be valid', async () => {
    await expect(
      NexusClient.saveWalletAddress(
        mockedUserAccountId,
        mockedWalletAddress,
        'invalid@email'
      )
    ).rejects.toMatchObject({
      message: 'Invalid email',
    });
  });

  it('returns true on success request', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      NexusClient.saveWalletAddress(mockedUserAccountId, mockedWalletAddress)
    ).resolves.toEqual(true);
  });

  it('returns true on success request with valid email', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      NexusClient.saveWalletAddress(
        mockedUserAccountId,
        mockedWalletAddress,
        mockedEmail
      )
    ).resolves.toEqual(true);
  });
});

describe('callInputProvider', () => {
  it('requires connector key', async () => {
    await expect(
      NexusClient.callInputProvider('', '', {})
    ).rejects.toMatchObject({
      message: 'Connector key is required',
    });
  });

  it('requires operation key', async () => {
    await expect(
      NexusClient.callInputProvider('connectorKey', '', {})
    ).rejects.toMatchObject({
      message: 'Operation key is required',
    });
  });

  it('requires JSON RPC request object', async () => {
    await expect(
      NexusClient.callInputProvider('connectorKey', 'operationKey', false)
    ).rejects.toMatchObject({
      message: 'JSON RPC request object is required',
    });
  });

  it('requires JSON RPC request object to have method', async () => {
    await expect(
      NexusClient.callInputProvider('connectorKey', 'operationKey', {
        ...mockedJsonRpcPayload,
        method: '',
      })
    ).rejects.toMatchObject({
      message:
        'JSON RPC request object must have "method" property with value "grinderyNexusConnectorUpdateFields"',
    });
  });

  it('requires JSON RPC request object to have version 2.0', async () => {
    await expect(
      NexusClient.callInputProvider('connectorKey', 'operationKey', {
        ...mockedJsonRpcPayload,
        jsonrpc: '1.0',
      })
    ).rejects.toMatchObject({
      message: 'JSON RPC request object must have 2.0 version',
    });
  });

  it('requires JSON RPC request object to have params.key property', async () => {
    await expect(
      NexusClient.callInputProvider('connectorKey', 'operationKey', {
        ...mockedJsonRpcPayload,
        params: {
          key: '',
        },
      })
    ).rejects.toMatchObject({
      message:
        'JSON RPC request object must have "params" property with operation key specified',
    });
  });

  it('requires JSON RPC request params key property to match operation key', async () => {
    await expect(
      NexusClient.callInputProvider('connectorKey', 'operationKey', {
        ...mockedJsonRpcPayload,
        params: {
          key: 'notOperationKey',
        },
      })
    ).rejects.toMatchObject({
      message:
        'JSON RPC request object params "key" property must be equal to operationKey',
    });
  });

  it('returns input fields schema on success request', async () => {
    mockedAxios.request.mockResolvedValue({
      data: {
        result: {
          inputFields: [],
        },
      },
    });
    await expect(
      NexusClient.callInputProvider(
        'connectorKey',
        'operationKey',
        mockedJsonRpcPayload
      )
    ).resolves.toEqual({ inputFields: [] });
  });
});

describe('callWebhook', () => {
  it('requires connector key', async () => {
    await expect(NexusClient.callWebhook('', '', {})).rejects.toMatchObject({
      message: 'Connector key is required',
    });
  });

  it('requires operation key', async () => {
    await expect(
      NexusClient.callWebhook('connectorKey', '', {})
    ).rejects.toMatchObject({
      message: 'Operation key is required',
    });
  });

  it('requires body object', async () => {
    await expect(
      NexusClient.callWebhook('connectorKey', 'operationKey', false)
    ).rejects.toMatchObject({
      message: 'Body object is required',
    });
  });

  it('returns JSON RPC object on success request', async () => {
    mockedAxios.request.mockResolvedValue({
      data: {
        result: {
          jsonrpc: '2.0',
          result: {},
          id: '1',
        },
      },
    });
    await expect(
      NexusClient.callWebhook('connectorKey', 'operationKey', {})
    ).resolves.toEqual({ jsonrpc: '2.0', result: {}, id: '1' });
  });
});

describe('sendEngineRequest utility function', () => {
  it('returns error on failed request', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Something went wrong'));
    await expect(sendEngineRequest('method_name', {})).rejects.toThrow(
      new Error('Something went wrong')
    );
  });

  it('returns error message on server error', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Server error'));
    await expect(sendEngineRequest('method_name', {})).rejects.toThrow(
      new Error('Server error')
    );
  });

  it('returns unknown error on unexpected response', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        something: {},
      },
    });
    await expect(sendEngineRequest('method_name', {})).rejects.toThrow(
      new Error('Unknown error')
    );
  });

  it('resolves on success request', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {},
      },
    });
    await expect(sendEngineRequest('method_name', {})).resolves.toEqual({});
  });
});

describe('sendEngineHTTPRequest utility function', () => {
  it('returns error on failed request', async () => {
    mockedAxios.request.mockRejectedValue(new Error('Unknown error'));
    await expect(sendEngineHTTPRequest('POST', '/path', {})).rejects.toThrow(
      new Error('Unknown error')
    );
  });

  it('returns error message on server error', async () => {
    mockedAxios.request.mockRejectedValue(new Error('Server error'));

    await expect(sendEngineHTTPRequest('POST', '/path', {})).rejects.toThrow(
      new Error('Server error')
    );
  });

  it('returns unknown error on unexpected response', async () => {
    mockedAxios.request.mockResolvedValue({
      data: {
        something: {},
      },
    });
    await expect(sendEngineHTTPRequest('POST', '/path', {})).rejects.toThrow(
      new Error('Unknown error')
    );
  });

  it('resolves on success request', async () => {
    mockedAxios.request.mockResolvedValue({
      data: {
        result: {},
      },
    });
    await expect(sendEngineHTTPRequest('POST', '/path', {})).resolves.toEqual(
      {}
    );
  });
});
