import axios from 'axios';
import NexusClient from '../src';
import { mockedWorkflowExecutionId, mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getWorkflowExecutionLog method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.getWorkflowExecutionLog()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow execution ID', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(client.getWorkflowExecutionLog('')).rejects.toMatchObject({
      message: 'Workflow execution ID is required',
    });
  });

  it('returns an array of executed workflow steps ', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: [
          {
            executionId: mockedWorkflowExecutionId,
          },
        ],
      },
    });
    await expect(
      client.getWorkflowExecutionLog(mockedWorkflowExecutionId)
    ).resolves.toEqual([
      {
        executionId: mockedWorkflowExecutionId,
      },
    ]);
  });
});
