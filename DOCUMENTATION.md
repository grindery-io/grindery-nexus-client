## Classes

<dl>
<dt><a href="#Chain">Chain</a></dt>
<dd><p>Blockchain class</p></dd>
<dt><a href="#Connector">Connector</a></dt>
<dd><p>Connector class</p></dd>
<dt><a href="#Credentials">Credentials</a></dt>
<dd><p>Auth class</p></dd>
<dt><a href="#GrinderyClient">GrinderyClient</a></dt>
<dd><p>Grindery Nexus Client</p></dd>
<dt><a href="#User">User</a></dt>
<dd><p>User class</p></dd>
<dt><a href="#Workflow">Workflow</a></dt>
<dd><p>Workflow class</p></dd>
<dt><a href="#Workspace">Workspace</a></dt>
<dd><p>Workspace class</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#User">User</a> : <code>Object</code></dt>
<dd><p>User details object definition</p></dd>
</dl>

<a name="Chain"></a>

## Chain
<p>Blockchain class</p>

**Kind**: global class  

* [Chain](#Chain)
    * [new Chain()](#new_Chain_new)
    * [.listChains(type, environment)](#Chain+listChains) ⇒ <code>Promise</code>

<a name="new_Chain_new"></a>

### new Chain()
<p>A class to interact with blockchains</p>

<a name="Chain+listChains"></a>

### chain.listChains(type, environment) ⇒ <code>Promise</code>
<p>Gets list of supported blockchains</p>

**Kind**: instance method of [<code>Chain</code>](#Chain)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of blockchains. See schema definition here: https://github.com/grindery-io/grindery-nexus-schema-v2/blob/staging/chains/README.md</p>  
**Since**: 0.9.1  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> | <code>&quot;all&quot;</code> | <p>Blockchain type. One of <code>all</code>, <code>evm</code>, <code>non-evm</code>. Default value is <code>all</code>.</p> |
| environment | <code>string</code> |  | <p>Set environment for getting chains list. Optional.</p> |

<a name="Connector"></a>

## Connector
<p>Connector class</p>

**Kind**: global class  

* [Connector](#Connector)
    * [new Connector()](#new_Connector_new)
    * [.get(driverKey, environment, enrich)](#Connector+get) ⇒ <code>Promise</code>
    * [.list(environment)](#Connector+list) ⇒ <code>Promise</code>
    * [.putSecrets(connectorId, secrets, environment)](#Connector+putSecrets) ⇒ <code>Promise</code>
    * [.testAction(step, input, environment)](#Connector+testAction) ⇒ <code>Promise</code>
    * [.runAction(step, input, environment)](#Connector+runAction) ⇒ <code>Promise</code>
    * [.callInputProvider(connectorKey, operationKey, body, environment)](#Connector+callInputProvider) ⇒ <code>Promise</code>
    * [.callWebhook(connectorKey, operationKey, body, environment)](#Connector+callWebhook) ⇒ <code>Promise</code>

<a name="new_Connector_new"></a>

### new Connector()
<p>A class to interact with connectors</p>

<a name="Connector+get"></a>

### connector.get(driverKey, environment, enrich) ⇒ <code>Promise</code>
<p>Gets single connector</p>

**Kind**: instance method of [<code>Connector</code>](#Connector)  
**Returns**: <code>Promise</code> - <p>Promise object with a CDS object or <code>null</code> if driver not found</p>  
**Since**: 0.5.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| driverKey | <code>string</code> |  | <p>Connector key</p> |
| environment | <code>string</code> |  | <p>Set environment for getting driver. Optional.</p> |
| enrich | <code>boolean</code> | <code>true</code> | <p>If driver should be enriched with automated fields. Default is <code>true</code>.</p> |

<a name="Connector+list"></a>

### connector.list(environment) ⇒ <code>Promise</code>
<p>Gets list of connectors</p>

**Kind**: instance method of [<code>Connector</code>](#Connector)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of connectors</p>  
**Since**: 0.5.0  

| Param | Type | Description |
| --- | --- | --- |
| environment | <code>string</code> | <p>Set environment for getting connectors. Optional.</p> |

<a name="Connector+putSecrets"></a>

### connector.putSecrets(connectorId, secrets, environment) ⇒ <code>Promise</code>
<p>Adds connector secrets (for admin only). Authentication required.</p>

**Kind**: instance method of [<code>Connector</code>](#Connector)  
**Returns**: <code>Promise</code> - <p>Promise</p>  
**Since**: 0.7.0  

| Param | Type | Description |
| --- | --- | --- |
| connectorId | <code>string</code> | <p>Credential key</p> |
| secrets | <code>object</code> | <p>Object with key-value pairs</p> |
| environment | <code>string</code> | <p>Environment (<code>production</code> or <code>staging</code>)</p> |

<a name="Connector+testAction"></a>

### connector.testAction(step, input, environment) ⇒ <code>Promise</code>
<p>Tests driver action. Authentication required.</p>

**Kind**: instance method of [<code>Connector</code>](#Connector)  
**Returns**: <code>Promise</code> - <p>Promise object with action execution payload</p>  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>Operation</code> | <p>Workflow step</p> |
| input |  | <p>Sample user input</p> |
| environment | <code>string</code> | <p>Specifiy execution environment (<code>production</code> or <code>staging</code>). Optional. Default value <code>production</code>.</p> |

<a name="Connector+runAction"></a>

### connector.runAction(step, input, environment) ⇒ <code>Promise</code>
<p>Run a single action. Authentication required.</p>

**Kind**: instance method of [<code>Connector</code>](#Connector)  
**Returns**: <code>Promise</code> - <p>Promise object with action execution payload</p>  
**Since**: 0.9.0  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>Operation</code> | <p>Workflow step</p> |
| input |  | <p>Sample user input</p> |
| environment | <code>string</code> | <p>Specifiy execution environment (<code>production</code> or <code>staging</code>). Optional. Default value <code>production</code>.</p> |

<a name="Connector+callInputProvider"></a>

### connector.callInputProvider(connectorKey, operationKey, body, environment) ⇒ <code>Promise</code>
<p>Sends request to an operation's <code>inputFieldProviderUrl</code>. Authentication required.</p>

**Kind**: instance method of [<code>Connector</code>](#Connector)  
**Returns**: <code>Promise</code> - <p>Promise object with operation's field provider response</p>  

| Param | Type | Description |
| --- | --- | --- |
| connectorKey | <code>string</code> | <p>Connector key</p> |
| operationKey | <code>string</code> | <p>Trigger or Action operation key</p> |
| body | <code>object</code> | <p>JSON RPC request object with user input</p> |
| environment | <code>string</code> | <p>Specifiy execution environment. Use <code>staging</code> for staging environment. Optional.</p> |

<a name="Connector+callWebhook"></a>

### connector.callWebhook(connectorKey, operationKey, body, environment) ⇒ <code>Promise</code>
<p>Sends webhook to a trigger</p>

**Kind**: instance method of [<code>Connector</code>](#Connector)  
**Returns**: <code>Promise</code> - <p>Promise object with JSON RPC 2.0 response</p>  

| Param | Type | Description |
| --- | --- | --- |
| connectorKey | <code>string</code> | <p>Connector key</p> |
| operationKey | <code>string</code> | <p>Trigger operation key</p> |
| body | <code>object</code> | <p>JSON body</p> |
| environment | <code>string</code> | <p>Specifiy execution environment. Use <code>staging</code> for staging environment. Optional.</p> |

<a name="Credentials"></a>

## Credentials
<p>Auth class</p>

**Kind**: global class  

* [Credentials](#Credentials)
    * [new Credentials()](#new_Credentials_new)
    * [.list(connectorId, environment)](#Credentials+list) ⇒ <code>Promise</code>
    * [.update(key, displayName)](#Credentials+update) ⇒ <code>Promise</code>

<a name="new_Credentials_new"></a>

### new Credentials()
<p>A class to interact with authentication credentials</p>

<a name="Credentials+list"></a>

### credentials.list(connectorId, environment) ⇒ <code>Promise</code>
<p>Gets list of user's saved authentication credentials. Authentication required.</p>

**Kind**: instance method of [<code>Credentials</code>](#Credentials)  
**Returns**: <code>Promise</code> - <p>Promise object with a list of saved credentials</p>  
**Since**: 0.7.0  

| Param | Type | Description |
| --- | --- | --- |
| connectorId | <code>string</code> | <p>Connector key</p> |
| environment | <code>string</code> | <p>Environment (<code>production</code> or <code>staging</code>)</p> |

<a name="Credentials+update"></a>

### credentials.update(key, displayName) ⇒ <code>Promise</code>
<p>Updates saved authentication credential. Authentication required.</p>

**Kind**: instance method of [<code>Credentials</code>](#Credentials)  
**Returns**: <code>Promise</code> - <p>Promise object with updated credential</p>  
**Since**: 0.7.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Credential key</p> |
| displayName | <code>string</code> | <p>New display name</p> |

<a name="GrinderyClient"></a>

## GrinderyClient
<p>Grindery Nexus Client</p>

**Kind**: global class  
<a name="new_GrinderyClient_new"></a>

### new GrinderyClient()
<p>A class to interact with Grindery Nexus engine API</p>

<a name="User"></a>

## User
<p>User class</p>

**Kind**: global class  

* [User](#User)
    * [new User()](#new_User_new)
    * [.get()](#User+get) ⇒ [<code>User</code>](#User) \| <code>null</code>
    * [.hasEmail()](#User+hasEmail) ⇒ <code>Promise</code>
    * [.getEmail()](#User+getEmail) ⇒ <code>Promise</code>
    * [.delete()](#User+delete) ⇒ <code>Promise</code>
    * [.isAllowed(app)](#User+isAllowed) ⇒ <code>Promise</code>
    * [.requestEarlyAccess(email, source, app)](#User+requestEarlyAccess) ⇒ <code>Promise</code>
    * [.saveWalletAddress(walletAddress, [email])](#User+saveWalletAddress) ⇒ <code>Promise</code>
    * [.updateEmail()](#User+updateEmail) ⇒ <code>Promise</code>
    * [.saveNotificationsState(state, notificationToken)](#User+saveNotificationsState) ⇒ <code>Promise</code>

<a name="new_User_new"></a>

### new User()
<p>A class to interact with user object</p>

<a name="User+get"></a>

### user.get() ⇒ [<code>User</code>](#User) \| <code>null</code>
<p>Gets user information</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: [<code>User</code>](#User) \| <code>null</code> - <p>User information object or <code>null</code> if user is not authenticated.</p>  
**Since**: 0.9.9  
<a name="User+hasEmail"></a>

### user.hasEmail() ⇒ <code>Promise</code>
<p>Checks if user has email. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> if user has email and <code>false</code> if not</p>  
**Since**: 0.9.10  
<a name="User+getEmail"></a>

### user.getEmail() ⇒ <code>Promise</code>
<p>Gets user email address</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with user email if exists, or <code>null</code> if not.</p>  
**Since**: 0.9.12  
<a name="User+delete"></a>

### user.delete() ⇒ <code>Promise</code>
<p>Deletes user account</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> if user account was deleted</p>  
**Since**: 0.9.11  
<a name="User+isAllowed"></a>

### user.isAllowed(app) ⇒ <code>Promise</code>
<p>Checks if user is approved for early access. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> if user is allowed and <code>false</code> if not</p>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>string</code> | <p>Application for which the access is checked. One of: <code>flow</code>, <code>cds</code>, <code>gateway</code> or <code>ping</code>.</p> |

<a name="User+requestEarlyAccess"></a>

### user.requestEarlyAccess(email, source, app) ⇒ <code>Promise</code>
<p>Requests early access to Grindery apps. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | <p>User email</p> |
| source | <code>string</code> | <p>The source of request (optional)</p> |
| app | <code>string</code> | <p>The App to which access is requested (optional)</p> |

<a name="User+saveWalletAddress"></a>

### user.saveWalletAddress(walletAddress, [email]) ⇒ <code>Promise</code>
<p>Saves user wallet address in CRM. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| walletAddress | <code>string</code> | <p>User wallet address</p> |
| [email] | <code>string</code> | <p>User email, optional</p> |

<a name="User+updateEmail"></a>

### user.updateEmail() ⇒ <code>Promise</code>
<p>Updates user email address</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> if user email was updated or <code>false</code> if not</p>  
**Since**: 0.9.11  
<a name="User+saveNotificationsState"></a>

### user.saveNotificationsState(state, notificationToken) ⇒ <code>Promise</code>
<p>Saves user notifications state in CRM. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | <p>User notifications state</p> |
| notificationToken | <code>string</code> | <p>User notification token (optional)</p> |

<a name="Workflow"></a>

## Workflow
<p>Workflow class</p>

**Kind**: global class  

* [Workflow](#Workflow)
    * [new Workflow()](#new_Workflow_new)
    * [.create(workflow, workspaceKey)](#Workflow+create) ⇒ <code>Promise</code>
    * [.list(workspaceKey)](#Workflow+list) ⇒ <code>Promise</code>
    * [.update(key, workflow)](#Workflow+update) ⇒ <code>Promise</code>
    * [.delete(key)](#Workflow+delete) ⇒ <code>Promise</code>
    * [.getExecutions(workflowKey, since, until, limit)](#Workflow+getExecutions) ⇒ <code>Promise</code>
    * [.getExecutionLog(executionId)](#Workflow+getExecutionLog) ⇒ <code>Promise</code>
    * [.moveToWorkspace(workflowKey, workspaceKey)](#Workflow+moveToWorkspace) ⇒ <code>Promise</code>

<a name="new_Workflow_new"></a>

### new Workflow()
<p>A class to interact with workflow object</p>

<a name="Workflow+create"></a>

### workflow.create(workflow, workspaceKey) ⇒ <code>Promise</code>
<p>Creates new workflow. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with new workflow key</p>  

| Param | Type | Description |
| --- | --- | --- |
| workflow | [<code>Workflow</code>](#Workflow) | <p>New workflow object</p> |
| workspaceKey | <code>string</code> | <p>Workspace key. Optional</p> |

<a name="Workflow+list"></a>

### workflow.list(workspaceKey) ⇒ <code>Promise</code>
<p>Lists user's workflows. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of user's workflows</p>  

| Param | Type | Description |
| --- | --- | --- |
| workspaceKey | <code>string</code> | <p>Workspace key. Optional.</p> |

<a name="Workflow+update"></a>

### workflow.update(key, workflow) ⇒ <code>Promise</code>
<p>Updates a single workflow. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with workflow key</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workflow key</p> |
| workflow | [<code>Workflow</code>](#Workflow) | <p>Updated workflow object</p> |

<a name="Workflow+delete"></a>

### workflow.delete(key) ⇒ <code>Promise</code>
<p>Deletes user's workflow by key. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>deleted</code> property <code>true</code> or <code>false</code></p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workflow key</p> |

<a name="Workflow+getExecutions"></a>

### workflow.getExecutions(workflowKey, since, until, limit) ⇒ <code>Promise</code>
<p>Gets workflow executions. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of workflow executions</p>  

| Param | Type | Description |
| --- | --- | --- |
| workflowKey | <code>string</code> | <p>Workflow key</p> |
| since | <code>number</code> | <p>Since parameter used for pagination. Optional.</p> |
| until | <code>number</code> | <p>Until parameter used for pagination. Optional.</p> |
| limit | <code>number</code> | <p>Limit parameter used for pagination. Optional.</p> |

<a name="Workflow+getExecutionLog"></a>

### workflow.getExecutionLog(executionId) ⇒ <code>Promise</code>
<p>Gets workflow execution log. Authentication required.</p>

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with workflow execution log</p>  

| Param | Type | Description |
| --- | --- | --- |
| executionId | <code>string</code> | <p>Workflow execution ID</p> |

<a name="Workflow+moveToWorkspace"></a>

### workflow.moveToWorkspace(workflowKey, workspaceKey) ⇒ <code>Promise</code>
<p>Moves workflow to a workspace</p>

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| workflowKey | <code>string</code> | <p>Workflow key</p> |
| workspaceKey | <code>string</code> | <p>The destination workspace key</p> |

<a name="Workspace"></a>

## Workspace
<p>Workspace class</p>

**Kind**: global class  

* [Workspace](#Workspace)
    * [new Workspace()](#new_Workspace_new)
    * [.list()](#Workspace+list) ⇒ <code>Promise</code>
    * [.create(workspace)](#Workspace+create) ⇒ <code>Promise</code>
    * [.update(workspace)](#Workspace+update) ⇒ <code>Promise</code>
    * [.leave(key)](#Workspace+leave) ⇒ <code>Promise</code>
    * [.delete(key)](#Workspace+delete) ⇒ <code>Promise</code>
    * [.addUser(key, userAccountId)](#Workspace+addUser) ⇒ <code>Promise</code>
    * [.removeUser(key, userAccountId)](#Workspace+removeUser) ⇒ <code>Promise</code>
    * [.addAdmin(key, userAccountId)](#Workspace+addAdmin) ⇒ <code>Promise</code>
    * [.removeAdmin(key, userAccountId)](#Workspace+removeAdmin) ⇒ <code>Promise</code>

<a name="new_Workspace_new"></a>

### new Workspace()
<p>A class to interact with workspaces</p>

<a name="Workspace+list"></a>

### workspace.list() ⇒ <code>Promise</code>
<p>Gets list of user's workspaces</p>

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of user's workspaces</p>  
**Since**: 0.6.0  
<a name="Workspace+create"></a>

### workspace.create(workspace) ⇒ <code>Promise</code>
<p>Creates new workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with a created workspace key</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| workspace | <code>object</code> | <p>Workspace properties</p> |

<a name="Workspace+update"></a>

### workspace.update(workspace) ⇒ <code>Promise</code>
<p>Updates a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with an updated workspace</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| workspace | <code>object</code> | <p>Workspace properties</p> |

<a name="Workspace+leave"></a>

### workspace.leave(key) ⇒ <code>Promise</code>
<p>Removes user from a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with a <code>left</code> property equals <code>true</code> on success</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |

<a name="Workspace+delete"></a>

### workspace.delete(key) ⇒ <code>Promise</code>
<p>Deletes workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |

<a name="Workspace+addUser"></a>

### workspace.addUser(key, userAccountId) ⇒ <code>Promise</code>
<p>Adds user (member) to a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="Workspace+removeUser"></a>

### workspace.removeUser(key, userAccountId) ⇒ <code>Promise</code>
<p>Removes user (member) from a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="Workspace+addAdmin"></a>

### workspace.addAdmin(key, userAccountId) ⇒ <code>Promise</code>
<p>Adds admin to a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="Workspace+removeAdmin"></a>

### workspace.removeAdmin(key, userAccountId) ⇒ <code>Promise</code>
<p>Removes admin from a workspace</p>

**Kind**: instance method of [<code>Workspace</code>](#Workspace)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="User"></a>

## User : <code>Object</code>
<p>User details object definition</p>

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>User ID, e.g. eip155:1:0x44Ab2C419132f3fFE29420dC01AD03A5F2fdf5c0.</p> |
| address | <code>string</code> | <p>User wallet address, e.g. 0x44Ab2C419132f3fFE29420dC01AD03A5F2fdf5c0.</p> |
| address_short | <code>string</code> | <p>User wallet address in short format, e.g. 0x44Ab...f5c0.</p> |
| workspace | <code>string</code> \| <code>null</code> | <p>User's workspace id, or null for default workspace.</p> |


* [User](#User) : <code>Object</code>
    * [new User()](#new_User_new)
    * [.get()](#User+get) ⇒ [<code>User</code>](#User) \| <code>null</code>
    * [.hasEmail()](#User+hasEmail) ⇒ <code>Promise</code>
    * [.getEmail()](#User+getEmail) ⇒ <code>Promise</code>
    * [.delete()](#User+delete) ⇒ <code>Promise</code>
    * [.isAllowed(app)](#User+isAllowed) ⇒ <code>Promise</code>
    * [.requestEarlyAccess(email, source, app)](#User+requestEarlyAccess) ⇒ <code>Promise</code>
    * [.saveWalletAddress(walletAddress, [email])](#User+saveWalletAddress) ⇒ <code>Promise</code>
    * [.updateEmail()](#User+updateEmail) ⇒ <code>Promise</code>
    * [.saveNotificationsState(state, notificationToken)](#User+saveNotificationsState) ⇒ <code>Promise</code>

<a name="new_User_new"></a>

### new User()
<p>A class to interact with user object</p>

<a name="User+get"></a>

### user.get() ⇒ [<code>User</code>](#User) \| <code>null</code>
<p>Gets user information</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: [<code>User</code>](#User) \| <code>null</code> - <p>User information object or <code>null</code> if user is not authenticated.</p>  
**Since**: 0.9.9  
<a name="User+hasEmail"></a>

### user.hasEmail() ⇒ <code>Promise</code>
<p>Checks if user has email. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> if user has email and <code>false</code> if not</p>  
**Since**: 0.9.10  
<a name="User+getEmail"></a>

### user.getEmail() ⇒ <code>Promise</code>
<p>Gets user email address</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with user email if exists, or <code>null</code> if not.</p>  
**Since**: 0.9.12  
<a name="User+delete"></a>

### user.delete() ⇒ <code>Promise</code>
<p>Deletes user account</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> if user account was deleted</p>  
**Since**: 0.9.11  
<a name="User+isAllowed"></a>

### user.isAllowed(app) ⇒ <code>Promise</code>
<p>Checks if user is approved for early access. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> if user is allowed and <code>false</code> if not</p>  

| Param | Type | Description |
| --- | --- | --- |
| app | <code>string</code> | <p>Application for which the access is checked. One of: <code>flow</code>, <code>cds</code>, <code>gateway</code> or <code>ping</code>.</p> |

<a name="User+requestEarlyAccess"></a>

### user.requestEarlyAccess(email, source, app) ⇒ <code>Promise</code>
<p>Requests early access to Grindery apps. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | <p>User email</p> |
| source | <code>string</code> | <p>The source of request (optional)</p> |
| app | <code>string</code> | <p>The App to which access is requested (optional)</p> |

<a name="User+saveWalletAddress"></a>

### user.saveWalletAddress(walletAddress, [email]) ⇒ <code>Promise</code>
<p>Saves user wallet address in CRM. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| walletAddress | <code>string</code> | <p>User wallet address</p> |
| [email] | <code>string</code> | <p>User email, optional</p> |

<a name="User+updateEmail"></a>

### user.updateEmail() ⇒ <code>Promise</code>
<p>Updates user email address</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> if user email was updated or <code>false</code> if not</p>  
**Since**: 0.9.11  
<a name="User+saveNotificationsState"></a>

### user.saveNotificationsState(state, notificationToken) ⇒ <code>Promise</code>
<p>Saves user notifications state in CRM. Authentication required.</p>

**Kind**: instance method of [<code>User</code>](#User)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | <p>User notifications state</p> |
| notificationToken | <code>string</code> | <p>User notification token (optional)</p> |

