import axios from 'axios';
import NexusClient from '../src';
import {
  mockedWorkflowKey,
  mockedWorkflowExecutionId,
  mockedToken,
} from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getWorkflowExecutions method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.getWorkflowExecutions()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow key', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(client.getWorkflowExecutions('')).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns an array of workflow execution IDs on success ', async () => {
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
      client.getWorkflowExecutions(mockedWorkflowKey)
    ).resolves.toEqual([
      {
        executionId: mockedWorkflowExecutionId,
      },
    ]);
  });
});
