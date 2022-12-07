import axios from 'axios';
import NexusClient from '../src';
import { mockedConnector } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getDriver', () => {
  it('requires driver key', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.getDriver()
    ).rejects.toMatchObject({
      message: 'Driver key required',
    });
  });

  it("doesn't require token", async () => {
    const client = new NexusClient();
    mockedAxios.get.mockResolvedValue({
      data: mockedConnector,
    });
    await expect(client.getDriver(mockedConnector.key)).resolves.toMatchObject(
      mockedConnector
    );
  });

  it('returns driver object on success', async () => {
    const client = new NexusClient();
    mockedAxios.get.mockResolvedValue({
      data: mockedConnector,
    });
    await expect(client.getDriver(mockedConnector.key)).resolves.toMatchObject(
      mockedConnector
    );
  });

  it('returns null on fail', async () => {
    const client = new NexusClient();
    mockedAxios.get.mockRejectedValue(new Error('server error'));
    await expect(client.getDriver(mockedConnector.key)).resolves.toBeNull();
  });
});
