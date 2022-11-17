<a name="NexusClient"></a>

## NexusClient
<p>Grindery Nexus Client</p>

**Kind**: global class  

* [NexusClient](#NexusClient)
    * [new NexusClient()](#new_NexusClient_new)
    * [.authenticate(token)](#NexusClient+authenticate) ⇒ <code>void</code>
    * [.getToken()](#NexusClient+getToken) ⇒ <code>string</code>
    * [.createWorkflow(workflow, workspaceKey)](#NexusClient+createWorkflow) ⇒ <code>Promise</code>
    * [.listWorkflows(workspaceKey)](#NexusClient+listWorkflows) ⇒ <code>Promise</code>
    * [.updateWorkflow(key, workflow)](#NexusClient+updateWorkflow) ⇒ <code>Promise</code>
    * [.getWorkflowExecutions(workflowKey, since, until, limit)](#NexusClient+getWorkflowExecutions) ⇒ <code>Promise</code>
    * [.getWorkflowExecutionLog(executionId)](#NexusClient+getWorkflowExecutionLog) ⇒ <code>Promise</code>
    * [.isAllowedUser()](#NexusClient+isAllowedUser) ⇒ <code>Promise</code>
    * [.testAction(step, input, environment)](#NexusClient+testAction) ⇒ <code>Promise</code>
    * ~~[.getConnectors()](#NexusClient+getConnectors) ⇒ <code>Promise</code>~~
    * [.deleteWorkflow(key)](#NexusClient+deleteWorkflow) ⇒ <code>Promise</code>
    * [.requestEarlyAccess(email)](#NexusClient+requestEarlyAccess) ⇒ <code>Promise</code>
    * [.saveWalletAddress(walletAddress, [email])](#NexusClient+saveWalletAddress) ⇒ <code>Promise</code>
    * [.callInputProvider(connectorKey, operationKey, body, environment)](#NexusClient+callInputProvider) ⇒ <code>Promise</code>
    * [.callWebhook(connectorKey, operationKey, body, environment)](#NexusClient+callWebhook) ⇒ <code>Promise</code>
    * [.listDrivers(environment)](#NexusClient+listDrivers) ⇒ <code>Promise</code>
    * [.getDriver(driverKey, environment)](#NexusClient+getDriver) ⇒ <code>Promise</code>
    * [.listWorkspaces()](#NexusClient+listWorkspaces) ⇒ <code>Promise</code>
    * [.createWorkspace(workspace)](#NexusClient+createWorkspace) ⇒ <code>Promise</code>
    * [.updateWorkspace(workspace)](#NexusClient+updateWorkspace) ⇒ <code>Promise</code>
    * [.leaveWorkspace(key)](#NexusClient+leaveWorkspace) ⇒ <code>Promise</code>
    * [.deleteWorkspace(key)](#NexusClient+deleteWorkspace) ⇒ <code>Promise</code>
    * [.moveWorkflowToWorkspace(workflowKey, workspaceKey)](#NexusClient+moveWorkflowToWorkspace) ⇒ <code>Promise</code>
    * [.addUserToWorkspace(key, userAccountId)](#NexusClient+addUserToWorkspace) ⇒ <code>Promise</code>
    * [.removeUserFromWorkspace(key, userAccountId)](#NexusClient+removeUserFromWorkspace) ⇒ <code>Promise</code>
    * [.addAdminToWorkspace(key, userAccountId)](#NexusClient+addAdminToWorkspace) ⇒ <code>Promise</code>
    * [.removeAdminFromWorkspace(key, userAccountId)](#NexusClient+removeAdminFromWorkspace) ⇒ <code>Promise</code>
    * [.listAuthCredentials(connectorId, environment)](#NexusClient+listAuthCredentials) ⇒ <code>Promise</code>
    * [.updateAuthCredentials(key, displayName)](#NexusClient+updateAuthCredentials) ⇒ <code>Promise</code>
    * [.putConnectorSecrets(connectorId, secrets, environment)](#NexusClient+putConnectorSecrets) ⇒ <code>Promise</code>
    * [.saveNotificationsState(state)](#NexusClient+saveNotificationsState) ⇒ <code>Promise</code>

<a name="new_NexusClient_new"></a>

### new NexusClient()
<p>A class to interact with Grindery Nexus engine API</p>

<a name="NexusClient+authenticate"></a>

### nexusClient.authenticate(token) ⇒ <code>void</code>
<p>Set authentication token</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | <p>Authentication token</p> |

<a name="NexusClient+getToken"></a>

### nexusClient.getToken() ⇒ <code>string</code>
<p>Get current authentication token. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>string</code> - <p>Authentication token</p>  
<a name="NexusClient+createWorkflow"></a>

### nexusClient.createWorkflow(workflow, workspaceKey) ⇒ <code>Promise</code>
<p>Creates new workflow. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with new workflow key</p>  

| Param | Type | Description |
| --- | --- | --- |
| workflow | <code>Workflow</code> | <p>New workflow object</p> |
| workspaceKey | <code>string</code> | <p>Workspace key. Optional</p> |

<a name="NexusClient+listWorkflows"></a>

### nexusClient.listWorkflows(workspaceKey) ⇒ <code>Promise</code>
<p>Lists user's workflows. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of user's workflows</p>  

| Param | Type | Description |
| --- | --- | --- |
| workspaceKey | <code>string</code> | <p>Workspace key. Optional.</p> |

<a name="NexusClient+updateWorkflow"></a>

### nexusClient.updateWorkflow(key, workflow) ⇒ <code>Promise</code>
<p>Updates a single workflow. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with workflow key</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workflow key</p> |
| workflow | <code>Workflow</code> | <p>Updated workflow object</p> |

<a name="NexusClient+getWorkflowExecutions"></a>

### nexusClient.getWorkflowExecutions(workflowKey, since, until, limit) ⇒ <code>Promise</code>
<p>Gets workflow executions. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of workflow executions</p>  

| Param | Type | Description |
| --- | --- | --- |
| workflowKey | <code>string</code> | <p>Workflow key</p> |
| since | <code>number</code> | <p>Since parameter used for pagination. Optional.</p> |
| until | <code>number</code> | <p>Until parameter used for pagination. Optional.</p> |
| limit | <code>number</code> | <p>Limit parameter used for pagination. Optional.</p> |

<a name="NexusClient+getWorkflowExecutionLog"></a>

### nexusClient.getWorkflowExecutionLog(executionId) ⇒ <code>Promise</code>
<p>Gets workflow execution log. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with workflow execution log</p>  

| Param | Type | Description |
| --- | --- | --- |
| executionId | <code>string</code> | <p>Workflow execution ID</p> |

<a name="NexusClient+isAllowedUser"></a>

### nexusClient.isAllowedUser() ⇒ <code>Promise</code>
<p>Checks if user is approved for early access. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> if user is allowed and <code>false</code> if not</p>  
<a name="NexusClient+testAction"></a>

### nexusClient.testAction(step, input, environment) ⇒ <code>Promise</code>
<p>Tests driver action. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with action execution payload</p>  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>Operation</code> | <p>Workflow step</p> |
| input |  | <p>Sample user input</p> |
| environment | <code>string</code> | <p>Specifiy execution environment (<code>production</code> or <code>staging</code>). Optional. Default value <code>production</code>.</p> |

<a name="NexusClient+getConnectors"></a>

### ~~nexusClient.getConnectors() ⇒ <code>Promise</code>~~
***Deprecated***

<p>Gets list of available connectors/drivers</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of connectors/drivers</p>  
<a name="NexusClient+deleteWorkflow"></a>

### nexusClient.deleteWorkflow(key) ⇒ <code>Promise</code>
<p>Deletes user's workflow by key. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>deleted</code> property <code>true</code> or <code>false</code></p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workflow key</p> |

<a name="NexusClient+requestEarlyAccess"></a>

### nexusClient.requestEarlyAccess(email) ⇒ <code>Promise</code>
<p>Requests early access to Nexus app. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | <p>User email</p> |

<a name="NexusClient+saveWalletAddress"></a>

### nexusClient.saveWalletAddress(walletAddress, [email]) ⇒ <code>Promise</code>
<p>Saves user wallet address in CRM. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| walletAddress | <code>string</code> | <p>User wallet address</p> |
| [email] | <code>string</code> | <p>User email, optional</p> |

<a name="NexusClient+callInputProvider"></a>

### nexusClient.callInputProvider(connectorKey, operationKey, body, environment) ⇒ <code>Promise</code>
<p>Sends request to an operation's <code>inputFieldProviderUrl</code>. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with operation's field provider response</p>  

| Param | Type | Description |
| --- | --- | --- |
| connectorKey | <code>string</code> | <p>Connector key</p> |
| operationKey | <code>string</code> | <p>Trigger or Action operation key</p> |
| body | <code>object</code> | <p>JSON RPC request object with user input</p> |
| environment | <code>string</code> | <p>Specifiy execution environment. Use <code>staging</code> for staging environment. Optional.</p> |

<a name="NexusClient+callWebhook"></a>

### nexusClient.callWebhook(connectorKey, operationKey, body, environment) ⇒ <code>Promise</code>
<p>Sends webhook to a trigger</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with JSON RPC 2.0 response</p>  

| Param | Type | Description |
| --- | --- | --- |
| connectorKey | <code>string</code> | <p>Connector key</p> |
| operationKey | <code>string</code> | <p>Trigger operation key</p> |
| body | <code>object</code> | <p>JSON body</p> |
| environment | <code>string</code> | <p>Specifiy execution environment. Use <code>staging</code> for staging environment. Optional.</p> |

<a name="NexusClient+listDrivers"></a>

### nexusClient.listDrivers(environment) ⇒ <code>Promise</code>
<p>Gets list of drivers</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of drivers</p>  
**Since**: 0.5.0  

| Param | Type | Description |
| --- | --- | --- |
| environment | <code>string</code> | <p>Set environment for getting drivers. Optional.</p> |

<a name="NexusClient+getDriver"></a>

### nexusClient.getDriver(driverKey, environment) ⇒ <code>Promise</code>
<p>Gets single driver</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with a CDS object or <code>null</code> if driver not found</p>  
**Since**: 0.5.0  

| Param | Type | Description |
| --- | --- | --- |
| driverKey | <code>string</code> | <p>Driver key</p> |
| environment | <code>string</code> | <p>Set environment for getting driver. Optional.</p> |

<a name="NexusClient+listWorkspaces"></a>

### nexusClient.listWorkspaces() ⇒ <code>Promise</code>
<p>Gets list of user's workspaces</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of user's workspaces</p>  
**Since**: 0.6.0  
<a name="NexusClient+createWorkspace"></a>

### nexusClient.createWorkspace(workspace) ⇒ <code>Promise</code>
<p>Creates new workspace</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with a created workspace key</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| workspace | <code>object</code> | <p>Workspace properties</p> |

<a name="NexusClient+updateWorkspace"></a>

### nexusClient.updateWorkspace(workspace) ⇒ <code>Promise</code>
<p>Updates a workspace</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with an updated workspace</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| workspace | <code>object</code> | <p>Workspace properties</p> |

<a name="NexusClient+leaveWorkspace"></a>

### nexusClient.leaveWorkspace(key) ⇒ <code>Promise</code>
<p>Removes user from a workspace</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with a <code>left</code> property equals <code>true</code> on success</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |

<a name="NexusClient+deleteWorkspace"></a>

### nexusClient.deleteWorkspace(key) ⇒ <code>Promise</code>
<p>Deletes workspace</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |

<a name="NexusClient+moveWorkflowToWorkspace"></a>

### nexusClient.moveWorkflowToWorkspace(workflowKey, workspaceKey) ⇒ <code>Promise</code>
<p>Moves workflow to a workspace</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| workflowKey | <code>string</code> | <p>Workflow key</p> |
| workspaceKey | <code>string</code> | <p>The destination workspace key</p> |

<a name="NexusClient+addUserToWorkspace"></a>

### nexusClient.addUserToWorkspace(key, userAccountId) ⇒ <code>Promise</code>
<p>Adds user (member) to a workspace</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="NexusClient+removeUserFromWorkspace"></a>

### nexusClient.removeUserFromWorkspace(key, userAccountId) ⇒ <code>Promise</code>
<p>Removes user (member) from a workspace</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="NexusClient+addAdminToWorkspace"></a>

### nexusClient.addAdminToWorkspace(key, userAccountId) ⇒ <code>Promise</code>
<p>Adds admin to a workspace</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="NexusClient+removeAdminFromWorkspace"></a>

### nexusClient.removeAdminFromWorkspace(key, userAccountId) ⇒ <code>Promise</code>
<p>Removes admin from a workspace</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with updated workspace properties</p>  
**Since**: 0.6.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workspace key</p> |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="NexusClient+listAuthCredentials"></a>

### nexusClient.listAuthCredentials(connectorId, environment) ⇒ <code>Promise</code>
<p>Gets list of user's saved authentication credentials. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with a list of saved credentials</p>  
**Since**: 0.7.0  

| Param | Type | Description |
| --- | --- | --- |
| connectorId | <code>string</code> | <p>Connector key</p> |
| environment | <code>string</code> | <p>Environment (<code>production</code> or <code>staging</code>)</p> |

<a name="NexusClient+updateAuthCredentials"></a>

### nexusClient.updateAuthCredentials(key, displayName) ⇒ <code>Promise</code>
<p>Updates saved authentication credential. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with updated credential</p>  
**Since**: 0.7.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Credential key</p> |
| displayName | <code>string</code> | <p>New display name</p> |

<a name="NexusClient+putConnectorSecrets"></a>

### nexusClient.putConnectorSecrets(connectorId, secrets, environment) ⇒ <code>Promise</code>
<p>Adds connector secrets (for admin only). Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise</p>  
**Since**: 0.7.0  

| Param | Type | Description |
| --- | --- | --- |
| connectorId | <code>string</code> | <p>Credential key</p> |
| secrets | <code>object</code> | <p>Object with key-value pairs</p> |
| environment | <code>string</code> | <p>Environment (<code>production</code> or <code>staging</code>)</p> |

<a name="NexusClient+saveNotificationsState"></a>

### nexusClient.saveNotificationsState(state) ⇒ <code>Promise</code>
<p>Saves user notifications state in CRM. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | <p>User notifications state</p> |

