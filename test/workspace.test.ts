import axios from 'axios';
import GrinderyClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('workspace.list', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workspace.list()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns array of workspaces on success request', async () => {
    const client = new GrinderyClient(mockedToken);
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
    await expect(client.workspace.list()).resolves.toEqual([
      {
        key: '1',
        title: 'Workspace title',
      },
    ]);
  });
});

describe('workspace.create', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workspace.create({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace title', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workspace.create({ workspace: { title: '' } })
    ).rejects.toMatchObject({
      message: 'Workspace title is required',
    });
  });

  it('returns a workspace key on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          key: '1',
        },
      },
    });
    await expect(
      client.workspace.create({ workspace: { title: 'test' } })
    ).resolves.toEqual({
      key: '1',
    });
  });
});

describe('workspace.update', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workspace.update({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workspace.update({ workspace: { key: '' } })
    ).rejects.toMatchObject({
      message: 'Workspace key is required',
    });
  });

  it('requires admins to be an array', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.workspace.update({ workspace: { key: '1', admins: 'admin' } })
    ).rejects.toMatchObject({
      message: 'Admins must be an array',
    });
  });

  it('requires users to be an array', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.workspace.update({ workspace: { key: '1', users: 'user' } })
    ).rejects.toMatchObject({
      message: 'Users must be an array',
    });
  });

  it('returns a workspace object on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          key: '1',
          title: 'New workspace title',
        },
      },
    });
    await expect(
      client.workspace.update({
        workspace: { key: '1', title: 'New workspace title' },
      })
    ).resolves.toEqual({
      key: '1',
      title: 'New workspace title',
    });
  });
});

describe('workspace.leave', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workspace.leave({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(client.workspace.leave({ key: '' })).rejects.toMatchObject({
      message: 'Workspace key is required',
    });
  });

  it('returns left=true on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          left: true,
        },
      },
    });
    await expect(client.workspace.leave({ key: '1' })).resolves.toEqual({
      left: true,
    });
  });
});

describe('workspace.delete', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workspace.delete({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(client.workspace.delete({ key: '' })).rejects.toMatchObject({
      message: 'Workspace key is required',
    });
  });

  it('returns true on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(client.workspace.delete({ key: '1' })).resolves.toEqual(true);
  });
});

describe('workspace.addUser', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workspace.addUser({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workspace.addUser({ key: '', userAccountId: 'userId' })
    ).rejects.toMatchObject({
      message: 'Workspace key is required',
    });
  });

  it('requires user ID', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workspace.addUser({ key: '1', userAccountId: '' })
    ).rejects.toMatchObject({
      message: 'User ID is required',
    });
  });

  it('returns workspace object on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          key: '1',
          title: 'Workspace',
        },
      },
    });
    await expect(
      client.workspace.addUser({ key: '1', userAccountId: 'userId' })
    ).resolves.toEqual({
      key: '1',
      title: 'Workspace',
    });
  });
});

describe('workspace.removeUser', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workspace.removeUser({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workspace.removeUser({ key: '', userAccountId: 'userId' })
    ).rejects.toMatchObject({
      message: 'Workspace key is required',
    });
  });

  it('requires user ID', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workspace.removeUser({ key: '1', userAccountId: '' })
    ).rejects.toMatchObject({
      message: 'User ID is required',
    });
  });

  it('returns workspace object on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          key: '1',
          title: 'Workspace',
        },
      },
    });
    await expect(
      client.workspace.removeUser({ key: '1', userAccountId: 'userId' })
    ).resolves.toEqual({
      key: '1',
      title: 'Workspace',
    });
  });
});

describe('workspace.addAdmin', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workspace.addAdmin({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workspace.addAdmin({ key: '', userAccountId: 'userId' })
    ).rejects.toMatchObject({
      message: 'Workspace key is required',
    });
  });

  it('requires user ID', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workspace.addAdmin({ key: '1', userAccountId: '' })
    ).rejects.toMatchObject({
      message: 'User ID is required',
    });
  });

  it('returns workspace object on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          key: '1',
          title: 'Workspace',
        },
      },
    });
    await expect(
      client.workspace.addAdmin({ key: '1', userAccountId: 'userId' })
    ).resolves.toEqual({
      key: '1',
      title: 'Workspace',
    });
  });
});

describe('workspace.removeAdmin', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workspace.removeAdmin({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workspace key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workspace.removeAdmin({ key: '', userAccountId: 'userId' })
    ).rejects.toMatchObject({
      message: 'Workspace key is required',
    });
  });

  it('requires user ID', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workspace.removeAdmin({ key: '1', userAccountId: '' })
    ).rejects.toMatchObject({
      message: 'User ID is required',
    });
  });

  it('returns workspace object on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {
          key: '1',
          title: 'Workspace',
        },
      },
    });
    await expect(
      client.workspace.removeAdmin({ key: '1', userAccountId: 'userId' })
    ).resolves.toEqual({
      key: '1',
      title: 'Workspace',
    });
  });
});
