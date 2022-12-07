import axios from 'axios';
import NexusClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('leaveWorkspace', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.leaveWorkspace()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace key', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(client.leaveWorkspace('')).rejects.toMatchObject({
      message: 'Workspace key is required',
    });
  });

  it('returns left=true on success request', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          left: true,
        },
      },
    });
    await expect(client.leaveWorkspace('1')).resolves.toEqual({
      left: true,
    });
  });
});
