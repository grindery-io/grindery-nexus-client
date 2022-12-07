import axios from 'axios';
import NexusClient from '../src';
import { mockedEmail, mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('requestEarlyAccess', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.requestEarlyAccess()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires email', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(client.requestEarlyAccess('')).rejects.toMatchObject({
      message: 'Email is required',
    });
  });

  it('requires email to be valid', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      client.requestEarlyAccess('invalid@email')
    ).rejects.toMatchObject({
      message: 'Invalid email',
    });
  });

  it('returns true on success request', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(client.requestEarlyAccess(mockedEmail)).resolves.toEqual(true);
  });
});
