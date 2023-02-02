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

See full documentation in the [DOCUMENTATION.md](https://github.com/grindery-io/grindery-nexus-client/blob/master/DOCUMENTATION.md) file.

## Development

See [DEVELOPMENT.md](https://github.com/grindery-io/grindery-nexus-client/blob/master/DEVELOPMENT.md) file.

## License

MIT
