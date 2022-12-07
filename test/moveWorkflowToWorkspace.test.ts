import axios from 'axios';
import NexusClient from '../src';
import { mockedToken } from './mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('moveWorkflowToWorkspace', () => {
  it('requires authentication', async () => {
    const client = new NexusClient();
    await expect(
      // @ts-ignore
      client.moveWorkflowToWorkspace()
    ).rejects.toMatchObject({
      message: 'Authentication required',
    });
  });

  it('requires workflow key', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    await expect(client.moveWorkflowToWorkspace('', '2')).rejects.toMatchObject(
      {
        message: 'Workflow key is required',
      }
    );
  });

  it('returns true on success request', async () => {
    const client = new NexusClient();
    client.authenticate(mockedToken);
    mockedAxios.post.mockResolvedValue({
      data: {
        result: true,
      },
    });
    await expect(client.moveWorkflowToWorkspace('1', '2')).resolves.toEqual(
      true
    );
  });
});
