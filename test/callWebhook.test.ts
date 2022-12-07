import axios from 'axios';
import NexusClient from '../src';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
