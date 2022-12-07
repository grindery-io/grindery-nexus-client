import axios from 'axios';
import NexusClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

  it('returns array on success', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({ data: { result: [] } });
    await expect(client.listWorkflows()).resolves.toEqual([]);
  });
});
