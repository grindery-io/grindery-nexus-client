import axios from 'axios';
import NexusClient from '../src';
import { mockedJsonRpcPayload, mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
    client.authenticate(mockedToken);
    await expect(client.callInputProvider('', '', {})).rejects.toMatchObject({
      message: 'Connector key is required',
    });
  });

  it('requires operation key', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      client.callInputProvider('connectorKey', '', {})
    ).rejects.toMatchObject({
      message: 'Operation key is required',
    });
  });

  it('requires JSON RPC request object', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      client.callInputProvider('connectorKey', 'operationKey', false)
    ).rejects.toMatchObject({
      message: 'JSON RPC request object is required',
    });
  });

  it('requires JSON RPC request object to have method', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
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
    client.authenticate(mockedToken);
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
    client.authenticate(mockedToken);
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
    client.authenticate(mockedToken);
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
    client.authenticate(mockedToken);
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
