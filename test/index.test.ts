import axios from 'axios';
import NexusClient from '../src';
import { mockedWorkflowKey, mockedUserAccountId, mockedWorkflow } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('listWorkflows method', () => {
  it('returns array on success', async () => {
    mockedAxios.post.mockResolvedValue({ data: { result: [] } });
    await expect(
      NexusClient.listWorkflows(mockedUserAccountId)
    ).resolves.toEqual([]);
  });

  it('requires user account id', async () => {
    await expect(NexusClient.listWorkflows('')).rejects.toMatchObject({
      message: 'User account id is required',
    });
  });
});

describe('updateWorkflow method', () => {
  it('returns workflow key on success', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { result: { key: mockedWorkflowKey } },
    });
    await expect(
      NexusClient.updateWorkflow(
        mockedWorkflowKey,
        mockedUserAccountId,
        mockedWorkflow
      )
    ).resolves.toEqual({ key: mockedWorkflowKey });
  });

  it('requires user account id', async () => {
    await expect(
      NexusClient.updateWorkflow(mockedWorkflowKey, '', mockedWorkflow)
    ).rejects.toMatchObject({
      message: 'User account id is required',
    });
  });

  it('requires workflow key', async () => {
    await expect(
      NexusClient.updateWorkflow('', mockedUserAccountId, mockedWorkflow)
    ).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('requires workflow to have creator', async () => {
    await expect(
      NexusClient.updateWorkflow(mockedWorkflowKey, mockedUserAccountId, {
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
});
