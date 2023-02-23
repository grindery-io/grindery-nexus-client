# Grindery Nexus Client

JS wrapper for Nexus engine API

## How to use

### Install library

`yarn add grindery-nexus-client`

or

`npm install grindery-nexus-client`

### Import client class

```js
import GrinderyClient from 'grindery-nexus-client';
```

### Init client

```js
const client = new GrinderyClient('{user_authentication_token}');
```

### Call client methods

```js
const listWorkflows = async () => {
  const workflows = await client.workflow.list();
};
```

### How to migrate from version 0.x.x to 1.x.x

There are some changes you need to do in your code in order to upgrade library to 1.x.x version.

Here are some examples:

#### Client authentication

##### 0.x.x

```js
const client = new GrinderyClient();
client.authenticate('{user_authentication_token}');
```

##### 1.x.x

```js
const client = new GrinderyClient('{user_authentication_token}');
```

#### Workflow methods

##### 0.x.x

```js
const listWorkflows = async () => {
  const workflows = await client.listWorkflows();
};
```

##### 1.x.x

```js
const listWorkflows = async () => {
  const workflows = await client.workflow.list();
};
```

#### Workspace methods

##### 0.x.x

```js
const listWorkspaces = async () => {
  const workspaces = await client.listWorkspaces();
};
```

##### 1.x.x

```js
const listWorkflows = async () => {
  const workspaces = await client.workspace.list();
};
```

See full documentation in the [DOCUMENTATION.md](https://github.com/grindery-io/grindery-nexus-client/blob/master/DOCUMENTATION.md) file.

## Development

See [DEVELOPMENT.md](https://github.com/grindery-io/grindery-nexus-client/blob/master/DEVELOPMENT.md) file.

## License

MIT
