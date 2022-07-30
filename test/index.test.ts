import axios from 'axios';
import NexusClient from '../src';
import { sendEngineRequest } from '../src/utils';
import {
  mockedWorkflowKey,
  mockedUserAccountId,
  mockedWorkflow,
  mockedWorkflowExecutionId,
  mockedConnector,
  mockedWeb2CconnectorsPath,
  mockedWeb3CconnectorsPath,
} from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('createWorkflow method', () => {
  it('requires workflow object', async () => {
    await expect(
      // @ts-ignore
      NexusClient.createWorkflow()
    ).rejects.toMatchObject({
      message: 'Workflow object is required',
    });
  });

  it('requires workflow to have creator', async () => {
    await expect(
      NexusClient.createWorkflow({ ...mockedWorkflow, creator: '' })
    ).rejects.toMatchObject({
      message: 'Workflow creator is required',
    });
  });

  it('returns new workflow key on success', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { result: { key: mockedWorkflowKey } },
    });
    await expect(NexusClient.createWorkflow(mockedWorkflow)).resolves.toEqual({
      key: mockedWorkflowKey,
    });
  });
});

describe('listWorkflows method', () => {
  it('requires user account id', async () => {
    await expect(NexusClient.listWorkflows('')).rejects.toMatchObject({
      message: 'User account id is required',
    });
  });

  it('returns array on success', async () => {
    mockedAxios.post.mockResolvedValue({ data: { result: [] } });
    await expect(
      NexusClient.listWorkflows(mockedUserAccountId)
    ).resolves.toEqual([]);
  });
});

describe('updateWorkflow method', () => {
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
});

describe('getWorkflowExecutions method', () => {
  it('requires workflow key', async () => {
    await expect(NexusClient.getWorkflowExecutions('')).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns an array of workflow execution IDs on success ', async () => {
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
      NexusClient.getWorkflowExecutions(mockedWorkflowKey)
    ).resolves.toEqual([
      {
        executionId: mockedWorkflowExecutionId,
      },
    ]);
  });
});

describe('getWorkflowExecutionLog method', () => {
  it('requires workflow execution ID', async () => {
    await expect(NexusClient.getWorkflowExecutionLog('')).rejects.toMatchObject(
      {
        message: 'Workflow execution ID is required',
      }
    );
  });

  it('returns an array of executed workflow steps ', async () => {
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
      NexusClient.getWorkflowExecutionLog(mockedWorkflowExecutionId)
    ).resolves.toEqual([
      {
        executionId: mockedWorkflowExecutionId,
      },
    ]);
  });
});

describe('isAllowedUser method', () => {
  it('requires user account ID', async () => {
    await expect(NexusClient.isAllowedUser('')).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('returns true if user account ID is allowed', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      NexusClient.isAllowedUser(mockedUserAccountId)
    ).resolves.toEqual(true);
  });
});

describe('testAction method', () => {
  it('requires user account ID', async () => {
    await expect(
      NexusClient.testAction('', mockedWorkflow.trigger, {})
    ).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('requires workflow step object', async () => {
    await expect(
      // @ts-ignore
      NexusClient.testAction(mockedUserAccountId, '', {})
    ).rejects.toMatchObject({
      message: 'Workflow step object is required',
    });
  });

  it('requires input object', async () => {
    await expect(
      // @ts-ignore
      NexusClient.testAction(mockedUserAccountId, mockedWorkflow.trigger, '')
    ).rejects.toMatchObject({
      message: 'Sample input object is required',
    });
  });

  it('returns action execution payload on success', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {},
      },
    });
    await expect(
      NexusClient.testAction(mockedUserAccountId, mockedWorkflow.trigger, {})
    ).resolves.toEqual({});
  });
});

describe('getConnectors method', () => {
  it('returns empty array if no connectors found', async () => {
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
    await expect(NexusClient.getConnectors()).resolves.toEqual([]);
  });

  it('returns array of connectors on success', async () => {
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
    await expect(NexusClient.getConnectors()).resolves.toEqual([
      mockedConnector,
      mockedConnector,
    ]);
  });
});

describe('deleteWorkflow', () => {
  it('requires user account ID', async () => {
    await expect(
      NexusClient.deleteWorkflow('', mockedWorkflowKey)
    ).rejects.toMatchObject({
      message: 'User account ID is required',
    });
  });

  it('requires workflow key', async () => {
    await expect(
      NexusClient.deleteWorkflow(mockedUserAccountId, '')
    ).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns true on success deletion', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { deleted: true },
      },
    });
    await expect(
      NexusClient.deleteWorkflow(mockedUserAccountId, mockedWorkflowKey)
    ).resolves.toEqual({ deleted: true });
  });

  it('returns false on failed deletion', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { deleted: false },
      },
    });
    await expect(
      NexusClient.deleteWorkflow(mockedUserAccountId, mockedWorkflowKey)
    ).resolves.toEqual({ deleted: false });
  });
});

describe('sendEngineRequest utility function', () => {
  it('returns error on failed request', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Something went wrong'));
    await expect(sendEngineRequest('method_name', {})).rejects.toThrow(
      new Error('Something went wrong')
    );
  });

  it('returns error message on server error', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        error: 'Server error',
      },
    });
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
