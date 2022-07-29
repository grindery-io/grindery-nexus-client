# Grindery Nexus Client

JS wrapper for Nexus engine API

## How to use

### Install library

`yarn add grindery-nexus-client`

or

`npm install grindery-nexus-client`

### Import client class

```js
import NexusClient from 'grindery-nexus-client';
```

### Call client methods

```js
const test = async () => {
  const workflows = await NexusClient.listWorkflows('user:account:id`)
}
```

See full documentation in the [DOCUMENTATION.md](https://github.com/grindery-io/grindery-nexus-client/blob/master/DOCUMENTATION.md) file.

## License

MIT
