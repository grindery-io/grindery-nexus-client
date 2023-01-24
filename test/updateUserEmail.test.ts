import axios from 'axios';
import NexusClient from '../src';
import { mockedToken, mockedEmail } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('updateUserEmail method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.updateUserEmail(mockedEmail)
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns true if user email was updated', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: true },
    });
    await expect(client.updateUserEmail(mockedEmail)).resolves.toBeTruthy();
  });
});
