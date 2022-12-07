import axios from 'axios';
import NexusClient from '../src';
import { mockedWorkflowKey, mockedWorkflow, mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('createWorkflow method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.createWorkflow()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow object', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      // @ts-ignore
      client.createWorkflow()
    ).rejects.toMatchObject({
      message: 'Workflow object is required',
    });
  });

  it('requires workflow to have creator', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      client.createWorkflow({ ...mockedWorkflow, creator: '' })
    ).rejects.toMatchObject({
      message: 'Workflow creator is required',
    });
  });

  it('returns new workflow key on success', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: { key: mockedWorkflowKey } },
    });
    await expect(client.createWorkflow(mockedWorkflow)).resolves.toEqual({
      key: mockedWorkflowKey,
    });
  });
});
