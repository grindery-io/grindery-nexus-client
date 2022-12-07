import axios from 'axios';
import NexusClient from '../src';
import { mockedWorkflowKey, mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('deleteWorkflow', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.deleteWorkflow()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow key', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(client.deleteWorkflow('')).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns true on success deletion', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { deleted: true },
      },
    });
    await expect(client.deleteWorkflow(mockedWorkflowKey)).resolves.toEqual({
      deleted: true,
    });
  });

  it('returns false on failed deletion', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { deleted: false },
      },
    });
    await expect(client.deleteWorkflow(mockedWorkflowKey)).resolves.toEqual({
      deleted: false,
    });
  });
});
