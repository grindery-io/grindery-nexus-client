import { JwtPayload } from 'jwt-decode';

export type Workflow = {
  key?: any;
  title: string;
  trigger: Operation;
  actions: Operation[];
  creator: string;
  state?: any;
};

export type Operation = {
  type: 'action' | 'trigger' | 'recipe';
  connector: string;
  operation: string;
  input: {
    [key: string]: string | number | boolean | (string | number | boolean)[];
  };
  display?: { [key: string]: string };
  authentication?: string;
  credentials?: { [key: string]: string | number | boolean };
};

export type WorkflowExecution = {
  executionId: string;
  startedAt: number;
};

export type WorkflowExecutionLog = {
  workflowKey: string;
  sessionId: string;
  executionId: string;
  startedAt: number;
  endedAt?: number;
  stepIndex?: number;
  input?: any;
  output?: any;
  error?: any;
};

export type Connector = {
  key: string;
  name: string;
  version: string;
  platformVersion: string;
  type: string;
  triggers?: Trigger[];
  actions?: Action[];
  recipes?: Recipe[];
  authentication?: Authentication;
  icon?: string;
  pricing?: string;
  html_url?: string;
  user?: string;
  workspace?: string;
  access?: string;
};

// Triggers

export type Trigger = {
  key: string;
  name: string;
  display: Display;
  operation?: TriggerOperation; // TODO: make required
  inputFields?: Field[];
};

export type TriggerOperation =
  | ChainEventOperation
  | HookOperation
  | PollingOperation;

export type ChainEventOperation = {
  type: string; //"blockchain:event"; // Can't use literals in JSON file: https://github.com/microsoft/TypeScript/issues/26552
  chains: Chain[];
  signature: string;
  filters: ChainEventOperationFilter;
  inputFields?: Field[];
  inputFieldProviderUrl?: string;
  outputFields?: Field[];
  sample?: { [key: string]: string | number | boolean | (string | number)[] };
};

export type ChainEventOperationFilter = {
  fromBlock?: string | number;
  toBlock?: string | number;
  address?: string | string[];
  topics?: string[];
};

export type HookOperation = {
  type: string; //"hook";
  inputFields?: Field[];
  inputFieldProviderUrl?: string;
  outputFields?: Field[];
  sample?: { [key: string]: string | number | boolean | (string | number)[] };
};

export type PollingOperation = {
  type: string; //"polling";
  operation?: Request; // TODO: make required
  inputFields?: Field[];
  inputFieldProviderUrl?: string;
  outputFields?: Field[];
  sample?: { [key: string]: string | number | boolean | (string | number)[] };
};

// End Triggers

// Actions

export type Action = {
  key: string;
  name: string;
  display: Display;
  operation?: ActionOperation; // TODO: make required
  inputFields?: Field[];
};

export type ActionOperation = ChainCallOperation | APICallOperation;

export type APICallOperation = {
  type: string; //"api";
  operation: Request;
  inputFields?: Field[];
  inputFieldProviderUrl?: string;
  outputFields?: Field[];
  sample?: { [key: string]: string | number | boolean | (string | number)[] };
};

export type ChainCallOperation = {
  type: string; //"blockchain:call";
  accounts?: ChainAccount[];
  signature?: string; // TODO: make required
  arguments?: ChainCallOperationArgs[]; // TODO: make required
  inputFields?: Field[];
  inputFieldProviderUrl?: string;
  outputFields?: Field[];
  sample?: { [key: string]: string | number | boolean | (string | number)[] };
};

export type ChainCallOperationArgs = {
  type: string;
  value: number | string;
};

// END Actions

// Recipes

export type Recipe = {
  key: string;
  name: string;
  display: Display;
  inputFields?: Field[];
  trigger?: RecipeOperation;
  actions?: RecipeOperation[];
};

export type RecipeOperation = {
  connector?: string;
  operation: string;
  input: RecipeOperationInput;
};

export type RecipeOperationInput = {
  [key: string]: string | number | boolean;
};

// END Recipes

// Authentication

export type Authentication = {
  type: string; //"basic" | "custom" | "digest" | "oauth1" | "oauth2" | "session";
  test: Request;
  defaultDisplayName?: any;
  authenticatedRequestTemplate?: any;
  fields?: Field[];
  label?: string | Request;
  oauth1Config?: AuthenticationOAuth1Config;
  oauth2Config?: AuthenticationOAuth2Config;
  sessionConfig?: AuthenticationSessionConfig;
};

export type AuthenticationOAuth1Config = {
  getRequestToken: Request;
  authorizeUrl: Request;
  getAccessToken: Request;
};

export type AuthenticationOAuth2Config = {
  authorizeUrl: Request;
  getAccessToken: Request;
  refreshAccessToken?: Request;
  codeParam?: string;
  scope?: string;
  autoRefresh?: boolean;
};

export type AuthenticationSessionConfig = {
  operation: Request;
};

// END Authentication

// Shared

export type Chain = string;

export type ChainAccount = string;

export type DID = string;

export type Display = {
  label: string;
  description: string;
  instructions?: string;
  icon?: string;
  featured?: boolean;
  hidden?: boolean;
};

export type Field = {
  key: string;
  label?: string;
  helpText?: string;
  type?: string;
  /*| "string"
    | "text"
    | "integer"
    | "number"
    | "boolean"
    | "datetime"
    | "file"
    | "password"
    | "copy"
    | "code";*/
  required?: boolean;
  placeholder?: string;
  default?: string;
  choices?: FieldChoice[];
  list?: boolean;
  children?: Field[];
  dict?: boolean;
  computed?: boolean;
  updateFieldDefinition?: boolean;
  inputFormat?: string;
  validation?: any;
  readonly?: boolean;
};

export type FieldChoice =
  | string
  | {
      value: string;
      label: string;
      sample: string;
      icon?: string;
    };

export type FieldProviderRequest = {
  inputFields: Field[];
};

export type Request = {
  method?: string; //"GET" | "PUT" | "POST" | "PATCH" | "DELETE" | "HEAD";
  url?: string;
  body?: null | string | object | (string | number | boolean | object)[];
  params?: { [key: string]: any };
  headers?: { [key: string]: any };
  auth?: string[] | object;
};

// END Shared

export type SelectedTrigger = Trigger & Recipe;

export type SelectedAction = Action & Recipe;

export type Blockchain = {
  value: string;
  label: string;
  icon: string;
  token?: string;
  tokenAddress?: string;
};

export interface CustomJwtPayload extends JwtPayload {
  workspace?: string;
}
