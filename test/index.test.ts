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

describe('authenticate method', () => {
  it('requires token', () => {
    const client = new NexusClient();
    expect(() => {
      client.authenticate('');
    }).toThrow('Token required');
  });

  it('sets token', () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    expect(client.getToken()).toMatch('userToken');
  });
});

describe('getToken method', () => {
  it('requires token', () => {
    const client = new NexusClient();
    expect(() => {
      return client.getToken();
    }).toThrow('Authentication required');
  });

  it('returns token', () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    expect(client.getToken()).toMatch('userToken');
  });
});

describe('createWorkflow method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.createWorkflow()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow object', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      // @ts-ignore
      client.createWorkflow()
    ).rejects.toMatchObject({
      message: 'Workflow object is required',
    });
  });

  it('requires workflow to have creator', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.createWorkflow({ ...mockedWorkflow, creator: '' })
    ).rejects.toMatchObject({
      message: 'Workflow creator is required',
    });
  });

  it('returns new workflow key on success', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    mockedAxios.post.mockResolvedValue({
      data: { result: { key: mockedWorkflowKey } },
    });
    await expect(client.createWorkflow(mockedWorkflow)).resolves.toEqual({
      key: mockedWorkflowKey,
    });
  });
});

describe('listWorkflows method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.listWorkflows()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires user account id', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(client.listWorkflows('')).rejects.toMatchObject({
      message: 'User account id is required',
    });
  });

  it('returns array on success', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    mockedAxios.post.mockResolvedValue({ data: { result: [] } });
    await expect(client.listWorkflows(mockedUserAccountId)).resolves.toEqual(
      []
    );
  });
});

describe('updateWorkflow method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.updateWorkflow()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires user account id', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.updateWorkflow(mockedWorkflowKey, '', mockedWorkflow)
    ).rejects.toMatchObject({
      message: 'User account id is required',
    });
  });

  it('requires workflow key', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.updateWorkflow('', mockedUserAccountId, mockedWorkflow)
    ).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('requires workflow to have creator', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.updateWorkflow(mockedWorkflowKey, mockedUserAccountId, {
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
    const client = new NexusClient();
    client.authenticate('userToken');
    mockedAxios.post.mockResolvedValue({
      data: { result: { key: mockedWorkflowKey } },
    });
    await expect(
      client.updateWorkflow(
        mockedWorkflowKey,
        mockedUserAccountId,
        mockedWorkflow
      )
    ).resolves.toEqual({ key: mockedWorkflowKey });
  });
});

describe('getWorkflowExecutions method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.getWorkflowExecutions()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow key', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(client.getWorkflowExecutions('')).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns an array of workflow execution IDs on success ', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
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
      client.getWorkflowExecutions(mockedWorkflowKey)
    ).resolves.toEqual([
      {
        executionId: mockedWorkflowExecutionId,
      },
    ]);
  });
});

describe('getWorkflowExecutionLog method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.getWorkflowExecutionLog()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow execution ID', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(client.getWorkflowExecutionLog('')).rejects.toMatchObject({
      message: 'Workflow execution ID is required',
    });
  });

  it('returns an array of executed workflow steps ', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
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
      client.getWorkflowExecutionLog(mockedWorkflowExecutionId)
    ).resolves.toEqual([
      {
        executionId: mockedWorkflowExecutionId,
      },
    ]);
  });
});

describe('isAllowedUser method', () => {
  it('does not requires authentication', async () => {
    const client = new NexusClient();
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(client.isAllowedUser(mockedUserAccountId)).resolves.toEqual(
      true
    );
  });

  it('requires user account ID', async () => {
    const client = new NexusClient();
    await expect(client.isAllowedUser('')).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('returns true if user account ID is allowed', async () => {
    const client = new NexusClient();
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(client.isAllowedUser(mockedUserAccountId)).resolves.toEqual(
      true
    );
  });
});

describe('testAction method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.testAction()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires user account ID', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.testAction('', mockedWorkflow.trigger, {})
    ).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('requires workflow step object', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      // @ts-ignore
      client.testAction(mockedUserAccountId, '', {})
    ).rejects.toMatchObject({
      message: 'Workflow step object is required',
    });
  });

  it('requires input object', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      // @ts-ignore
      client.testAction(mockedUserAccountId, mockedWorkflow.trigger, '')
    ).rejects.toMatchObject({
      message: 'Sample input object is required',
    });
  });

  it('returns action execution payload on success', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {},
      },
    });
    await expect(
      client.testAction(mockedUserAccountId, mockedWorkflow.trigger, {})
    ).resolves.toEqual({});
  });
});

describe('getConnectors method', () => {
  it('returns empty array if no connectors found', async () => {
    const client = new NexusClient();
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
    await expect(client.getConnectors()).resolves.toEqual([]);
  });

  it('returns array of connectors on success', async () => {
    const client = new NexusClient();
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
    await expect(client.getConnectors()).resolves.toEqual([
      mockedConnector,
      mockedConnector,
    ]);
  });
});

