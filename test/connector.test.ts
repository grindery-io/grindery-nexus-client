import axios from 'axios';
import GrinderyClient from '../src';
import {
  mockedConnector,
  mockedJsonRpcPayload,
  mockedToken,
  mockedWorkflow,
} from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('connector.get', () => {
  it('requires driver key', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.connector.get()
    ).rejects.toMatchObject({
      message: 'Driver key required',
    });
  });

  it("doesn't require token", async () => {
    const client = new GrinderyClient();
    mockedAxios.get.mockResolvedValue({
      data: mockedConnector,
    });
    await expect(
      client.connector.get(mockedConnector.key)
    ).resolves.toMatchObject(mockedConnector);
  });

  it('returns driver object on success', async () => {
    const client = new GrinderyClient();
    mockedAxios.get.mockResolvedValue({
      data: mockedConnector,
    });
    await expect(
      client.connector.get(mockedConnector.key)
    ).resolves.toMatchObject(mockedConnector);
  });

  it('returns null on fail', async () => {
    const client = new GrinderyClient();
    mockedAxios.get.mockRejectedValue(new Error('server error'));
    await expect(client.connector.get(mockedConnector.key)).resolves.toBeNull();
  });
});

describe('connector.list', () => {
  it("doesn't require token", async () => {
    const client = new GrinderyClient();
    mockedAxios.get.mockResolvedValue({
      data: { [mockedConnector.key]: mockedConnector },
    });
    await expect(client.connector.list()).resolves.toMatchObject([
      mockedConnector,
    ]);
  });

  it('returns an array on success', async () => {
    const client = new GrinderyClient();
    mockedAxios.get.mockResolvedValue({
      data: { [mockedConnector.key]: mockedConnector },
    });
    await expect(client.connector.list()).resolves.toMatchObject([
      mockedConnector,
    ]);
  });

  it('returns an empty array on fail', async () => {
    const client = new GrinderyClient();
    mockedAxios.get.mockRejectedValue(new Error('Server error'));
    await expect(client.connector.list()).resolves.toMatchObject([]);
  });
});

describe('connector.testAction method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.connector.testAction()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow step object', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.connector.testAction('', {})
    ).rejects.toMatchObject({
      message: 'Workflow step object is required',
    });
  });

  it('requires input object', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.connector.testAction(mockedWorkflow.trigger, '')
    ).rejects.toMatchObject({
      message: 'Sample input object is required',
    });
  });

  it('returns action execution payload on success', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {},
      },
    });
    await expect(
      client.connector.testAction(mockedWorkflow.trigger, {})
    ).resolves.toEqual({});
  });
});

describe('connector.runAction method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.connector.runAction()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow step object', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.connector.runAction('', {})
    ).rejects.toMatchObject({
      message: 'Workflow step object is required',
    });
  });

  it('requires input object', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.connector.runAction(mockedWorkflow.trigger, '')
    ).rejects.toMatchObject({
      message: 'Sample input object is required',
    });
  });

  it('returns action execution payload on success', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {},
      },
    });
    await expect(
      client.connector.runAction(mockedWorkflow.trigger, {})
    ).resolves.toEqual({});
  });
});

describe('connector.callInputProvider', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.connector.callInputProvider()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires connector key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.connector.callInputProvider('', '', {})
    ).rejects.toMatchObject({
      message: 'Connector key is required',
    });
  });

  it('requires operation key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.connector.callInputProvider('connectorKey', '', {})
    ).rejects.toMatchObject({
      message: 'Operation key is required',
    });
  });

  it('requires JSON RPC request object', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.connector.callInputProvider('connectorKey', 'operationKey', false)
    ).rejects.toMatchObject({
      message: 'JSON RPC request object is required',
    });
  });

  it('requires JSON RPC request object to have method', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.connector.callInputProvider('connectorKey', 'operationKey', {
        ...mockedJsonRpcPayload,
        method: '',
      })
    ).rejects.toMatchObject({
      message:
        'JSON RPC request object must have "method" property with value "grinderyNexusConnectorUpdateFields"',
    });
  });

  it('requires JSON RPC request object to have version 2.0', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.connector.callInputProvider('connectorKey', 'operationKey', {
        ...mockedJsonRpcPayload,
        jsonrpc: '1.0',
      })
    ).rejects.toMatchObject({
      message: 'JSON RPC request object must have 2.0 version',
    });
  });

  it('requires JSON RPC request object to have params.key property', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.connector.callInputProvider('connectorKey', 'operationKey', {
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
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.connector.callInputProvider('connectorKey', 'operationKey', {
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
    const client = new GrinderyClient(mockedToken);
    mockedAxios.request.mockResolvedValue({
      data: {
        result: {
          inputFields: [],
        },
      },
    });
    await expect(
      client.connector.callInputProvider(
        'connectorKey',
        'operationKey',
        mockedJsonRpcPayload
      )
    ).resolves.toEqual({ inputFields: [] });
  });
});

describe('connector.callWebhook', () => {
  it('requires connector key', async () => {
    const client = new GrinderyClient();
    await expect(
      client.connector.callWebhook('', '', {})
    ).rejects.toMatchObject({
      message: 'Connector key is required',
    });
  });

  it('requires operation key', async () => {
    const client = new GrinderyClient();
    await expect(
      client.connector.callWebhook('connectorKey', '', {})
    ).rejects.toMatchObject({
      message: 'Operation key is required',
    });
  });

  it('requires body object', async () => {
    const client = new GrinderyClient();
    await expect(
      client.connector.callWebhook('connectorKey', 'operationKey', false)
    ).rejects.toMatchObject({
      message: 'Body object is required',
    });
  });

  it('returns JSON RPC object on success request', async () => {
    const client = new GrinderyClient();
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
      client.connector.callWebhook('connectorKey', 'operationKey', {})
    ).resolves.toEqual({ jsonrpc: '2.0', result: {}, id: '1' });
  });
});
