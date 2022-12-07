import axios from 'axios';
import NexusClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('saveNotificationsState', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.saveNotificationsState()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires state string', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(client.saveNotificationsState('')).rejects.toMatchObject({
      message: 'Notifications state is required',
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
    await expect(client.saveNotificationsState('Allowed')).resolves.toEqual(
      true
    );
  });
});
