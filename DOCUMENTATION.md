<a name="NexusClient"></a>

## NexusClient
<p>Grindery Nexus Client</p>

**Kind**: global class  

* [NexusClient](#NexusClient)
    * [new NexusClient()](#new_NexusClient_new)
    * [.authenticate(token)](#NexusClient+authenticate) ⇒ <code>void</code>
    * [.getToken()](#NexusClient+getToken) ⇒ <code>string</code>
    * [.createWorkflow(workflow)](#NexusClient+createWorkflow) ⇒ <code>Promise</code>
    * [.listWorkflows(userAccountId)](#NexusClient+listWorkflows) ⇒ <code>Promise</code>
    * [.updateWorkflow(key, userAccountId, workflow)](#NexusClient+updateWorkflow) ⇒ <code>Promise</code>
    * [.getWorkflowExecutions(workflowKey)](#NexusClient+getWorkflowExecutions) ⇒ <code>Promise</code>
    * [.getWorkflowExecutionLog(executionId)](#NexusClient+getWorkflowExecutionLog) ⇒ <code>Promise</code>
    * [.isAllowedUser(userAccountId)](#NexusClient+isAllowedUser) ⇒ <code>Promise</code>
    * [.testAction(userAccountId, step, input)](#NexusClient+testAction) ⇒ <code>Promise</code>
    * [.getConnectors()](#NexusClient+getConnectors) ⇒ <code>Promise</code>
    * [.deleteWorkflow(userAccountId, key)](#NexusClient+deleteWorkflow) ⇒ <code>Promise</code>
    * [.requestEarlyAccess(userAccountId, email)](#NexusClient+requestEarlyAccess) ⇒ <code>Promise</code>
    * [.saveWalletAddress(userAccountId, walletAddress, [email])](#NexusClient+saveWalletAddress) ⇒ <code>Promise</code>
    * [.callInputProvider(connectorKey, operationKey, body)](#NexusClient+callInputProvider) ⇒ <code>Promise</code>
    * [.callWebhook(connectorKey, operationKey, body)](#NexusClient+callWebhook) ⇒ <code>Promise</code>

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

### nexusClient.createWorkflow(workflow) ⇒ <code>Promise</code>
<p>Creates new workflow. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with new workflow key</p>  

| Param | Type | Description |
| --- | --- | --- |
| workflow | <code>Workflow</code> | <p>New workflow object</p> |

<a name="NexusClient+listWorkflows"></a>

### nexusClient.listWorkflows(userAccountId) ⇒ <code>Promise</code>
<p>Lists user's workflows. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of user's workflows</p>  

| Param | Type | Description |
| --- | --- | --- |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="NexusClient+updateWorkflow"></a>

### nexusClient.updateWorkflow(key, userAccountId, workflow) ⇒ <code>Promise</code>
<p>Updates a single workflow. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with workflow key</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workflow key</p> |
| userAccountId | <code>string</code> | <p>User account ID</p> |
| workflow | <code>Workflow</code> | <p>Updated workflow object</p> |

<a name="NexusClient+getWorkflowExecutions"></a>

### nexusClient.getWorkflowExecutions(workflowKey) ⇒ <code>Promise</code>
<p>Gets workflow executions. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of workflow executions</p>  

| Param | Type | Description |
| --- | --- | --- |
| workflowKey | <code>string</code> | <p>Workflow key</p> |

<a name="NexusClient+getWorkflowExecutionLog"></a>

### nexusClient.getWorkflowExecutionLog(executionId) ⇒ <code>Promise</code>
<p>Gets workflow execution log. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with workflow execution log</p>  

| Param | Type | Description |
| --- | --- | --- |
| executionId | <code>string</code> | <p>Workflow execution ID</p> |

<a name="NexusClient+isAllowedUser"></a>

### nexusClient.isAllowedUser(userAccountId) ⇒ <code>Promise</code>
<p>Checks if user is approved for early access</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> if user is allowed and <code>false</code> if not</p>  

| Param | Type | Description |
| --- | --- | --- |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="NexusClient+testAction"></a>

### nexusClient.testAction(userAccountId, step, input) ⇒ <code>Promise</code>
<p>Tests driver action. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with action execution payload</p>  

| Param | Type | Description |
| --- | --- | --- |
| userAccountId | <code>string</code> | <p>User account ID</p> |
| step | <code>Operation</code> | <p>Workflow step</p> |
| input |  | <p>Sample user input</p> |

<a name="NexusClient+getConnectors"></a>

### nexusClient.getConnectors() ⇒ <code>Promise</code>
<p>Gets list of available connectors/drivers</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with an array of connectors/drivers</p>  
<a name="NexusClient+deleteWorkflow"></a>

### nexusClient.deleteWorkflow(userAccountId, key) ⇒ <code>Promise</code>
<p>Deletes user's workflow by key. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>deleted</code> property <code>true</code> or <code>false</code></p>  

| Param | Type | Description |
| --- | --- | --- |
| userAccountId | <code>string</code> | <p>User account ID</p> |
| key | <code>string</code> | <p>Workflow key</p> |

<a name="NexusClient+requestEarlyAccess"></a>

### nexusClient.requestEarlyAccess(userAccountId, email) ⇒ <code>Promise</code>
<p>Requests early access to Nexus app</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| userAccountId | <code>string</code> | <p>User account ID</p> |
| email | <code>string</code> | <p>User email</p> |

<a name="NexusClient+saveWalletAddress"></a>

### nexusClient.saveWalletAddress(userAccountId, walletAddress, [email]) ⇒ <code>Promise</code>
<p>Saves user wallet address in CRM. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with <code>true</code> on success</p>  

| Param | Type | Description |
| --- | --- | --- |
| userAccountId | <code>string</code> | <p>User account ID</p> |
| walletAddress | <code>string</code> | <p>User wallet address</p> |
| [email] | <code>string</code> | <p>User email, optional</p> |

<a name="NexusClient+callInputProvider"></a>

### nexusClient.callInputProvider(connectorKey, operationKey, body) ⇒ <code>Promise</code>
<p>Sends request to an operation's <code>inputFieldProviderUrl</code>. Authentication required.</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with operation's field provider response</p>  

| Param | Type | Description |
| --- | --- | --- |
| connectorKey | <code>string</code> | <p>Connector key</p> |
| operationKey | <code>string</code> | <p>Trigger or Action operation key</p> |
| body | <code>object</code> | <p>JSON RPC request object with user input</p> |

<a name="NexusClient+callWebhook"></a>

### nexusClient.callWebhook(connectorKey, operationKey, body) ⇒ <code>Promise</code>
<p>Sends webhook to a trigger</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <p>Promise object with JSON RPC 2.0 response</p>  

| Param | Type | Description |
| --- | --- | --- |
| connectorKey | <code>string</code> | <p>Connector key</p> |
| operationKey | <code>string</code> | <p>Trigger operation key</p> |
| body | <code>object</code> | <p>JSON body</p> |

