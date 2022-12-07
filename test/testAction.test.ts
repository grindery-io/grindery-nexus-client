import axios from 'axios';
import NexusClient from '../src';
import { mockedWorkflow, mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('testAction method', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.testAction()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow step object', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      // @ts-ignore
      client.testAction('', {})
    ).rejects.toMatchObject({
      message: 'Workflow step object is required',
    });
  });

  it('requires input object', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(
      // @ts-ignore
      client.testAction(mockedWorkflow.trigger, '')
    ).rejects.toMatchObject({
      message: 'Sample input object is required',
    });
  });

  it('returns action execution payload on success', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: {},
      },
    });
    await expect(
      client.testAction(mockedWorkflow.trigger, {})
    ).resolves.toEqual({});
  });
});
