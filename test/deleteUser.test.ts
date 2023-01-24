import axios from 'axios';
import NexusClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('deleteUser method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.deleteUser()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns true if user email was updated', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: true },
    });
    await expect(client.deleteUser()).resolves.toBeTruthy();
  });
});
