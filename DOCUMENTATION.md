<a name="NexusClient"></a>

## NexusClient
<p>Grindery Nexus Client</p>

**Kind**: global class  

* [NexusClient](#NexusClient)
    * [new NexusClient()](#new_NexusClient_new)
    * [.createWorkflow(workflow)](#NexusClient+createWorkflow) ⇒ <code>Promise</code>
    * [.listWorkflows(userAccountId)](#NexusClient+listWorkflows) ⇒ <code>Promise</code>
    * [.updateWorkflow(key, userAccountId, workflow)](#NexusClient+updateWorkflow) ⇒ <code>Promise</code>
    * [.getWorkflowExecutions(workflowKey)](#NexusClient+getWorkflowExecutions) ⇒ <code>Promise</code>
    * [.getWorkflowExecutionLog(executionId)](#NexusClient+getWorkflowExecutionLog) ⇒ <code>Promise</code>
    * [.isAllowedUser(userAccountId)](#NexusClient+isAllowedUser) ⇒ <code>Promise</code>
    * [.testAction(userAccountId, step, input)](#NexusClient+testAction) ⇒ <code>Promise</code>

<a name="new_NexusClient_new"></a>

### new NexusClient()
<p>A class to interact with Grindery Nexus engine API</p>

<a name="NexusClient+createWorkflow"></a>

### nexusClient.createWorkflow(workflow) ⇒ <code>Promise</code>
<p>Creates new workflow</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <ul>
<li>Promise object with new workflow key</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| workflow | <code>Workflow</code> | <p>New workflow object</p> |

<a name="NexusClient+listWorkflows"></a>

### nexusClient.listWorkflows(userAccountId) ⇒ <code>Promise</code>
<p>Lists user's workflows</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <ul>
<li>Promise object with an array of user's workflows</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="NexusClient+updateWorkflow"></a>

### nexusClient.updateWorkflow(key, userAccountId, workflow) ⇒ <code>Promise</code>
<p>Updates a single workflow</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <ul>
<li>Promise object with workflow key</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Workflow key</p> |
| userAccountId | <code>string</code> | <p>User account ID</p> |
| workflow | <code>Workflow</code> | <p>Updated workflow object</p> |

<a name="NexusClient+getWorkflowExecutions"></a>

### nexusClient.getWorkflowExecutions(workflowKey) ⇒ <code>Promise</code>
<p>Gets workflow executions</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <ul>
<li>Promise object with an array of workflow executions</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| workflowKey | <code>string</code> | <p>Workflow key</p> |

<a name="NexusClient+getWorkflowExecutionLog"></a>

### nexusClient.getWorkflowExecutionLog(executionId) ⇒ <code>Promise</code>
<p>Gets workflow execution log</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <ul>
<li>Promise object with workflow execution log</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| executionId | <code>string</code> | <p>Workflow execution ID</p> |

<a name="NexusClient+isAllowedUser"></a>

### nexusClient.isAllowedUser(userAccountId) ⇒ <code>Promise</code>
<p>Checks if user is approved for early access</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <ul>
<li>Promise object with <code>true</code> if user is allowed and <code>false</code> if not</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| userAccountId | <code>string</code> | <p>User account ID</p> |

<a name="NexusClient+testAction"></a>

### nexusClient.testAction(userAccountId, step, input) ⇒ <code>Promise</code>
<p>Tests driver action</p>

**Kind**: instance method of [<code>NexusClient</code>](#NexusClient)  
**Returns**: <code>Promise</code> - <ul>
<li>Promise object with action execution payload</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| userAccountId | <code>string</code> | <p>User account ID</p> |
| step | <code>Operation</code> | <p>Workflow step</p> |
| input |  | <p>Sample user input</p> |

