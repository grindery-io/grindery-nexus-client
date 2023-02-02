import axios from 'axios';
import GrinderyClient from '../src';
import { mockedEmail, mockedToken, mockedWalletAddress } from './mock';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('user.get method', () => {
  it('returns null if no token provided', () => {
    const client = new GrinderyClient();
    expect(client.user.get()).toBeNull();
  });

  it('returns user object', () => {
    const client = new GrinderyClient(mockedToken);
    expect(client.user.get()).toStrictEqual({
      id: 'eip155:1:0x4245cd11b5a9E54F57bE19B643E564AA4Ee86D1b',
      address: '0x4245cd11b5a9E54F57bE19B643E564AA4Ee86D1b',
      address_short: '0x4245...6D1b',
      workspace: null,
    });
  });
});

describe('user.hasEmail method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(client.user.hasEmail()).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns true if user has email', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: true },
    });
    await expect(client.user.hasEmail()).resolves.toEqual(true);
  });
});

describe('user.getEmail method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(client.user.getEmail()).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns email if exists', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: mockedEmail },
    });
    await expect(client.user.getEmail()).resolves.toEqual(mockedEmail);
  });

  it('returns null if email does not exist', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: null },
    });
    await expect(client.user.getEmail()).resolves.toBeNull();
  });
});

describe('user.delete method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(client.user.delete()).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns true if user email was updated', async () => {
    const client = new GrinderyClient(mockedToken);

    mockedAxios.post.mockResolvedValue({
      data: { result: true },
    });
    await expect(client.user.delete()).resolves.toBeTruthy();
  });
});

describe('user.isAllowed method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(client.user.isAllowed()).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns true if user account ID is allowed', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(client.user.isAllowed()).resolves.toEqual(true);
  });
});

describe('user.requestEarlyAccess method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(client.user.requestEarlyAccess('')).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires email', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(client.user.requestEarlyAccess('')).rejects.toMatchObject({
      message: 'Email is required',
    });
  });

  it('requires email to be valid', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.user.requestEarlyAccess('invalid@email')
    ).rejects.toMatchObject({
      message: 'Invalid email',
    });
  });

  it('returns true on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(client.user.requestEarlyAccess(mockedEmail)).resolves.toEqual(
      true
    );
  });
});

describe('user.saveWalletAddress method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(client.user.saveWalletAddress('')).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires wallet address', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(client.user.saveWalletAddress('')).rejects.toMatchObject({
      message: 'Wallet address is required',
    });
  });

  it('requires email to be valid', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.user.saveWalletAddress(mockedWalletAddress, 'invalid@email')
    ).rejects.toMatchObject({
      message: 'Invalid email',
    });
  });

  it('returns true on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      client.user.saveWalletAddress(mockedWalletAddress)
    ).resolves.toEqual(true);
  });

  it('returns true on success request with valid email', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      client.user.saveWalletAddress(mockedWalletAddress, mockedEmail)
    ).resolves.toEqual(true);
  });
});

describe('user.updateEmail method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(client.user.updateEmail(mockedEmail)).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns true if user email was updated', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: true },
    });
    await expect(client.user.updateEmail(mockedEmail)).resolves.toBeTruthy();
  });
});

describe('user.saveNotificationsState', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.user.saveNotificationsState()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires state string', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(client.user.saveNotificationsState('')).rejects.toMatchObject({
      message: 'Notifications state is required',
    });
  });

  it('returns true on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      client.user.saveNotificationsState('Allowed')
    ).resolves.toEqual(true);
  });
});
