import axios from 'axios';
import NexusClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('removeAdminFromWorkspace', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.removeAdminFromWorkspace()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace key', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      client.removeAdminFromWorkspace('', 'userId')
    ).rejects.toMatchObject({
      message: 'Workspace key is required',
    });
  });

  it('requires user ID', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      client.removeAdminFromWorkspace('1', '')
    ).rejects.toMatchObject({
      message: 'User ID is required',
    });
  });

  it('returns workspace object on success request', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          key: '1',
          title: 'Workspace',
        },
      },
    });
    await expect(
      client.removeAdminFromWorkspace('1', 'userId')
    ).resolves.toEqual({
      key: '1',
      title: 'Workspace',
    });
  });
});
