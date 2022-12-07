import axios from 'axios';
import NexusClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('createWorkspace', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.createWorkspace()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace title', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(client.createWorkspace({ title: '' })).rejects.toMatchObject({
      message: 'Workspace title is required',
    });
  });

  it('returns a workspace key on success request', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          key: '1',
        },
      },
    });
    await expect(client.listWorkspaces()).resolves.toEqual({
      key: '1',
    });
  });
});
