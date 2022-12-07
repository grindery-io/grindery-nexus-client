import NexusClient from '../src';
import { mockedToken } from './mock';

describe('authenticate method', () => {
  it('requires token', () => {
    const client = new NexusClient();
    expect(() => {
      client.authenticate('');
    }).toThrow('Token required');
  });

  it('sets token', () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    expect(client.getToken()).toMatch(mockedToken);
  });
});
