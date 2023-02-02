import { sendEngineRequest } from '../helpers/utils';
import { Workflow as WorkflowType } from '../types/types';

/**
 * Workflow class
 *
 * @description A class to interact with workflow object
 */
class Workflow {
  /**
   * User authentication token
   */
  private token: string | null = null;

  constructor(token?: string) {
    if (token) {
      this.token = token;
    }
  }

  /**
   * Creates new workflow. Authentication required.
   *
   * @param {Workflow} workflow - New workflow object
   * @param {string} workspaceKey - Workspace key. Optional
   * @returns {Promise} Promise object with new workflow key
   */
  async create(workflow: WorkflowType, workspaceKey?: string): Promise<any> {
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
  async list(workspaceKey?: string): Promise<any> {
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
  async update(key: string, workflow: WorkflowType): Promise<any> {
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
   * Deletes user's workflow by key. Authentication required.
   *
   * @param {string} key - Workflow key
   * @returns {Promise} Promise object with `deleted` property `true` or `false`
   */
  async delete(key: string): Promise<{ deleted: boolean }> {
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
   * Gets workflow executions. Authentication required.
   *
   * @param {string} workflowKey - Workflow key
   * @param {number} since - Since parameter used for pagination. Optional.
   * @param {number} until - Until parameter used for pagination. Optional.
   * @param {number} limit - Limit parameter used for pagination. Optional.
   * @returns {Promise} Promise object with an array of workflow executions
   */
  async getExecutions(
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
  async getExecutionLog(executionId: string): Promise<any> {
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
   * Moves workflow to a workspace
   *
   * @since 0.6.0
   * @param {string} workflowKey - Workflow key
   * @param {string} workspaceKey - The destination workspace key
   * @returns {Promise} Promise object with `true` on success
   */
  async moveToWorkspace(
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
}

export default Workflow;
