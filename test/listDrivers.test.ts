import axios from 'axios';
import NexusClient from '../src';
import { mockedConnector } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('listDrivers', () => {
  it("doesn't require token", async () => {
    const client = new NexusClient();
    mockedAxios.get.mockResolvedValue({
      data: { [mockedConnector.key]: mockedConnector },
    });
    await expect(client.listDrivers()).resolves.toMatchObject([
      mockedConnector,
    ]);
  });

  it('returns an array on success', async () => {
    const client = new NexusClient();
    mockedAxios.get.mockResolvedValue({
      data: { [mockedConnector.key]: mockedConnector },
    });
    await expect(client.listDrivers()).resolves.toMatchObject([
      mockedConnector,
    ]);
  });

  it('returns an empty array on fail', async () => {
    const client = new NexusClient();
    mockedAxios.get.mockRejectedValue(new Error('Server error'));
    await expect(client.listDrivers()).resolves.toMatchObject([]);
  });
});
