import axios from 'axios';
import { sendEngineHTTPRequest, sendEngineRequest } from '../src/utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('sendEngineRequest utility function', () => {
  it('returns error on failed request', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Something went wrong'));
    await expect(sendEngineRequest('method_name', {})).rejects.toThrow(
      new Error('Something went wrong')
    );
  });

  it('returns error message on server error', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Server error'));
    await expect(sendEngineRequest('method_name', {})).rejects.toThrow(
      new Error('Server error')
    );
  });

  it('returns unknown error on unexpected response', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        something: {},
      },
    });
    await expect(sendEngineRequest('method_name', {})).rejects.toThrow(
      new Error('Unknown error')
    );
  });

  it('resolves on success request', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {},
      },
    });
    await expect(sendEngineRequest('method_name', {})).resolves.toEqual({});
  });
});

describe('sendEngineHTTPRequest utility function', () => {
  it('returns error on failed request', async () => {
    mockedAxios.request.mockRejectedValue(new Error('Unknown error'));
    await expect(sendEngineHTTPRequest('POST', '/path', {})).rejects.toThrow(
      new Error('Unknown error')
    );
  });

  it('returns error message on server error', async () => {
    mockedAxios.request.mockRejectedValue(new Error('Server error'));

    await expect(sendEngineHTTPRequest('POST', '/path', {})).rejects.toThrow(
      new Error('Server error')
    );
  });

  it('returns unknown error on unexpected response', async () => {
    mockedAxios.request.mockResolvedValue({
      data: {
        something: {},
      },
    });
    await expect(sendEngineHTTPRequest('POST', '/path', {})).rejects.toThrow(
      new Error('Unknown error')
    );
  });

  it('resolves on success request', async () => {
    mockedAxios.request.mockResolvedValue({
      data: {
        result: {},
      },
    });
    await expect(sendEngineHTTPRequest('POST', '/path', {})).resolves.toEqual(
      {}
    );
  });
});
