import axios from 'axios';
import NexusClient from '../src';
import { mockedWorkflowKey, mockedWorkflow, mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('updateWorkflow method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.updateWorkflow()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow key', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      client.updateWorkflow('', mockedWorkflow)
    ).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('requires workflow to have creator', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      client.updateWorkflow(mockedWorkflowKey, {
        title: '',
        trigger: {
          type: 'trigger',
          connector: '',
          operation: '',
          input: {
            field1: '1',
          },
        },
        actions: [],
        creator: '',
      })
    ).rejects.toMatchObject({
      message: 'Workflow creator is required',
    });
  });

  it('returns workflow key on success', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: { key: mockedWorkflowKey } },
    });
    await expect(
      client.updateWorkflow(mockedWorkflowKey, mockedWorkflow)
    ).resolves.toEqual({ key: mockedWorkflowKey });
  });
});
