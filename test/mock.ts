import { Workflow } from '../src/types/types';

export const mockedWorkflowKey = 'workflow-key';

export const mockedWorkflowExecutionId = '123-456-789';

export const mockedWalletAddress = '0x0000000000000000000000000000000000000001';

export const mockedEmail = 'email@example.com';

export const mockedWeb2CconnectorsPath =
  'https://api.github.com/repos/grindery-io/grindery-nexus-schema-v2/contents/cds/web2';

export const mockedWeb3CconnectorsPath =
  'https://api.github.com/repos/grindery-io/grindery-nexus-schema-v2/contents/cds/web3';

export const mockedToken =
  'eyJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJ1cm46Z3JpbmRlcnk6YWNjZXNzLXRva2VuOnYxIiwic3ViIjoiZWlwMTU1OjE6MHg0MjQ1Y2QxMWI1YTlFNTRGNTdiRTE5QjY0M0U1NjRBQTRFZTg2RDFiIiwiaWF0IjoxNjcwNDQxNjk4LCJpc3MiOiJ1cm46Z3JpbmRlcnk6b3JjaGVzdHJhdG9yIiwiZXhwIjoxNjcwNDQ1Mjk4fQ.PLMZchj3AoxF4z8hHshLR_Hj8sSPp41qalBAHH47HgHOMjMHsC_5KZKs-hUFIdCq829vUrHTfbKx5rL6hXKv0Q';

export const mockedJsonRpcPayload = {
  jsonrpc: '2.0',
  method: 'grinderyNexusConnectorUpdateFields',
  id: new Date(),
  params: {
    key: 'operationKey',
  },
};

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

export const mockedConnector = {
  key: 'helloWorld',
  name: 'Hello World',
  version: '1.0.0',
  platformVersion: '1.0.0',
  html_url: '',
  triggers: [
    {
      key: 'helloWorldTrigger',
      name: 'Hello World Trigger',
      display: {
        label: 'Hello World Trigger',
        description: 'This is a test trigger',
      },
      operation: {
        type: 'polling',
        operation: {
          url: 'wss://gnexus-connector-helloworld.herokuapp.com/',
        },
        inputFields: [
          {
            key: 'interval',
            label: 'Delay before signal in milliseconds',
            type: 'number',
            required: true,
            default: '10000',
          },
          {
            key: 'recurring',
            label: 'Recurring',
            type: 'boolean',
            required: true,
            default: 'true',
          },
        ],
        outputFields: [
          {
            key: 'random',
            label: 'A random string',
          },
          {
            key: 'random2',
            label: 'A random strings',
            list: true,
          },
        ],
        sample: { random: 'abc', random2: ['abc', 'def'] },
      },
    },
  ],
  actions: [
    {
      key: 'helloWorldAction',
      name: 'Hello World Action',
      display: {
        label: 'Hello World Action',
        description: 'This is a test action',
      },
      operation: {
        type: 'api',
        operation: {
          url: 'wss://gnexus-connector-helloworld.herokuapp.com/',
        },
        inputFields: [
          {
            key: 'message',
            label: 'Message',
            type: 'string',
            required: true,
            default: 'Hello!',
          },
        ],
        outputFields: [
          {
            key: 'message',
          },
        ],
        sample: {
          message: 'Hello World!',
        },
      },
    },
  ],
  recipes: [
    {
      key: 'helloWorldRecipeWithTrigger',
      name: 'Hello World Recipe with trigger',
      display: {
        label: 'Hello World Recipe with trigger',
        description: 'This is a test recipe with trigger and action',
      },
      inputFields: [
        {
          key: 'interval',
          label: 'Delay before signal in milliseconds',
          type: 'number',
          required: true,
          default: '10000',
        },
        {
          key: 'recurring',
          label: 'Recurring',
          type: 'boolean',
          required: true,
          default: 'true',
        },
        {
          key: 'message',
          label: 'Message',
          type: 'string',
          required: true,
          default: 'Hello!',
        },
      ],
      trigger: {
        operation: 'helloWorldTrigger',
        input: {
          interval: '{{input.interval}}',
          recurring: '{{input.recurring}}',
        },
      },
      actions: [
        {
          operation: 'helloWorldAction',
          input: {
            message: '{{input.message}}',
          },
        },
      ],
    },
    {
      key: 'helloWorldRecipeWithActions',
      name: 'Hello World Recipe with actions',
      display: {
        label: 'Hello World Recipe with actions',
        description: 'This is a test recipe with two actions and no trigger',
      },
      inputFields: [
        {
          key: 'message1',
          label: 'First message',
          type: 'string',
          required: true,
          default: 'Hello',
        },
        {
          key: 'message2',
          label: 'Second message',
          type: 'string',
          required: true,
          default: 'World',
        },
      ],
      actions: [
        {
          operation: 'helloWorldAction',
          input: {
            message: '{{input.message1}}',
          },
        },
        {
          operation: 'helloWorldAction',
          input: {
            message: '{{input.message2}}',
          },
        },
      ],
    },
  ],
};

export const mockedChain = {
  value: 'eip155:1',
  label: 'Ethereum',
  icon: '',
  token: 'ETH',
};
