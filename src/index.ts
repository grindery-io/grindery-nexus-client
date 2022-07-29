import axios from 'axios';
import { Operation, Workflow } from './types';
import { sendEngineRequest } from './utils';

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
  constructor() {}

  /**
   * Creates new workflow
   * @param {Workflow} workflow - New workflow object
   * @returns {Promise} - Promise object with new workflow key
   */
  async createWorkflow(workflow: Workflow): Promise<any> {
    if (!workflow) {
      throw new Error('Workflow object is required');
    }
    if (!workflow.creator) {
      throw new Error('Workflow creator is required');
    }

    return await sendEngineRequest('or_createWorkflow', {
      userAccountId: workflow.creator,
      workflow: workflow,
    });
  }

  /**
   * Lists user's workflows
   *
   * @param {string} userAccountId - User account ID
   * @returns {Promise} - Promise object with an array of user's workflows
   */
  async listWorkflows(userAccountId: string): Promise<any> {
    if (!userAccountId) {
      throw new Error('User account id is required');
    }
    return await sendEngineRequest('or_listWorkflows', {
      userAccountId,
    });
  }

  /**
   * Updates a single workflow
   *
   * @param {string} key - Workflow key
   * @param {string} userAccountId - User account ID
   * @param {Workflow} workflow - Updated workflow object
   * @returns {Promise} - Promise object with workflow key
   */
  async updateWorkflow(
    key: string,
    userAccountId: string,
    workflow: Workflow
  ): Promise<any> {
    if (!key) {
      throw new Error('Workflow key is required');
    }
    if (!userAccountId) {
      throw new Error('User account id is required');
    }
    if (!workflow || !workflow.creator) {
      throw new Error('Workflow creator is required');
    }
    return await sendEngineRequest('or_updateWorkflow', {
      key,
      userAccountId,
      workflow,
    });
  }

  /**
   * Gets workflow executions
   *
   * @param {string} workflowKey - Workflow key
   * @returns {Promise} - Promise object with an array of workflow executions
   */
  async getWorkflowExecutions(workflowKey: string): Promise<any> {
    if (!workflowKey) {
      throw new Error('Workflow key is required');
    }
    return await sendEngineRequest('or_getWorkflowExecutions', {
      workflowKey,
    });
  }

  /**
   * Gets workflow execution log
   *
   * @param {string} executionId - Workflow execution ID
   * @returns {Promise} - Promise object with workflow execution log
   */
  async getWorkflowExecutionLog(executionId: string): Promise<any> {
    if (!executionId) {
      throw new Error('Workflow execution ID is required');
    }
    return await sendEngineRequest('or_getWorkflowExecutionLog', {
      executionId,
    });
  }

  /**
   * Checks if user is approved for early access
   *
   * @param {string} userAccountId - User account ID
   * @returns {Promise} - Promise object with `true` if user is allowed and `false` if not
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
   * Tests driver action
   *
   * @param {string} userAccountId - User account ID
   * @param {Operation} step - Workflow step
   * @param input - Sample user input
   * @returns {Promise} - Promise object with action execution payload
   */
  async testAction(
    userAccountId: string,
    step: Operation,
    input: unknown
  ): Promise<any> {
    if (!userAccountId) {
      throw new Error('User account ID is required');
    }
    if (!step) {
      throw new Error('Workflow step object is required');
    }
    if (!input) {
      throw new Error('Sample input object is required');
    }
    return await sendEngineRequest('or_testAction', {
      userAccountId,
      step,
      input,
    });
  }

  /**
   * Gets list of available connectors/drivers
   *
   * @returns {Promise} - Promise object with an array of connectors/drivers
   */
  async getConnectors(): Promise<any> {
    const responses = [];
    const web2Connectors = await axios.get(WEB2_CONNECTORS_PATH);
    for (let i = 0; i < web2Connectors.data.length; i++) {
      const url = web2Connectors.data[i].download_url;
      if (url) {
        responses.push(
          await axios.get(
            `${url}${/\?/.test(url) ? '&' : '?'}v=${encodeURIComponent(
              '2022.07.05v1'
            )}`
          )
        );
      }
    }
    const web3Connectors = await axios.get(WEB3_CONNECTORS_PATH);
    for (let i = 0; i < web3Connectors.data.length; i++) {
      const url = web3Connectors.data[i].download_url;
      if (url) {
        responses.push(
          await axios.get(
            `${url}${/\?/.test(url) ? '&' : '?'}v=${encodeURIComponent(
              '2022.07.05v1'
            )}`
          )
        );
      }
    }

    return responses.filter(res => res && res.data).map(res => res.data);
  }
}

export default new NexusClient();
