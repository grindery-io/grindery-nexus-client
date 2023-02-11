import jwt_decode from 'jwt-decode';
import { CustomJwtPayload } from '../types/types';
import { sendEngineRequest } from '../helpers/utils';

/**
 * User object properties
 *
 * @typedef {Object} UserProps
 * @property {string} id - User ID, e.g. eip155:1:0x44Ab2C419132f3fFE29420dC01AD03A5F2fdf5c0.
 * @property {string} address - User wallet address, e.g. 0x44Ab2C419132f3fFE29420dC01AD03A5F2fdf5c0.
 * @property {string} address_short - User wallet address in short format, e.g. 0x44Ab...f5c0.
 * @property {string|null} workspace - User's workspace id, or null for default workspace.
 */

/**
 * User class
 *
 * @description A class to interact with user object
 * @class
 * @memberof GrinderyClient
 */
class User {
  /**
   * User authentication token
   */
  private token: string | null = null;

  /**
   * User ID
   */
  public userId: string | null = null;

  /**
   * Workspace ID
   */
  public workspaceId: string | null = null;

  constructor(token?: string) {
    if (token) {
      this.token = token;
      const decodedToken = jwt_decode<CustomJwtPayload>(token);
      this.userId = decodedToken.sub || null;
      this.workspaceId = decodedToken.workspace || null;
    }
  }

  /**
   * Gets user information
   *
   * @since 0.9.9
   * @returns {UserProps|null} User information object or `null` if user is not authenticated. See {@link UserProps} definition.
   */
  get(): null | {
    id: string;
    address: string;
    address_short: string;
    workspace: string | null;
  } {
    if (!this.token || !this.userId) {
      return null;
    }
    const id = this.userId;
    const address = id.split(':')[2];
    const address_short = `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
    return {
      id,
      address,
      address_short,
      workspace: this.workspaceId || null,
    };
  }

  /**
   * Checks if user has email. Authentication required.
   *
   * @since 0.9.10
   * @returns {Promise<boolean>} Promise object with `true` if user has email and `false` if not
   */
  async hasEmail(): Promise<boolean> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    return await sendEngineRequest('or_isUserHasEmail', {}, this.token);
  }

  /**
   * Gets user email address
   *
   * @since 0.9.12
   * @returns {Promise<string|null>} Promise object with user email if exists, or `null` if not.
   */
  async getEmail(): Promise<string | null> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    return await sendEngineRequest('or_getUserEmail', {}, this.token);
  }

  /**
   * Deletes user account
   *
   * @since 0.9.11
   * @returns {Promise<boolean>} Promise object with `true` if user account was deleted
   */
  async delete(): Promise<boolean> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    return await sendEngineRequest('or_deleteUser', {}, this.token);
  }

  /**
   * Checks if user is approved for early access. Authentication required.
   *
   * @param {Object} payload
   * @param {string} [payload.app] - Application for which the access is checked. One of: `flow`, `cds`, `gateway` or `ping`. Optional.
   * @returns {Promise<boolean>} Promise object with `true` if user is allowed and `false` if not
   */
  async isAllowed({
    app,
  }: {
    app?: 'flow' | 'gateway' | 'cds' | 'ping';
  }): Promise<boolean> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    return await sendEngineRequest(
      'or_isAllowedUser',
      { app: app || undefined },
      this.token
    );
  }

  /**
   * Requests early access to Grindery apps. Authentication required.
   *
   * @param {Object} payload
   * @param {string} payload.email - User email
   * @param {string} [payload.source] - The source of request (optional)
   * @param {string} [payload.app] - The App to which access is requested (optional)
   * @returns {Promise<boolean>} Promise object with `true` on success
   */
  async requestEarlyAccess({
    email,
    source,
    app,
  }: {
    email: string;
    source?: string;
    app?: string;
  }): Promise<boolean> {
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
        app: app || '',
      },
      this.token
    );
  }

  /**
   * Saves user wallet address in CRM. Authentication required.
   *
   * @param {Object} payload
   * @param {string} payload.walletAddress - User wallet address
   * @param {string} [payload.email] - User email, optional
   * @returns {Promise<boolean>} Promise object with `true` on success
   */
  async saveWalletAddress({
    walletAddress,
    email,
  }: {
    walletAddress: string;
    email?: string;
  }): Promise<boolean> {
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
   * Updates user email address
   *
   * @since 0.9.11
   * @param {Object} payload
   * @param {string} payload.email - User email address
   * @returns {Promise<boolean>} Promise object with `true` if user email was updated or `false` if not
   */
  async updateEmail({ email }: { email: string }): Promise<boolean> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    if (!email) {
      throw new Error('Email is required');
    }
    return await sendEngineRequest('or_updateUserEmail', { email }, this.token);
  }

  /**
   * Saves user notifications state in CRM. Authentication required.
   *
   * @param {Object} payload
   * @param {string} payload.state - User notifications state
   * @param {string} [payload.notificationToken] - User notification token (optional)
   * @returns {Promise<boolean>} Promise object with `true` on success
   */
  async saveNotificationsState({
    state,
    notificationToken,
  }: {
    state: string;
    notificationToken?: string;
  }): Promise<boolean> {
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
}

export default User;
