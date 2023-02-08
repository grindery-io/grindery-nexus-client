import { sendEngineRequest } from '../helpers/utils';

/**
 * Workspace class
 *
 * @description A class to interact with workspaces
 * @memberof GrinderyClient
 */
class Workspace {
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
   * Gets list of user's workspaces
   *
   * @since 0.6.0
   * @returns {Promise} Promise object with an array of user's workspaces
   */
  async list(): Promise<any> {
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
  async create(workspace: {
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
  async update(workspace: {
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
  async leave(key: string): Promise<any> {
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
  async delete(key: string): Promise<any> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!key) {
      throw new Error('Workspace key is required');
    }
    return await sendEngineRequest('or_deleteWorkspace', { key }, this.token);
  }

  /**
   * Adds user (member) to a workspace
   *
   * @since 0.6.0
   * @param {string} key - Workspace key
   * @param {string} userAccountId - User account ID
   * @returns {Promise} Promise object with updated workspace properties
   */
  async addUser(key: string, userAccountId: string): Promise<any> {
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
  async removeUser(key: string, userAccountId: string): Promise<any> {
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
  async addAdmin(key: string, userAccountId: string): Promise<any> {
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
  async removeAdmin(key: string, userAccountId: string): Promise<any> {
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
}

export default Workspace;
