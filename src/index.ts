import axios from 'axios';
import _ from 'lodash';
import {
  WorkflowExecution,
  WorkflowExecutionLog,
  Operation,
  Workflow,
} from './types';
import {
  enrichDriver,
  sendEngineHTTPRequest,
  sendEngineRequest,
} from './utils';

const WEB2_CONNECTORS_PATH =
  'https://api.github.com/repos/grindery-io/grindery-nexus-schema-v2/contents/cds/web2';

const WEB3_CONNECTORS_PATH =
  'https://api.github.com/repos/grindery-io/grindery-nexus-schema-v2/contents/cds/web3';

const CHAINS_PATH = 'https://cds.grindery.org/chains';
const CHAINS_STAGING_PATH = 'https://cds-staging.grindery.org/chains';

const DRIVERS_URL = 'https://cds.grindery.org';
const DRIVERS_STAGING_URL = 'https://cds-staging.grindery.org';

/**
 * Grindery Nexus Client
 *
 * @description A class to interact with Grindery Nexus engine API
 */
class NexusClient {
  /**
   * User authentication token
   */
  private token: string | null = null;

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
   * @param {string} workspaceKey - Workspace key. Optional
   * @returns {Promise} Promise object with new workflow key
   */
  async createWorkflow(
    workflow: Workflow,
    workspaceKey?: string
  ): Promise<any> {
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
        workflow: workflow,
        ...(typeof workspaceKey !== 'undefined' && { workspaceKey }),
      },
      this.token
    );
  }

  /**
   * Lists user's workflows. Authentication required.
   *
   * @param {string} workspaceKey - Workspace key. Optional.
   * @returns {Promise} Promise object with an array of user's workflows
   */
  async listWorkflows(workspaceKey?: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    return await sendEngineRequest(
      'or_listWorkflows',
      {
        ...(typeof workspaceKey !== 'undefined' && { workspaceKey }),
      },
      this.token
    );
  }

  /**
   * Updates a single workflow. Authentication required.
   *
   * @param {string} key - Workflow key
   * @param {Workflow} workflow - Updated workflow object
   * @returns {Promise} Promise object with workflow key
   */
  async updateWorkflow(key: string, workflow: Workflow): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Workflow key is required');
    }
    if (!workflow || !workflow.creator) {
      throw new Error('Workflow creator is required');
    }
    return await sendEngineRequest(
      'or_updateWorkflow',
      {
        key,
        workflow,
      },
      this.token
    );
  }

  /**
   * Gets workflow executions. Authentication required.
   *
   * @param {string} workflowKey - Workflow key
   * @param {number} since - Since parameter used for pagination. Optional.
   * @param {number} until - Until parameter used for pagination. Optional.
   * @param {number} limit - Limit parameter used for pagination. Optional.
   * @returns {Promise} Promise object with an array of workflow executions
   */
  async getWorkflowExecutions(
    workflowKey: string,
    since?: number,
    until?: number,
    limit?: number
  ): Promise<any> {
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
        ...(typeof since !== 'undefined' && { since }),
        ...(typeof until !== 'undefined' && { until }),
        ...(typeof limit !== 'undefined' && { limit }),
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
   * Checks if user is approved for early access. Authentication required.
   *
   * @returns {Promise} Promise object with `true` if user is allowed and `false` if not
   */
  async isAllowedUser(): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    return await sendEngineRequest('or_isAllowedUser', {}, this.token);
  }

  /**
   * Tests driver action. Authentication required.
   *
   * @param {Operation} step - Workflow step
   * @param input - Sample user input
   * @param {string} environment - Specifiy execution environment (`production` or `staging`). Optional. Default value `production`.
   * @returns {Promise} Promise object with action execution payload
   */
  async testAction(
    step: Operation,
    input: unknown,
    environment?: string
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
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
        step,
        input,
        environment: environment || 'production',
      },
      this.token
    );
  }

  /**
   * Gets list of available connectors/drivers
   * @deprecated since version 0.5.0
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
   * @param {string} key - Workflow key
   * @returns {Promise} Promise object with `deleted` property `true` or `false`
   */
  async deleteWorkflow(key: string): Promise<{ deleted: boolean }> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Workflow key is required');
    }
    return await sendEngineRequest(
      'or_deleteWorkflow',
      {
        key,
      },
      this.token
    );
  }

  /**
   * Requests early access to Nexus app. Authentication required.
   *
   * @param {string} email - User email
   * @param {string} source - The source of request (optional)
   * @returns {Promise} Promise object with `true` on success
   */
  async requestEarlyAccess(email: string, source?: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!email) {
      throw new Error('Email is required');
    }
    if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) {
      throw new Error('Invalid email');
    }
    return await sendEngineRequest(
      'or_requestEarlyAccess',
      {
        email,
        source: source || '',
      },
      this.token
    );
  }

  /**
   * Saves user wallet address in CRM. Authentication required.
   *
   * @param {string} walletAddress - User wallet address
   * @param {string} [email] - User email, optional
   * @returns {Promise} Promise object with `true` on success
   */
  async saveWalletAddress(walletAddress: string, email?: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
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
   * @param {string} environment - Specifiy execution environment. Use `staging` for staging environment. Optional.
   * @returns {Promise} Promise object with operation's field provider response
   */
  async callInputProvider(
    connectorKey: string,
    operationKey: string,
    body: any,
    environment?: string
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
      `/input-provider/${connectorKey}/${operationKey}${
        environment ? '?_grinderyEnvironment=' + environment : ''
      }`,
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
   * @param {string} environment - Specifiy execution environment. Use `staging` for staging environment. Optional.
   * @returns {Promise} Promise object with JSON RPC 2.0 response
   */
  async callWebhook(
    connectorKey: string,
    operationKey: string,
    body: any,
    environment?: string
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
      `/webhook/${connectorKey}/${operationKey}${
        environment ? '?_grinderyEnvironment=' + environment : ''
      }`,
      body
    );
  }

  /**
   * Gets list of drivers
   *
   * @since 0.5.0
   * @param {string} environment - Set environment for getting drivers. Optional.
   * @returns {Promise} Promise object with an array of drivers
   */
  async listDrivers(environment?: string): Promise<any> {
    let driversIndexURL = `${DRIVERS_URL}/_index.json`;

    if (environment && environment === 'staging') {
      driversIndexURL = `${DRIVERS_STAGING_URL}/_index.json`;
    }
    const res = await axios.get(driversIndexURL).catch(() => {
      return null;
    });
    if (res && res.data) {
      return Object.keys(res.data).map(key => ({
        ...res.data[key],
      }));
    } else {
      return [];
    }
  }

  /**
   * Gets single driver
   *
   * @since 0.5.0
   * @param {string} driverKey - Driver key
   * @param {string} environment - Set environment for getting driver. Optional.
   * @param {boolean} enrich - If driver should be enriched with automated fields. Default is `true`.
   * @returns {Promise} Promise object with a CDS object or `null` if driver not found
   */
  async getDriver(
    driverKey: string,
    environment?: string,
    enrich: boolean = true
  ): Promise<any> {
    if (!driverKey) {
      throw new Error('Driver key required');
    }
    let driverURL = `${DRIVERS_URL}/${driverKey}.json`;

    if (environment && environment === 'staging') {
      driverURL = `${DRIVERS_STAGING_URL}/${driverKey}.json`;
    }
    const res = await axios.get(driverURL).catch(() => {
      return null;
    });

    if (res && res.data) {
      if (enrich) {
        const blockchains = await this.listChains(
          'evm',
          environment || 'production'
        );
        return enrichDriver(res.data, blockchains || []);
      } else {
        return res.data;
      }
    } else {
      return null;
    }
  }

  /**
   * Gets list of user's workspaces
   *
   * @since 0.6.0
   * @returns {Promise} Promise object with an array of user's workspaces
   */
  async listWorkspaces(): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    return await sendEngineRequest('or_listWorkspaces', {}, this.token);
  }

  /**
   * Creates new workspace
   *
   * @since 0.6.0
   * @param {object} workspace - Workspace properties
   * @returns {Promise} Promise object with a created workspace key
   */
  async createWorkspace(workspace: {
    title: string;
    iconUrl?: string;
    about?: string;
    admins?: string[];
    users?: string[];
  }): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!workspace.title) {
      throw new Error('Workspace title is required');
    }
    return await sendEngineRequest('or_createWorkspace', workspace, this.token);
  }

  /**
   * Updates a workspace
   *
   * @since 0.6.0
   * @param {object} workspace - Workspace properties
   * @returns {Promise} Promise object with an updated workspace
   */
  async updateWorkspace(workspace: {
    key: string;
    title?: string;
    iconUrl?: string;
    about?: string;
    admins?: string[];
    users?: string[];
  }): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!workspace.key) {
      throw new Error('Workspace key is required');
    }
    if (workspace.admins && !Array.isArray(workspace.admins)) {
      throw new Error('Admins must be an array');
    }
    if (workspace.users && !Array.isArray(workspace.users)) {
      throw new Error('Users must be an array');
    }
    return await sendEngineRequest('or_updateWorkspace', workspace, this.token);
  }

  /**
   * Removes user from a workspace
   *
   * @since 0.6.0
   * @param {string} key - Workspace key
   * @returns {Promise} Promise object with a `left` property equals `true` on success
   */
  async leaveWorkspace(key: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Workspace key is required');
    }
    return await sendEngineRequest('or_leaveWorkspace', { key }, this.token);
  }

  /**
   * Deletes workspace
   *
   * @since 0.6.0
   * @param {string} key - Workspace key
   * @returns {Promise} Promise object with `true` on success
   */
  async deleteWorkspace(key: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Workspace key is required');
    }
    return await sendEngineRequest('or_deleteWorkspace', { key }, this.token);
  }

  /**
   * Moves workflow to a workspace
   *
   * @since 0.6.0
   * @param {string} workflowKey - Workflow key
   * @param {string} workspaceKey - The destination workspace key
   * @returns {Promise} Promise object with `true` on success
   */
  async moveWorkflowToWorkspace(
    workflowKey: string,
    workspaceKey: string
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!workflowKey) {
      throw new Error('Workflow key is required');
    }
    return await sendEngineRequest(
      'or_moveWorkflowToWorkspace',
      { key: workflowKey, newWorkspaceKey: workspaceKey },
      this.token
    );
  }

  /**
   * Adds user (member) to a workspace
   *
   * @since 0.6.0
   * @param {string} key - Workspace key
   * @param {string} userAccountId - User account ID
   * @returns {Promise} Promise object with updated workspace properties
   */
  async addUserToWorkspace(key: string, userAccountId: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Workspace key is required');
    }
    if (!userAccountId) {
      throw new Error('User ID is required');
    }
    return await sendEngineRequest(
      'or_workspaceAddUser',
      { key: key, accountId: userAccountId },
      this.token
    );
  }

  /**
   * Removes user (member) from a workspace
   *
   * @since 0.6.0
   * @param {string} key - Workspace key
   * @param {string} userAccountId - User account ID
   * @returns {Promise} Promise object with updated workspace properties
   */
  async removeUserFromWorkspace(
    key: string,
    userAccountId: string
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Workspace key is required');
    }
    if (!userAccountId) {
      throw new Error('User ID is required');
    }
    return await sendEngineRequest(
      'or_workspaceRemoveUser',
      { key: key, accountId: userAccountId },
      this.token
    );
  }

  /**
   * Adds admin to a workspace
   *
   * @since 0.6.0
   * @param {string} key - Workspace key
   * @param {string} userAccountId - User account ID
   * @returns {Promise} Promise object with updated workspace properties
   */
  async addAdminToWorkspace(key: string, userAccountId: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Workspace key is required');
    }
    if (!userAccountId) {
      throw new Error('User ID is required');
    }
    return await sendEngineRequest(
      'or_workspaceAddAdmin',
      { key: key, accountId: userAccountId },
      this.token
    );
  }

  /**
   * Removes admin from a workspace
   *
   * @since 0.6.0
   * @param {string} key - Workspace key
   * @param {string} userAccountId - User account ID
   * @returns {Promise} Promise object with updated workspace properties
   */
  async removeAdminFromWorkspace(
    key: string,
    userAccountId: string
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Workspace key is required');
    }
    if (!userAccountId) {
      throw new Error('User ID is required');
    }
    return await sendEngineRequest(
      'or_workspaceRemoveAdmin',
      { key: key, accountId: userAccountId },
      this.token
    );
  }

  /**
   * Gets list of user's saved authentication credentials. Authentication required.
   *
   * @since 0.7.0
   * @param {string} connectorId - Connector key
   * @param {string} environment - Environment (`production` or `staging`)
   * @returns {Promise} Promise object with a list of saved credentials
   */
  async listAuthCredentials(
    connectorId: string,
    environment: string
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!connectorId) {
      throw new Error('Connector ID is required');
    }
    if (!environment) {
      throw new Error('Environment is required');
    }
    return await sendEngineRequest(
      'or_listAuthCredentials',
      { connectorId: connectorId, environment: environment },
      this.token
    );
  }

  /**
   * Updates saved authentication credential. Authentication required.
   *
   * @since 0.7.0
   * @param {string} key - Credential key
   * @param {string} displayName - New display name
   * @returns {Promise} Promise object with updated credential
   */
  async updateAuthCredentials(key: string, displayName: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Credential key is required');
    }
    if (!displayName) {
      throw new Error('Display name is required');
    }
    return await sendEngineRequest(
      'or_updateAuthCredentials',
      { key: key, displayName: displayName },
      this.token
    );
  }

  /**
   * Adds connector secrets (for admin only). Authentication required.
   *
   * @since 0.7.0
   * @param {string} connectorId - Credential key
   * @param {object} secrets - Object with key-value pairs
   * @param {string} environment - Environment (`production` or `staging`)
   * @returns {Promise} Promise
   */
  async putConnectorSecrets(
    connectorId: string,
    secrets: { [key: string]: unknown },
    environment: string
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!connectorId) {
      throw new Error('Connector ID is required');
    }
    if (!secrets) {
      throw new Error('Secrets object is required');
    }
    if (!environment) {
      throw new Error('Environment is required');
    }
    return await sendEngineRequest(
      'or_putConnectorSecrets',
      { connectorId: connectorId, secrets: secrets, environment: environment },
      this.token
    );
  }

  /**
   * Saves user notifications state in CRM. Authentication required.
   *
   * @param {string} state - User notifications state
   * @param {string} notificationToken - User notification token (optional)
   * @returns {Promise} Promise object with `true` on success
   */
  async saveNotificationsState(
    state: string,
    notificationToken?: string
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!state) {
      throw new Error('Notifications state is required');
    }
    const payload: { state: string; notificationToken?: string } = {
      state,
    };
    if (notificationToken) {
      payload.notificationToken = notificationToken;
    }
    return await sendEngineRequest(
      'or_saveNotificationsState',
      payload,
      this.token
    );
  }

  /**
   * Run a single action. Authentication required.
   *
   * @since 0.9.0
   * @param {Operation} step - Workflow step
   * @param input - Sample user input
   * @param {string} environment - Specifiy execution environment (`production` or `staging`). Optional. Default value `production`.
   * @returns {Promise} Promise object with action execution payload
   */
  async runAction(
    step: Operation,
    input: unknown,
    environment?: string
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!step) {
      throw new Error('Workflow step object is required');
    }
    if (!input) {
      throw new Error('Sample input object is required');
    }
    return await sendEngineRequest(
      'or_runAction',
      {
        step,
        input,
        environment: environment || 'production',
      },
      this.token
    );
  }

  /**
   * Gets list of supported blockchains
   *
   * @since 0.9.1
   * @param {string} type - Blockchain type. One of `all`, `evm`, `non-evm`. Default value is `all`.
   * @param {string} environment - Set environment for getting chains list. Optional.
   * @returns {Promise} Promise object with an array of blockchains. See schema definition here: https://github.com/grindery-io/grindery-nexus-schema-v2/blob/staging/chains/README.md
   */
  async listChains(
    type: 'all' | 'evm' | 'non-evm' = 'all',
    environment?: string
  ): Promise<any> {
    let base = `${CHAINS_PATH}`;

    if (environment && environment === 'staging') {
      base = `${CHAINS_STAGING_PATH}`;
    }
    let url = base;
    if (type === 'all') {
      url = `${base}/_index.json`;
    }
    if (type === 'evm') {
      url = `${base}/evm.json`;
    }
    if (type === 'non-evm') {
      url = `${base}/non-evm.json`;
    }
    const res = await axios.get(url).catch(() => {
      return null;
    });

    return (res && res.data) || [];
  }
}

export { Operation, Workflow, WorkflowExecution, WorkflowExecutionLog };

export default NexusClient;
