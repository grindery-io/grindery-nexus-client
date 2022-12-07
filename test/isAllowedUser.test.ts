import axios from 'axios';
import NexusClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('isAllowedUser method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.isAllowedUser()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns true if user account ID is allowed', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(client.isAllowedUser()).resolves.toEqual(true);
  });
});
