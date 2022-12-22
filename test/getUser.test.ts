import NexusClient from '../src';
import { mockedToken } from './mock';

describe('getUser method', () => {
  it('requires token', () => {
    const client = new NexusClient();
    expect(client.getUser()).toBeNull();
  });

  it('returns user ID, address, short_address and null', () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    expect(client.getUser()).toMatchObject({
      id: 'eip155:1:0x4245cd11b5a9E54F57bE19B643E564AA4Ee86D1b',
      address: '0x4245cd11b5a9E54F57bE19B643E564AA4Ee86D1b',
      address_short: '0x4245...6D1b',
      workspace: null,
    });
  });
});