describe('deleteWorkflow', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.deleteWorkflow()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires user account ID', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.deleteWorkflow('', mockedWorkflowKey)
    ).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('requires workflow key', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.deleteWorkflow(mockedUserAccountId, '')
    ).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns true on success deletion', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { deleted: true },
      },
    });
    await expect(
      client.deleteWorkflow(mockedUserAccountId, mockedWorkflowKey)
    ).resolves.toEqual({ deleted: true });
  });

  it('returns false on failed deletion', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { deleted: false },
      },
    });
    await expect(
      client.deleteWorkflow(mockedUserAccountId, mockedWorkflowKey)
    ).resolves.toEqual({ deleted: false });
  });
});

describe('requestEarlyAccess', () => {
  it('requires user account ID', async () => {
    const client = new NexusClient();
    await expect(
      client.requestEarlyAccess('', mockedEmail)
    ).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('requires email', async () => {
    const client = new NexusClient();
    await expect(
      client.requestEarlyAccess(mockedUserAccountId, '')
    ).rejects.toMatchObject({
      message: 'Email is required',
    });
  });

  it('requires email to be valid', async () => {
    const client = new NexusClient();
    await expect(
      client.requestEarlyAccess(mockedUserAccountId, 'invalid@email')
    ).rejects.toMatchObject({
      message: 'Invalid email',
    });
  });

  it('returns true on success request', async () => {
    const client = new NexusClient();
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      client.requestEarlyAccess(mockedUserAccountId, mockedEmail)
    ).resolves.toEqual(true);
  });
});

describe('saveWalletAddress', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.saveWalletAddress()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires user account ID', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.saveWalletAddress('', mockedWalletAddress)
    ).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('requires wallet address', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.saveWalletAddress(mockedUserAccountId, '')
    ).rejects.toMatchObject({
      message: 'Wallet address is required',
    });
  });

  it('requires email to be valid', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.saveWalletAddress(
        mockedUserAccountId,
        mockedWalletAddress,
        'invalid@email'
      )
    ).rejects.toMatchObject({
      message: 'Invalid email',
    });
  });

  it('returns true on success request', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      client.saveWalletAddress(mockedUserAccountId, mockedWalletAddress)
    ).resolves.toEqual(true);
  });

  it('returns true on success request with valid email', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      client.saveWalletAddress(
        mockedUserAccountId,
        mockedWalletAddress,
        mockedEmail
      )
    ).resolves.toEqual(true);
  });
});

describe('callInputProvider', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.callInputProvider()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires connector key', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(client.callInputProvider('', '', {})).rejects.toMatchObject({
      message: 'Connector key is required',
    });
  });

  it('requires operation key', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.callInputProvider('connectorKey', '', {})
    ).rejects.toMatchObject({
      message: 'Operation key is required',
    });
  });

  it('requires JSON RPC request object', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.callInputProvider('connectorKey', 'operationKey', false)
    ).rejects.toMatchObject({
      message: 'JSON RPC request object is required',
    });
  });

  it('requires JSON RPC request object to have method', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.callInputProvider('connectorKey', 'operationKey', {
        ...mockedJsonRpcPayload,
        method: '',
      })
    ).rejects.toMatchObject({
      message:
        'JSON RPC request object must have "method" property with value "grinderyNexusConnectorUpdateFields"',
    });
  });

  it('requires JSON RPC request object to have version 2.0', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.callInputProvider('connectorKey', 'operationKey', {
        ...mockedJsonRpcPayload,
        jsonrpc: '1.0',
      })
    ).rejects.toMatchObject({
      message: 'JSON RPC request object must have 2.0 version',
    });
  });

  it('requires JSON RPC request object to have params.key property', async () => {
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.callInputProvider('connectorKey', 'operationKey', {
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
    const client = new NexusClient();
    client.authenticate('userToken');
    await expect(
      client.callInputProvider('connectorKey', 'operationKey', {
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
    const client = new NexusClient();
    client.authenticate('userToken');
    mockedAxios.request.mockResolvedValue({
      data: {
        result: {
          inputFields: [],
        },
      },
    });
    await expect(
      client.callInputProvider(
        'connectorKey',
        'operationKey',
        mockedJsonRpcPayload
      )
    ).resolves.toEqual({ inputFields: [] });
  });
});

describe('callWebhook', () => {
  it('requires connector key', async () => {
    const client = new NexusClient();
    await expect(client.callWebhook('', '', {})).rejects.toMatchObject({
      message: 'Connector key is required',
    });
  });

  it('requires operation key', async () => {
    const client = new NexusClient();
    await expect(
      client.callWebhook('connectorKey', '', {})
    ).rejects.toMatchObject({
      message: 'Operation key is required',
    });
  });

  it('requires body object', async () => {
    const client = new NexusClient();
    await expect(
      client.callWebhook('connectorKey', 'operationKey', false)
    ).rejects.toMatchObject({
      message: 'Body object is required',
    });
  });

  it('returns JSON RPC object on success request', async () => {
    const client = new NexusClient();
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
      client.callWebhook('connectorKey', 'operationKey', {})
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
