import axios from 'axios';
import GrinderyClient from '../src';
import { mockedConnector, mockedCredentials, mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('credentials.list', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.credentials.list({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires connector id', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.credentials.list({})
    ).rejects.toMatchObject({
      message: 'Connector ID is required',
    });
  });

  it('requires environment', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.credentials.list({ connectorId: mockedConnector.key })
    ).rejects.toMatchObject({
      message: 'Environment is required',
    });
  });

  it('returns list of credentials on success', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: [mockedCredentials],
      },
    });
    await expect(
      client.credentials.list({
        connectorId: mockedConnector.key,
        environment: 'staging',
      })
    ).resolves.toEqual([mockedCredentials]);
  });
});

describe('credentials.update', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.credentials.update({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires credential key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.credentials.update({})
    ).rejects.toMatchObject({
      message: 'Credential key is required',
    });
  });

  it('requires display name', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.credentials.update({ key: mockedCredentials.key })
    ).rejects.toMatchObject({
      message: 'Display name is required',
    });
  });

  it('returns updated credentials on success', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { ...mockedCredentials, name: 'New Name' },
      },
    });
    await expect(
      client.credentials.update({
        key: mockedConnector.key,
        displayName: 'New Name',
      })
    ).resolves.toEqual({ ...mockedCredentials, name: 'New Name' });
  });
});
