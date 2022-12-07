import axios from 'axios';
import NexusClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('listWorkspaces', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.listWorkspaces()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns array of workspaces on success request', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: [
          {
            key: '1',
            title: 'Workspace title',
          },
        ],
      },
    });
    await expect(client.listWorkspaces()).resolves.toEqual([
      {
        key: '1',
        title: 'Workspace title',
      },
    ]);
  });
});
