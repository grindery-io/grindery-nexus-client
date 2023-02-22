import axios from 'axios';
import GrinderyClient from '../src';
import {
  mockedWorkflowKey,
  mockedWorkflow,
  mockedToken,
  mockedWorkflowExecutionId,
} from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('workflow.create method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workflow.create({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow object', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      // @ts-ignore
      client.workflow.create({})
    ).rejects.toMatchObject({
      message: 'Workflow object is required',
    });
  });

  it('requires workflow to have creator', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workflow.create({ workflow: { ...mockedWorkflow, creator: '' } })
    ).rejects.toMatchObject({
      message: 'Workflow creator is required',
    });
  });

  it('returns new workflow key on success', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: { key: mockedWorkflowKey } },
    });
    await expect(
      client.workflow.create({ workflow: mockedWorkflow })
    ).resolves.toEqual({
      key: mockedWorkflowKey,
    });
  });
});

describe('workflow.list method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workflow.list({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('returns array on success', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({ data: { result: [] } });
    await expect(client.workflow.list({})).resolves.toEqual([]);
  });
});

describe('workflow.update method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workflow.update({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workflow.update({ key: '', workflow: mockedWorkflow })
    ).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('requires workflow to have creator', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workflow.update({
        key: mockedWorkflowKey,
        workflow: {
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
        },
      })
    ).rejects.toMatchObject({
      message: 'Workflow creator is required',
    });
  });

  it('returns workflow key on success', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: { result: { key: mockedWorkflowKey } },
    });
    await expect(
      client.workflow.update({
        key: mockedWorkflowKey,
        workflow: mockedWorkflow,
      })
    ).resolves.toEqual({ key: mockedWorkflowKey });
  });
});

describe('workflow.delete', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workflow.delete({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(client.workflow.delete({ key: '' })).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns true on success deletion', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { deleted: true },
      },
    });
    await expect(
      client.workflow.delete({ key: mockedWorkflowKey })
    ).resolves.toEqual({
      deleted: true,
    });
  });

  it('returns false on failed deletion', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: { deleted: false },
      },
    });
    await expect(
      client.workflow.delete({ key: mockedWorkflowKey })
    ).resolves.toEqual({
      deleted: false,
    });
  });
});

describe('workflow.getExecutions method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workflow.getExecutions({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workflow.getExecutions({ workflowKey: '' })
    ).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns an array of workflow execution IDs on success ', async () => {
    const client = new GrinderyClient(mockedToken);
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
      client.workflow.getExecutions({ workflowKey: mockedWorkflowKey })
    ).resolves.toEqual([
      {
        executionId: mockedWorkflowExecutionId,
      },
    ]);
  });
});

describe('workflow.getExecutionLog method', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workflow.getExecutionLog({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow execution ID', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workflow.getExecutionLog({ executionId: '' })
    ).rejects.toMatchObject({
      message: 'Workflow execution ID is required',
    });
  });

  it('returns an array of executed workflow steps ', async () => {
    const client = new GrinderyClient(mockedToken);
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
      client.workflow.getExecutionLog({
        executionId: mockedWorkflowExecutionId,
      })
    ).resolves.toEqual([
      {
        executionId: mockedWorkflowExecutionId,
      },
    ]);
  });
});

describe('workflow.moveToWorkspace', () => {
  it('requires authentication', async () => {
    const client = new GrinderyClient();
    await expect(
      // @ts-ignore
      client.workflow.moveToWorkspace({})
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow key', async () => {
    const client = new GrinderyClient(mockedToken);
    await expect(
      client.workflow.moveToWorkspace({ workflowKey: '', workspaceKey: '2' })
    ).rejects.toMatchObject({
      message: 'Workflow key is required',
    });
  });

  it('returns true on success request', async () => {
    const client = new GrinderyClient(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(
      client.workflow.moveToWorkspace({ workflowKey: '1', workspaceKey: '2' })
    ).resolves.toEqual(true);
  });
});
