import axios from 'axios';
import GrinderyClient from '../src';
import { mockedChain } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('chain.list', () => {
  it('returns array of chains', async () => {
    const client = new GrinderyClient();
    mockedAxios.get.mockResolvedValue({
      data: [mockedChain],
    });
    await expect(client.chain.list({})).resolves.toMatchObject([mockedChain]);
  });
});
