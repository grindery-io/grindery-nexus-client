import { Workflow } from '../src/types';

export const mockedUserAccountId =
  'eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb';

export const mockedWorkflowKey = 'workflow-key';

export const mockedWorkflow: Workflow = {
  title: 'Mocked workflow',
  trigger: {
    type: 'trigger',
    connector: 'connectorKey',
    operation: 'operationKay',
    input: {
      field1: '1',
      field2: '2',
    },
  },
  actions: [
    {
      type: 'action',
      connector: 'connectorKey',
      operation: 'oparationKey',
      input: {
        field1: '1',
        field2: '2',
      },
    },
  ],
  creator: 'workflow:creator:user',
  state: 'off',
};
