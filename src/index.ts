import axios from 'axios';
import {
  WorkflowExecution,
  WorkflowExecutionLog,
  Operation,
  Workflow,
} from './types';
import { sendEngineHTTPRequest, sendEngineRequest } from './utils';

const WEB2_CONNECTORS_PATH =
  'https://api.github.com/repos/grindery-io/grindery-nexus-schema-v2/contents/cds/web2';

const WEB3_CONNECTORS_PATH =
  'https://api.github.com/repos/grindery-io/grindery-nexus-schema-v2/contents/cds/web3';

/**
 * Grindery Nexus Client
 *
 * @description A class to interact with Grindery Nexus engine API
 */
class NexusClient {
  /**
   * Is user authenticated to call sensitive methods
   */
  isAuthenticated: boolean = false;

  /**
   * User authentication token
   */
  private token: string | null = null;

  constructor() {}

  /**
   * Set authentication token
   *
   * @param {string} token - Authentication token
   * @returns {void}
   */
  authenticate(token: string): void {
    if (token) {
      this.token = token;
    } else {
      throw new Error('Token required');
    }
  }

  /**
   * Get current authentication token. Authentication required.
   * @returns {string} Authentication token
   */
  getToken(): string {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    return this.token;
  }

  /**
   * Creates new workflow. Authentication required.
   * @param {Workflow} workflow - New workflow object
   * @returns {Promise} Promise object with new workflow key
   */
  async createWorkflow(workflow: Workflow): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!workflow) {
      throw new Error('Workflow object is required');
    }
    if (!workflow.creator) {
      throw new Error('Workflow creator is required');
    }

    return await sendEngineRequest(
      'or_createWorkflow',
      {
        userAccountId: workflow.creator,
        workflow: workflow,
      },
      this.token
    );
  }

  /**
   * Lists user's workflows. Authentication required.
   *
   * @param {string} userAccountId - User account ID
   * @returns {Promise} Promise object with an array of user's workflows
   */
  async listWorkflows(userAccountId: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!userAccountId) {
      throw new Error('User account id is required');
    }
    return await sendEngineRequest(
      'or_listWorkflows',
      {
        userAccountId,
      },
      this.token
    );
  }

  /**
   * Updates a single workflow. Authentication required.
   *
   * @param {string} key - Workflow key
   * @param {string} userAccountId - User account ID
   * @param {Workflow} workflow - Updated workflow object
   * @returns {Promise} Promise object with workflow key
   */
  async updateWorkflow(
    key: string,
    userAccountId: string,
    workflow: Workflow
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Workflow key is required');
    }
    if (!userAccountId) {
      throw new Error('User account id is required');
    }
    if (!workflow || !workflow.creator) {
      throw new Error('Workflow creator is required');
    }
    return await sendEngineRequest(
      'or_updateWorkflow',
      {
        key,
        userAccountId,
        workflow,
      },
      this.token
    );
  }

  /**
   * Gets workflow executions. Authentication required.
   *
   * @param {string} workflowKey - Workflow key
   * @returns {Promise} Promise object with an array of workflow executions
   */
  async getWorkflowExecutions(workflowKey: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!workflowKey) {
      throw new Error('Workflow key is required');
    }
    return await sendEngineRequest(
      'or_getWorkflowExecutions',
      {
        workflowKey,
      },
      this.token
    );
  }

  /**
   * Gets workflow execution log. Authentication required.
   *
   * @param {string} executionId - Workflow execution ID
   * @returns {Promise} Promise object with workflow execution log
   */
  async getWorkflowExecutionLog(executionId: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!executionId) {
      throw new Error('Workflow execution ID is required');
    }
    return await sendEngineRequest(
      'or_getWorkflowExecutionLog',
      {
        executionId,
      },
      this.token
    );
  }

  /**
   * Checks if user is approved for early access
   *
   * @param {string} userAccountId - User account ID
   * @returns {Promise} Promise object with `true` if user is allowed and `false` if not
   */
  async isAllowedUser(userAccountId: string): Promise<any> {
    if (!userAccountId) {
      throw new Error('User account ID is required');
    }
    return await sendEngineRequest('or_isAllowedUser', {
      userAccountId,
    });
  }

  /**
   * Tests driver action. Authentication required.
   *
   * @param {string} userAccountId - User account ID
   * @param {Operation} step - Workflow step
   * @param input - Sample user input
   * @returns {Promise} Promise object with action execution payload
   */
  async testAction(
    userAccountId: string,
    step: Operation,
    input: unknown
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!userAccountId) {
      throw new Error('User account ID is required');
    }
    if (!step) {
      throw new Error('Workflow step object is required');
    }
    if (!input) {
      throw new Error('Sample input object is required');
    }
    return await sendEngineRequest(
      'or_testAction',
      {
        userAccountId,
        step,
        input,
      },
      this.token
    );
  }

  /**
   * Gets list of available connectors/drivers
   *
   * @returns {Promise} Promise object with an array of connectors/drivers
   */
  async getConnectors(): Promise<any> {
    const responses = [];
    const web2Connectors = await axios.get(WEB2_CONNECTORS_PATH);
    for (let i = 0; i < web2Connectors.data.length; i++) {
      const url = web2Connectors.data[i].download_url;
      if (url) {
        responses.push(await axios.get(url));
      }
    }
    const web3Connectors = await axios.get(WEB3_CONNECTORS_PATH);
    for (let i = 0; i < web3Connectors.data.length; i++) {
      const url = web3Connectors.data[i].download_url;
      if (url) {
        responses.push(await axios.get(url));
      }
    }

    return responses
      .filter(res => res && res.data)
      .map(res => ({
        ...res.data,
        html_url:
          (Array.isArray(web3Connectors.data) &&
            web3Connectors.data.find(
              c => c.name && c.name.includes(res.data.key)
            ) &&
            web3Connectors.data.find(
              c => c.name && c.name.includes(res.data.key)
            ).html_url) ||
          (Array.isArray(web2Connectors.data) &&
            web2Connectors.data.find(
              c => c.name && c.name.includes(res.data.key)
            ) &&
            web2Connectors.data.find(
              c => c.name && c.name.includes(res.data.key)
            ).html_url) ||
          '',
      }));
  }

  /**
   * Deletes user's workflow by key. Authentication required.
   *
   * @param {string} userAccountId - User account ID
   * @param {string} key - Workflow key
   * @returns {Promise} Promise object with `deleted` property `true` or `false`
   */
  async deleteWorkflow(
    userAccountId: string,
    key: string
  ): Promise<{ deleted: boolean }> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!userAccountId) {
      throw new Error('User account ID is required');
    }
    if (!key) {
      throw new Error('Workflow key is required');
    }
    return await sendEngineRequest(
      'or_deleteWorkflow',
      {
        userAccountId,
        key,
      },
      this.token
    );
  }

  /**
   * Requests early access to Nexus app
   *
   * @param {string} userAccountId - User account ID
   * @param {string} email - User email
   * @returns {Promise} Promise object with `true` on success
   */
  async requestEarlyAccess(userAccountId: string, email: string): Promise<any> {
    if (!userAccountId) {
      throw new Error('User account ID is required');
    }
    if (!email) {
      throw new Error('Email is required');
    }
    if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) {
      throw new Error('Invalid email');
    }
    return await sendEngineRequest('or_requestEarlyAccess', {
      userAccountId,
      email,
    });
  }

  /**
   * Saves user wallet address in CRM. Authentication required.
   *
   * @param {string} userAccountId - User account ID
   * @param {string} walletAddress - User wallet address
   * @param {string} [email] - User email, optional
   * @returns {Promise} Promise object with `true` on success
   */
  async saveWalletAddress(
    userAccountId: string,
    walletAddress: string,
    email?: string
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!userAccountId) {
      throw new Error('User account ID is required');
    }
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }
    if (email && !/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) {
      throw new Error('Invalid email');
    }
    return await sendEngineRequest(
      'or_saveWalletAddress',
      {
        userAccountId,
        email,
        walletAddress,
      },
      this.token
    );
  }

  /**
   * Sends request to an operation's `inputFieldProviderUrl`. Authentication required.
   *
   * @param {string} connectorKey - Connector key
   * @param {string} operationKey - Trigger or Action operation key
   * @param {object} body - JSON RPC request object with user input
   * @returns {Promise} Promise object with operation's field provider response
   */
  async callInputProvider(
    connectorKey: string,
    operationKey: string,
    body: any
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!connectorKey) {
      throw new Error('Connector key is required');
    }
    if (!operationKey) {
      throw new Error('Operation key is required');
    }
    if (!body) {
      throw new Error('JSON RPC request object is required');
    }
    if (!body.method || body.method !== 'grinderyNexusConnectorUpdateFields') {
      throw new Error(
        'JSON RPC request object must have "method" property with value "grinderyNexusConnectorUpdateFields"'
      );
    }
    if (!body.jsonrpc || body.jsonrpc !== '2.0') {
      throw new Error('JSON RPC request object must have 2.0 version');
    }
    if (!body.params || !body.params.key) {
      throw new Error(
        'JSON RPC request object must have "params" property with operation key specified'
      );
    }
    if (body.params.key !== operationKey) {
      throw new Error(
        'JSON RPC request object params "key" property must be equal to operationKey'
      );
    }
    return await sendEngineHTTPRequest(
      'POST',
      `/input-provider/${connectorKey}/${operationKey}`,
      body,
      this.token
    );
  }

  /**
   * Sends webhook to a trigger
   *
   * @param {string} connectorKey - Connector key
   * @param {string} operationKey - Trigger operation key
   * @param {object} body - JSON body
   * @returns {Promise} Promise object with JSON RPC 2.0 response
   */
  async callWebhook(
    connectorKey: string,
    operationKey: string,
    body: any
  ): Promise<any> {
    if (!connectorKey) {
      throw new Error('Connector key is required');
    }
    if (!operationKey) {
      throw new Error('Operation key is required');
    }
    if (!body) {
      throw new Error('Body object is required');
    }
    return await sendEngineHTTPRequest(
      'POST',
      `/webhook/${connectorKey}/${operationKey}`,
      body
    );
  }
}

export { Operation, Workflow, WorkflowExecution, WorkflowExecutionLog };

export default NexusClient;
