import { sendEngineRequest } from '../helpers/utils';

/**
 * Auth class
 *
 * @description A class to interact with authentication credentials
 * @memberof GrinderyClient
 */
class Credentials {
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
   * Gets list of user's saved authentication credentials. Authentication required.
   *
   * @since 0.7.0
   * @param {Object} payload
   * @param {string} payload.connectorId - Connector key
   * @param {string} payload.environment - Environment (`production` or `staging`)
   * @returns {Promise} Promise object with a list of saved credentials
   */
  async list({
    connectorId,
    environment,
  }: {
    connectorId: string;
    environment: string;
  }): Promise<any> {
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
   * @param {Object} payload
   * @param {string} payload.key - Credential key
   * @param {string} payload.displayName - New display name
   * @returns {Promise} Promise object with updated credential
   */
  async update({
    key,
    displayName,
  }: {
    key: string;
    displayName: string;
  }): Promise<any> {
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
}

export default Credentials;
