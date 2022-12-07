import axios from 'axios';
import NexusClient from '../src';
import { mockedEmail, mockedWalletAddress, mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('saveWalletAddress', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.saveWalletAddress()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires wallet address', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(client.saveWalletAddress('')).rejects.toMatchObject({
      message: 'Wallet address is required',
    });
  });

  it('requires email to be valid', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      client.saveWalletAddress(mockedWalletAddress, 'invalid@email')
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
    await expect(
      client.saveWalletAddress(mockedWalletAddress)
    ).resolves.toEqual(true);
  });

  it('returns true on success request with valid email', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      client.saveWalletAddress(mockedWalletAddress, mockedEmail)
    ).resolves.toEqual(true);
  });
});
