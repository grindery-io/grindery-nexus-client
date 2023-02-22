## Classes

<dl>
<dt><a href="#GrinderyClient">GrinderyClient</a></dt>
<dd><p>Grindery Nexus Client</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#BlockchainProps">BlockchainProps</a> : <code>Object</code></dt>
<dd><p>Blockchain object properties</p></dd>
<dt><a href="#ConnectorProps">ConnectorProps</a> : <code>Object</code></dt>
<dd><p>Connector object properties</p></dd>
<dt><a href="#UserProps">UserProps</a> : <code>Object</code></dt>
<dd><p>User object properties</p></dd>
</dl>

<a name="GrinderyClient"></a>

## GrinderyClient
<p>Grindery Nexus Client</p>

**Kind**: global class  

* [GrinderyClient](#GrinderyClient)
    * [new GrinderyClient()](#new_GrinderyClient_new)
    * [.Chain](#GrinderyClient.Chain)
        * [new Chain()](#new_GrinderyClient.Chain_new)
        * [.list(payload)](#GrinderyClient.Chain+list) ⇒ <code>Promise.&lt;Array.&lt;BlockchainProps&gt;&gt;</code>
    * [.Connector](#GrinderyClient.Connector)
        * [new Connector()](#new_GrinderyClient.Connector_new)
        * [.get(payload)](#GrinderyClient.Connector+get) ⇒ <code>Promise.&lt;(ConnectorProps\|null)&gt;</code>
        * [.list([payload])](#GrinderyClient.Connector+list) ⇒ <code>Promise.&lt;Array.&lt;ConnectorProps&gt;&gt;</code>
        * [.putSecrets(payload)](#GrinderyClient.Connector+putSecrets) ⇒ <code>Promise</code>
        * [.testAction(payload)](#GrinderyClient.Connector+testAction) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.runAction(payload)](#GrinderyClient.Connector+runAction) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.callInputProvider(payload)](#GrinderyClient.Connector+callInputProvider) ⇒ <code>Promise.&lt;Object&gt;</code>
        * [.callWebhook(payload)](#GrinderyClient.Connector+callWebhook) ⇒ <code>Promise</code>
    * [.Credentials](#GrinderyClient.Credentials)
        * [new Credentials()](#new_GrinderyClient.Credentials_new)
        * [.list(payload)](#GrinderyClient.Credentials+list) ⇒ <code>Promise</code>
        * [.update(payload)](#GrinderyClient.Credentials+update) ⇒ <code>Promise</code>
    * [.User](#GrinderyClient.User)
        * [new User()](#new_GrinderyClient.User_new)
        * [.get()](#GrinderyClient.User+get) ⇒ [<code>UserProps</code>](#UserProps) \| <code>null</code>
        * [.hasEmail()](#GrinderyClient.User+hasEmail) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.getEmail()](#GrinderyClient.User+getEmail) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
        * [.delete()](#GrinderyClient.User+delete) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.isAllowed(payload)](#GrinderyClient.User+isAllowed) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.requestEarlyAccess(payload)](#GrinderyClient.User+requestEarlyAccess) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.saveWalletAddress(payload)](#GrinderyClient.User+saveWalletAddress) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.updateEmail(payload)](#GrinderyClient.User+updateEmail) ⇒ <code>Promise.&lt;boolean&gt;</code>
        * [.saveNotificationsState(payload)](#GrinderyClient.User+saveNotificationsState) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.Workflow](#GrinderyClient.Workflow)
        * [new Workflow()](#new_GrinderyClient.Workflow_new)
        * [.create(payload)](#GrinderyClient.Workflow+create) ⇒ <code>Promise</code>
        * [.list(payload)](#GrinderyClient.Workflow+list) ⇒ <code>Promise</code>
        * [.update(payload)](#GrinderyClient.Workflow+update) ⇒ <code>Promise</code>
        * [.delete(payload)](#GrinderyClient.Workflow+delete) ⇒ <code>Promise</code>
        * [.getExecutions(payload)](#GrinderyClient.Workflow+getExecutions) ⇒ <code>Promise</code>
        * [.getExecutionLog(payload)](#GrinderyClient.Workflow+getExecutionLog) ⇒ <code>Promise</code>
        * [.moveToWorkspace(payload)](#GrinderyClient.Workflow+moveToWorkspace) ⇒ <code>Promise</code>
    * [.Workspace](#GrinderyClient.Workspace)
        * [new Workspace()](#new_GrinderyClient.Workspace_new)
        * [.list()](#GrinderyClient.Workspace+list) ⇒ <code>Promise</code>
        * [.create(payload)](#GrinderyClient.Workspace+create) ⇒ <code>Promise</code>
        * [.update(payload)](#GrinderyClient.Workspace+update) ⇒ <code>Promise</code>
        * [.leave(payload)](#GrinderyClient.Workspace+leave) ⇒ <code>Promise</code>
        * [.delete(payload)](#GrinderyClient.Workspace+delete) ⇒ <code>Promise</code>
        * [.addUser(payload)](#GrinderyClient.Workspace+addUser) ⇒ <code>Promise</code>
        * [.removeUser(payload)](#GrinderyClient.Workspace+removeUser) ⇒ <code>Promise</code>
        * [.addAdmin(payload)](#GrinderyClient.Workspace+addAdmin) ⇒ <code>Promise</code>
        * [.removeAdmin(payload)](#GrinderyClient.Workspace+removeAdmin) ⇒ <code>Promise</code>

<a name="new_GrinderyClient_new"></a>

### new GrinderyClient()
<p>A class to interact with Grindery Nexus engine API</p>

<a name="GrinderyClient.Chain"></a>

### GrinderyClient.Chain
<p>Blockchain class</p>

**Kind**: static class of [<code>GrinderyClient</code>](#GrinderyClient)  

* [.Chain](#GrinderyClient.Chain)
    * [new Chain()](#new_GrinderyClient.Chain_new)
    * [.list(payload)](#GrinderyClient.Chain+list) ⇒ <code>Promise.&lt;Array.&lt;BlockchainProps&gt;&gt;</code>

<a name="new_GrinderyClient.Chain_new"></a>

#### new Chain()
<p>A class to interact with blockchains</p>

<a name="GrinderyClient.Chain+list"></a>

#### chain.list(payload) ⇒ <code>Promise.&lt;Array.&lt;BlockchainProps&gt;&gt;</code>
<p>Gets list of supported blockchains</p>

**Kind**: instance method of [<code>Chain</code>](#GrinderyClient.Chain)  
**Returns**: <code>Promise.&lt;Array.&lt;BlockchainProps&gt;&gt;</code> - <p>Promise object with an array of blockchains. See [BlockchainProps](#BlockchainProps) definition.</p>  
**Since**: 0.9.1  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| payload | <code>Object</code> |  |  |
| payload.type | <code>string</code> | <code>&quot;all&quot;</code> | <p>Blockchain type. One of <code>all</code>, <code>evm</code>, <code>non-evm</code>. Default value is <code>all</code>.</p> |
| [payload.environment] | <code>string</code> |  | <p>Set environment for getting chains list. Optional.</p> |

<a name="GrinderyClient.Connector"></a>

### GrinderyClient.Connector
<p>Connector class</p>

**Kind**: static class of [<code>GrinderyClient</code>](#GrinderyClient)  

* [.Connector](#GrinderyClient.Connector)
    * [new Connector()](#new_GrinderyClient.Connector_new)
    * [.get(payload)](#GrinderyClient.Connector+get) ⇒ <code>Promise.&lt;(ConnectorProps\|null)&gt;</code>
    * [.list([payload])](#GrinderyClient.Connector+list) ⇒ <code>Promise.&lt;Array.&lt;ConnectorProps&gt;&gt;</code>
    * [.putSecrets(payload)](#GrinderyClient.Connector+putSecrets) ⇒ <code>Promise</code>
    * [.testAction(payload)](#GrinderyClient.Connector+testAction) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.runAction(payload)](#GrinderyClient.Connector+runAction) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.callInputProvider(payload)](#GrinderyClient.Connector+callInputProvider) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.callWebhook(payload)](#GrinderyClient.Connector+callWebhook) ⇒ <code>Promise</code>

<a name="new_GrinderyClient.Connector_new"></a>

#### new Connector()
<p>A class to interact with connectors</p>

<a name="GrinderyClient.Connector+get"></a>

#### connector.get(payload) ⇒ <code>Promise.&lt;(ConnectorProps\|null)&gt;</code>
<p>Gets single connector</p>

**Kind**: instance method of [<code>Connector</code>](#GrinderyClient.Connector)  
**Returns**: <code>Promise.&lt;(ConnectorProps\|null)&gt;</code> - <p>Promise object with a Connector object or <code>null</code> if driver not found. See [ConnectorProps](#ConnectorProps) definition.</p>  
**Since**: 0.5.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| payload | <code>Object</code> |  |  |
| payload.driverKey | <code>string</code> |  | <p>Connector key</p> |
| [payload.environment] | <code>string</code> |  | <p>Set environment for getting driver. Optional.</p> |
| [payload.enrich] | <code>boolean</code> | <code>true</code> | <p>If driver should be enriched with automated fields. Default is <code>true</code>.</p> |

<a name="GrinderyClient.Connector+list"></a>

#### connector.list([payload]) ⇒ <code>Promise.&lt;Array.&lt;ConnectorProps&gt;&gt;</code>
<p>Gets list of connectors</p>

**Kind**: instance method of [<code>Connector</code>](#GrinderyClient.Connector)  
**Returns**: <code>Promise.&lt;Array.&lt;ConnectorProps&gt;&gt;</code> - <p>Promise object with an array of connectors. See [ConnectorProps](#ConnectorProps) definition.</p>  
**Since**: 0.5.0  

| Param | Type | Description |
| --- | --- | --- |
| [payload] | <code>Object</code> |  |
| [payload.access] | <code>string</code> | <p>Filter connectors by access. One of <code>public</code>, <code>beta</code> or <code>private</code>. Optional. By default returns public, beta and user private connectors.</p> |
| [payload.environment] | <code>string</code> | <p>Set environment for getting connectors. Optional.</p> |

<a name="GrinderyClient.Connector+putSecrets"></a>

#### connector.putSecrets(payload) ⇒ <code>Promise</code>
<p>Adds connector secrets (for admin only). Authentication required.</p>

**Kind**: instance method of [<code>Connector</code>](#GrinderyClient.Connector)  
**Returns**: <code>Promise</code> - <p>Promise</p>  
**Since**: 0.7.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.connectorId | <code>string</code> | <p>Credential key</p> |
| payload.secrets | <code>object</code> | <p>Object with key-value pairs</p> |
| payload.environment | <code>string</code> | <p>Environment (<code>production</code> or <code>staging</code>)</p> |

<a name="GrinderyClient.Connector+testAction"></a>

#### connector.testAction(payload) ⇒ <code>Promise.&lt;Object&gt;</code>
<p>Tests driver action. Authentication required.</p>

**Kind**: instance method of [<code>Connector</code>](#GrinderyClient.Connector)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - <p>Promise object with action execution payload</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| payload | <code>Object</code> |  |  |
| payload.step | <code>Operation</code> |  | <p>Workflow step</p> |
| payload.input | <code>Object</code> |  | <p>Sample user input</p> |
| [payload.environment] | <code>string</code> | <code>&quot;production&quot;</code> | <p>Specifiy execution environment (<code>production</code> or <code>staging</code>). Optional. Default value <code>production</code>.</p> |

<a name="GrinderyClient.Connector+runAction"></a>

#### connector.runAction(payload) ⇒ <code>Promise.&lt;Object&gt;</code>
<p>Run a single action. Authentication required.</p>

**Kind**: instance method of [<code>Connector</code>](#GrinderyClient.Connector)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - <p>Promise object with action execution payload</p>  
**Since**: 0.9.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.step | <code>Operation</code> | <p>Workflow step</p> |
| payload.input | <code>Object</code> | <p>Sample user input</p> |
| [payload.environment] | <code>string</code> | <p>Specifiy execution environment (<code>production</code> or <code>staging</code>). Optional. Default value <code>production</code>.</p> |

<a name="GrinderyClient.Connector+callInputProvider"></a>

#### connector.callInputProvider(payload) ⇒ <code>Promise.&lt;Object&gt;</code>
<p>Sends request to an operation's <code>inputFieldProviderUrl</code>. Authentication required.</p>

**Kind**: instance method of [<code>Connector</code>](#GrinderyClient.Connector)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - <p>Promise object with operation's field provider response</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.connectorKey | <code>string</code> | <p>Connector key</p> |
| payload.operationKey | <code>string</code> | <p>Trigger or Action operation key</p> |
| payload.body | <code>object</code> | <p>JSON RPC request object with user input</p> |
| [payload.environment] | <code>string</code> | <p>Specifiy execution environment. Use <code>staging</code> for staging environment. Optional.</p> |

<a name="GrinderyClient.Connector+callWebhook"></a>

#### connector.callWebhook(payload) ⇒ <code>Promise</code>
<p>Sends webhook to a trigger</p>

**Kind**: instance method of [<code>Connector</code>](#GrinderyClient.Connector)  
**Returns**: <code>Promise</code> - <p>Promise object with JSON RPC 2.0 response</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.connectorKey | <code>string</code> | <p>Connector key</p> |
| payload.operationKey | <code>string</code> | <p>Trigger operation key</p> |
| payload.body | <code>object</code> | <p>JSON body</p> |
| [payload.environment] | <code>string</code> | <p>Specifiy execution environment. Use <code>staging</code> for staging environment. Optional.</p> |

<a name="GrinderyClient.Credentials"></a>

### GrinderyClient.Credentials
<p>Auth class</p>

**Kind**: static class of [<code>GrinderyClient</code>](#GrinderyClient)  

* [.Credentials](#GrinderyClient.Credentials)
    * [new Credentials()](#new_GrinderyClient.Credentials_new)
    * [.list(payload)](#GrinderyClient.Credentials+list) ⇒ <code>Promise</code>
    * [.update(payload)](#GrinderyClient.Credentials+update) ⇒ <code>Promise</code>

<a name="new_GrinderyClient.Credentials_new"></a>

#### new Credentials()
<p>A class to interact with authentication credentials</p>

<a name="GrinderyClient.Credentials+list"></a>

#### credentials.list(payload) ⇒ <code>Promise</code>
<p>Gets list of user's saved authentication credentials. Authentication required.</p>

**Kind**: instance method of [<code>Credentials</code>](#GrinderyClient.Credentials)  
**Returns**: <code>Promise</code> - <p>Promise object with a list of saved credentials</p>  
**Since**: 0.7.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.connectorId | <code>string</code> | <p>Connector key</p> |
| payload.environment | <code>string</code> | <p>Environment (<code>production</code> or <code>staging</code>)</p> |

<a name="GrinderyClient.Credentials+update"></a>

#### credentials.update(payload) ⇒ <code>Promise</code>
<p>Updates saved authentication credential. Authentication required.</p>

**Kind**: instance method of [<code>Credentials</code>](#GrinderyClient.Credentials)  
**Returns**: <code>Promise</code> - <p>Promise object with updated credential</p>  
**Since**: 0.7.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.key | <code>string</code> | <p>Credential key</p> |
| payload.displayName | <code>string</code> | <p>New display name</p> |

<a name="GrinderyClient.User"></a>

### GrinderyClient.User
<p>User class</p>

**Kind**: static class of [<code>GrinderyClient</code>](#GrinderyClient)  

* [.User](#GrinderyClient.User)
    * [new User()](#new_GrinderyClient.User_new)
    * [.get()](#GrinderyClient.User+get) ⇒ [<code>UserProps</code>](#UserProps) \| <code>null</code>
    * [.hasEmail()](#GrinderyClient.User+hasEmail) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.getEmail()](#GrinderyClient.User+getEmail) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
    * [.delete()](#GrinderyClient.User+delete) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.isAllowed(payload)](#GrinderyClient.User+isAllowed) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.requestEarlyAccess(payload)](#GrinderyClient.User+requestEarlyAccess) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.saveWalletAddress(payload)](#GrinderyClient.User+saveWalletAddress) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.updateEmail(payload)](#GrinderyClient.User+updateEmail) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.saveNotificationsState(payload)](#GrinderyClient.User+saveNotificationsState) ⇒ <code>Promise.&lt;boolean&gt;</code>

<a name="new_GrinderyClient.User_new"></a>

#### new User()
<p>A class to interact with user object</p>

<a name="GrinderyClient.User+get"></a>

#### user.get() ⇒ [<code>UserProps</code>](#UserProps) \| <code>null</code>
<p>Gets user information</p>

**Kind**: instance method of [<code>User</code>](#GrinderyClient.User)  
**Returns**: [<code>UserProps</code>](#UserProps) \| <code>null</code> - <p>User information object or <code>null</code> if user is not authenticated. See [UserProps](#UserProps) definition.</p>  
**Since**: 0.9.9  
<a name="GrinderyClient.User+hasEmail"></a>

#### user.hasEmail() ⇒ <code>Promise.&lt;boolean&gt;</code>
<p>Checks if user has email. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#GrinderyClient.User)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - <p>Promise object with <code>true</code> if user has email and <code>false</code> if not</p>  
**Since**: 0.9.10  
<a name="GrinderyClient.User+getEmail"></a>

#### user.getEmail() ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
<p>Gets user email address</p>

**Kind**: instance method of [<code>User</code>](#GrinderyClient.User)  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - <p>Promise object with user email if exists, or <code>null</code> if not.</p>  
**Since**: 0.9.12  
<a name="GrinderyClient.User+delete"></a>

#### user.delete() ⇒ <code>Promise.&lt;boolean&gt;</code>
<p>Deletes user account</p>

**Kind**: instance method of [<code>User</code>](#GrinderyClient.User)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - <p>Promise object with <code>true</code> if user account was deleted</p>  
**Since**: 0.9.11  
<a name="GrinderyClient.User+isAllowed"></a>

#### user.isAllowed(payload) ⇒ <code>Promise.&lt;boolean&gt;</code>
<p>Checks if user is approved for early access. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#GrinderyClient.User)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - <p>Promise object with <code>true</code> if user is allowed and <code>false</code> if not</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| [payload.app] | <code>string</code> | <p>Application for which the access is checked. One of: <code>flow</code>, <code>cds</code>, <code>gateway</code> or <code>ping</code>. Optional.</p> |

<a name="GrinderyClient.User+requestEarlyAccess"></a>

#### user.requestEarlyAccess(payload) ⇒ <code>Promise.&lt;boolean&gt;</code>
<p>Requests early access to Grindery apps. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#GrinderyClient.User)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.email | <code>string</code> | <p>User email</p> |
| [payload.source] | <code>string</code> | <p>The source of request (optional)</p> |
| [payload.app] | <code>string</code> | <p>The App to which access is requested (optional)</p> |

<a name="GrinderyClient.User+saveWalletAddress"></a>

#### user.saveWalletAddress(payload) ⇒ <code>Promise.&lt;boolean&gt;</code>
<p>Saves user wallet address in CRM. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#GrinderyClient.User)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.walletAddress | <code>string</code> | <p>User wallet address</p> |
| [payload.email] | <code>string</code> | <p>User email, optional</p> |

<a name="GrinderyClient.User+updateEmail"></a>

#### user.updateEmail(payload) ⇒ <code>Promise.&lt;boolean&gt;</code>
<p>Updates user email address</p>

**Kind**: instance method of [<code>User</code>](#GrinderyClient.User)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - <p>Promise object with <code>true</code> if user email was updated or <code>false</code> if not</p>  
**Since**: 0.9.11  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.email | <code>string</code> | <p>User email address</p> |

<a name="GrinderyClient.User+saveNotificationsState"></a>

#### user.saveNotificationsState(payload) ⇒ <code>Promise.&lt;boolean&gt;</code>
<p>Saves user notifications state in CRM. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#GrinderyClient.User)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.state | <code>string</code> | <p>User notifications state</p> |
| [payload.notificationToken] | <code>string</code> | <p>User notification token (optional)</p> |

<a name="GrinderyClient.Workflow"></a>

### GrinderyClient.Workflow
<p>Workflow class</p>

**Kind**: static class of [<code>GrinderyClient</code>](#GrinderyClient)  

* [.Workflow](#GrinderyClient.Workflow)
    * [new Workflow()](#new_GrinderyClient.Workflow_new)
    * [.create(payload)](#GrinderyClient.Workflow+create) ⇒ <code>Promise</code>
    * [.list(payload)](#GrinderyClient.Workflow+list) ⇒ <code>Promise</code>
    * [.update(payload)](#GrinderyClient.Workflow+update) ⇒ <code>Promise</code>
    * [.delete(payload)](#GrinderyClient.Workflow+delete) ⇒ <code>Promise</code>
    * [.getExecutions(payload)](#GrinderyClient.Workflow+getExecutions) ⇒ <code>Promise</code>
    * [.getExecutionLog(payload)](#GrinderyClient.Workflow+getExecutionLog) ⇒ <code>Promise</code>
    * [.moveToWorkspace(payload)](#GrinderyClient.Workflow+moveToWorkspace) ⇒ <code>Promise</code>

<a name="new_GrinderyClient.Workflow_new"></a>

#### new Workflow()
<p>A class to interact with workflow object</p>

<a name="GrinderyClient.Workflow+create"></a>

#### workflow.create(payload) ⇒ <code>Promise</code>
<p>Creates new workflow. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#GrinderyClient.Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with new workflow key</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.workflow | <code>Workflow</code> | <p>New workflow object</p> |
| [payload.workspaceKey] | <code>string</code> | <p>Workspace key. Optional</p> |

<a name="GrinderyClient.Workflow+list"></a>

#### workflow.list(payload) ⇒ <code>Promise</code>
<p>Lists user's workflows. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#GrinderyClient.Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of user's workflows</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| [payload.workspaceKey] | <code>string</code> | <p>Workspace key. Optional.</p> |

<a name="GrinderyClient.Workflow+update"></a>

#### workflow.update(payload) ⇒ <code>Promise</code>
<p>Updates a single workflow. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#GrinderyClient.Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with workflow key</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.key | <code>string</code> | <p>Workflow key</p> |
| payload.workflow | <code>Workflow</code> | <p>Updated workflow object</p> |

<a name="GrinderyClient.Workflow+delete"></a>

#### workflow.delete(payload) ⇒ <code>Promise</code>
<p>Deletes user's workflow by key. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#GrinderyClient.Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>deleted</code> property <code>true</code> or <code>false</code></p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.key | <code>string</code> | <p>Workflow key</p> |

<a name="GrinderyClient.Workflow+getExecutions"></a>

#### workflow.getExecutions(payload) ⇒ <code>Promise</code>
<p>Gets workflow executions. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#GrinderyClient.Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of workflow executions</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.workflowKey | <code>string</code> | <p>Workflow key</p> |
| [payload.since] | <code>number</code> | <p>Since parameter used for pagination. Optional.</p> |
| [payload.until] | <code>number</code> | <p>Until parameter used for pagination. Optional.</p> |
| [payload.limit] | <code>number</code> | <p>Limit parameter used for pagination. Optional.</p> |

<a name="GrinderyClient.Workflow+getExecutionLog"></a>

#### workflow.getExecutionLog(payload) ⇒ <code>Promise</code>
<p>Gets workflow execution log. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#GrinderyClient.Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with workflow execution log</p>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.executionId | <code>string</code> | <p>Workflow execution ID</p> |

<a name="GrinderyClient.Workflow+moveToWorkspace"></a>

#### workflow.moveToWorkspace(payload) ⇒ <code>Promise</code>
<p>Moves workflow to a workspace</p>

**Kind**: instance method of [<code>Workflow</code>](#GrinderyClient.Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.workflowKey | <code>string</code> | <p>Workflow key</p> |
| payload.workspaceKey | <code>string</code> | <p>The destination workspace key</p> |

<a name="GrinderyClient.Workspace"></a>

### GrinderyClient.Workspace
<p>Workspace class</p>

**Kind**: static class of [<code>GrinderyClient</code>](#GrinderyClient)  

* [.Workspace](#GrinderyClient.Workspace)
    * [new Workspace()](#new_GrinderyClient.Workspace_new)
    * [.list()](#GrinderyClient.Workspace+list) ⇒ <code>Promise</code>
    * [.create(payload)](#GrinderyClient.Workspace+create) ⇒ <code>Promise</code>
    * [.update(payload)](#GrinderyClient.Workspace+update) ⇒ <code>Promise</code>
    * [.leave(payload)](#GrinderyClient.Workspace+leave) ⇒ <code>Promise</code>
    * [.delete(payload)](#GrinderyClient.Workspace+delete) ⇒ <code>Promise</code>
    * [.addUser(payload)](#GrinderyClient.Workspace+addUser) ⇒ <code>Promise</code>
    * [.removeUser(payload)](#GrinderyClient.Workspace+removeUser) ⇒ <code>Promise</code>
    * [.addAdmin(payload)](#GrinderyClient.Workspace+addAdmin) ⇒ <code>Promise</code>
    * [.removeAdmin(payload)](#GrinderyClient.Workspace+removeAdmin) ⇒ <code>Promise</code>

<a name="new_GrinderyClient.Workspace_new"></a>

#### new Workspace()
<p>A class to interact with workspaces</p>

<a name="GrinderyClient.Workspace+list"></a>

#### workspace.list() ⇒ <code>Promise</code>
<p>Gets list of user's workspaces</p>

**Kind**: instance method of [<code>Workspace</code>](#GrinderyClient.Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of user's workspaces</p>  
**Since**: 0.6.0  
<a name="GrinderyClient.Workspace+create"></a>

#### workspace.create(payload) ⇒ <code>Promise</code>
<p>Creates new workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#GrinderyClient.Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with a created workspace key</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.workspace | <code>object</code> | <p>Workspace properties</p> |

<a name="GrinderyClient.Workspace+update"></a>

#### workspace.update(payload) ⇒ <code>Promise</code>
<p>Updates a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#GrinderyClient.Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with an updated workspace</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.workspace | <code>object</code> | <p>Workspace properties</p> |

<a name="GrinderyClient.Workspace+leave"></a>

#### workspace.leave(payload) ⇒ <code>Promise</code>
<p>Removes user from a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#GrinderyClient.Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with a <code>left</code> property equals <code>true</code> on success</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.key | <code>string</code> | <p>Workspace key</p> |

<a name="GrinderyClient.Workspace+delete"></a>

#### workspace.delete(payload) ⇒ <code>Promise</code>
<p>Deletes workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#GrinderyClient.Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.key | <code>string</code> | <p>Workspace key</p> |

<a name="GrinderyClient.Workspace+addUser"></a>

#### workspace.addUser(payload) ⇒ <code>Promise</code>
<p>Adds user (member) to a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#GrinderyClient.Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.key | <code>string</code> | <p>Workspace key</p> |
| payload.userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="GrinderyClient.Workspace+removeUser"></a>

#### workspace.removeUser(payload) ⇒ <code>Promise</code>
<p>Removes user (member) from a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#GrinderyClient.Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.key | <code>string</code> | <p>Workspace key</p> |
| payload.userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="GrinderyClient.Workspace+addAdmin"></a>

#### workspace.addAdmin(payload) ⇒ <code>Promise</code>
<p>Adds admin to a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#GrinderyClient.Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.key | <code>string</code> | <p>Workspace key</p> |
| payload.userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="GrinderyClient.Workspace+removeAdmin"></a>

#### workspace.removeAdmin(payload) ⇒ <code>Promise</code>
<p>Removes admin from a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#GrinderyClient.Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> |  |
| payload.key | <code>string</code> | <p>Workspace key</p> |
| payload.userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="BlockchainProps"></a>

## BlockchainProps : <code>Object</code>
<p>Blockchain object properties</p>

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | <p>An Id of the chain, following CAIP-2 schema e.g. eip155:1.</p> |
| label | <code>string</code> | <p>User-friendly chain name, e.g. Ethereum.</p> |
| icon | <code>string</code> | <p>Base64 encoded image string.</p> |
| [token] | <code>string</code> | <p>Default chain token symbol, e.g. ETH.</p> |
| [tokenAddress] | <code>string</code> | <p>Default chain token contract address.</p> |

<a name="ConnectorProps"></a>

## ConnectorProps : <code>Object</code>
<p>Connector object properties</p>

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>A key to uniquely identify this connector.</p> |
| name | <code>string</code> | <p>A short name to uniquely identify this connector app. Name for web3 connector must include blockchain name, for example: &quot;Moloch on Ethereum&quot;.</p> |
| version | <code>string</code> | <p>version identifier for your code.</p> |
| platformVersion | <code>string</code> | <p>version identifier for the Grindery Nexus execution environment.</p> |
| type | <code>string</code> | <p>Connector type. One of <code>web2</code>, <code>web3</code>.</p> |
| [description] | <code>string</code> | <p>Short user-friendly connector description.</p> |
| [triggers] | <code>Array.&lt;Object&gt;</code> | <p>All the triggers for your connector app.</p> |
| [actions] | <code>Array.&lt;Object&gt;</code> | <p>All the actions for your connector app.</p> |
| [recipes] | <code>Array.&lt;Object&gt;</code> |  |
| [authentication] | <code>Object</code> | <p>Choose what scheme your API uses for authentication.</p> |
| [icon] | <code>string</code> | <p>Base64 encoded image string.</p> |
| [pricing] | <code>string</code> | <p>URL of the pricing page.</p> |
| [user] | <code>string</code> | <p>Creator's user ID.</p> |
| [workspace] | <code>string</code> | <p>Creator's workspace ID.</p> |
| [access] | <code>string</code> | <p>Who can use this connector. One of <code>Public</code>, <code>Private</code>, <code>Workspace</code>.</p> |

<a name="UserProps"></a>

## UserProps : <code>Object</code>
<p>User object properties</p>

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>User ID, e.g. eip155:1:0x44Ab2C419132f3fFE29420dC01AD03A5F2fdf5c0.</p> |
| address | <code>string</code> | <p>User wallet address, e.g. 0x44Ab2C419132f3fFE29420dC01AD03A5F2fdf5c0.</p> |
| address_short | <code>string</code> | <p>User wallet address in short format, e.g. 0x44Ab...f5c0.</p> |
| workspace | <code>string</code> \| <code>null</code> | <p>User's workspace id, or null for default workspace.</p> |

