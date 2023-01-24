import axios from 'axios';
import NexusClient from '../src';
import { mockedEmail, mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getUserEmail method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.getUserEmail()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns email if exists', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: mockedEmail },
    });
    await expect(client.getUserEmail()).resolves.toEqual(mockedEmail);
  });

  it('returns null if email does not exist', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: null },
    });
    await expect(client.getUserEmail()).resolves.toBeNull();
  });
});
