import axios from 'axios';

const WORKFLOW_ENGINE_URL = 'https://gnexus-orchestrator.herokuapp.com';

export const sendEngineRequest = async (method: string, params: unknown) => {
  try {
    const res = await axios.post(WORKFLOW_ENGINE_URL, {
      jsonrpc: '2.0',
      method: method,
      id: new Date(),
      params: params,
    });
    if (res && res.data && res.data.error) {
      throw new Error(res.data.error);
    }
    if (res && res.data && res.data.result) {
      return res.data.result;
    } else {
      throw new Error('Unknown error');
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
