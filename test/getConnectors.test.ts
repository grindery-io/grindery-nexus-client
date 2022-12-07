import axios from 'axios';
import NexusClient from '../src';
import {
  mockedConnector,
  mockedWeb2CconnectorsPath,
  mockedWeb3CconnectorsPath,
} from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getConnectors method', () => {
  it('returns empty array if no connectors found', async () => {
    const client = new NexusClient();
    mockedAxios.get.mockImplementation(url => {
      switch (url) {
        case mockedWeb2CconnectorsPath:
          return Promise.resolve({
            data: [{}],
          });
        case mockedWeb3CconnectorsPath:
          return Promise.resolve({
            data: [{}],
          });
        default:
          return Promise.resolve({ data: mockedConnector });
      }
    });
    await expect(client.getConnectors()).resolves.toEqual([]);
  });

  it('returns array of connectors on success', async () => {
    const client = new NexusClient();
    mockedAxios.get.mockImplementation(url => {
      switch (url) {
        case mockedWeb2CconnectorsPath:
          return Promise.resolve({
            data: [{ download_url: '/connector-file-url' }],
          });
        case mockedWeb3CconnectorsPath:
          return Promise.resolve({
            data: [{ download_url: '/connector-file-url' }],
          });
        default:
          return Promise.resolve({ data: mockedConnector });
      }
    });
    await expect(client.getConnectors()).resolves.toEqual([
      mockedConnector,
      mockedConnector,
    ]);
  });
});
