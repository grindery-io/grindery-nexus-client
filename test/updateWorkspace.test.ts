import axios from 'axios';
import NexusClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('updateWorkspace', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.updateWorkspace()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace key', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(client.updateWorkspace({ key: '' })).rejects.toMatchObject({
      message: 'Workspace key is required',
    });
  });

  it('requires admins to be an array', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      // @ts-ignore
      client.updateWorkspace({ key: '1', admins: 'admin' })
    ).rejects.toMatchObject({
      message: 'Admins must be an array',
    });
  });

  it('requires users to be an array', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      // @ts-ignore
      client.updateWorkspace({ key: '1', users: 'user' })
    ).rejects.toMatchObject({
      message: 'Users must be an array',
    });
  });

  it('returns a workspace object on success request', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          key: '1',
          title: 'New workspace title',
        },
      },
    });
    await expect(
      client.updateWorkspace({ key: '1', title: 'New workspace title' })
    ).resolves.toEqual({
      key: '1',
      title: 'New workspace title',
    });
  });
});
