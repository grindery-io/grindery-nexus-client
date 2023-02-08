import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { CustomJwtPayload, Operation } from '../types/types';
import { DRIVERS_STAGING_URL, DRIVERS_URL } from '../helpers/constants';
import {
  enrichDriver,
  listChains,
  processDriver,
  sendEngineHTTPRequest,
  sendEngineRequest,
} from '../helpers/utils';
import { Connector as ConnectorType } from '../types/types';

/**
 * Connector object properties
 *
 * @typedef {Object} ConnectorProps
 * @property {string} key - A key to uniquely identify this connector.
 * @property {string} name - A short name to uniquely identify this connector app. Name for web3 connector must include blockchain name, for example: "Moloch on Ethereum".
 * @property {string} version - version identifier for your code.
 * @property {string} platformVersion - version identifier for the Grindery Nexus execution environment.
 * @property {string} type - Connector type. One of `web2`, `web3`.
 * @property {string} [description] - Short user-friendly connector description.
 * @property {Object[]} [triggers] - All the triggers for your connector app.
 * @property {Object[]} [actions] - All the actions for your connector app.
 * @property {Object[]} [recipes]
 * @property {Object} [authentication] - Choose what scheme your API uses for authentication.
 * @property {string} [icon] - Base64 encoded image string.
 * @property {string} [pricing] - URL of the pricing page.
 * @property {string} [user] - Creator's user ID.
 * @property {string} [workspace] - Creator's workspace ID.
 * @property {string} [access] - Who can use this connector. One of `Public`, `Private`, `Workspace`.
 */

/**
 * Connector class
 *
 * @description A class to interact with connectors
 * @memberof GrinderyClient
 */
class Connector {
  /**
   * User authentication token
   */
  private token: string | null = null;

  /**
   * User ID
   */
  private userId: string | null = null;

  /**
   * Workspace ID
   */
  private workspaceId: string | null = null;

  constructor(token?: string) {
    if (token) {
      this.token = token;
      const decodedToken = jwt_decode<CustomJwtPayload>(token);
      this.userId = decodedToken.sub || null;
      this.workspaceId = decodedToken.workspace || null;
    }
  }

  /**
   * Gets single connector
   *
   * @since 0.5.0
   * @param {Object} payload
   * @param {string} payload.driverKey - Connector key
   * @param {string} [payload.environment] - Set environment for getting driver. Optional.
   * @param {boolean} [payload.enrich=true] - If driver should be enriched with automated fields. Default is `true`.
   * @returns {Promise<ConnectorProps|null>} Promise object with a Connector object or `null` if driver not found. See {@link ConnectorProps} definition.
   */
  async get({
    driverKey,
    environment,
    enrich = true,
  }: {
    driverKey: string;
    environment?: string;
    enrich?: boolean;
  }): Promise<any> {
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
        const blockchains = await listChains(
          'evm',
          environment || 'production'
        );
        return enrichDriver(processDriver(res.data), blockchains || []);
      } else {
        return processDriver(res.data);
      }
    } else {
      return null;
    }
  }

  /**
   * Gets list of connectors
   *
   * @since 0.5.0
   * @param {Object} [payload]
   * @param {string} [payload.environment] - Set environment for getting connectors. Optional.
   * @returns {Promise<ConnectorProps[]>} Promise object with an array of connectors. See {@link ConnectorProps} definition.
   */
  async list({ environment }: { environment?: string }): Promise<any> {
    let driversIndexURL = `${DRIVERS_URL}/_index.json`;

    if (environment && environment === 'staging') {
      driversIndexURL = `${DRIVERS_STAGING_URL}/_index.json`;
    }
    const res = await axios.get(driversIndexURL).catch(() => {
      return null;
    });
    if (res && res.data) {
      const drivers = Object.keys(res.data)
        .map(key =>
          processDriver({
            ...res.data[key],
          })
        )
        .filter(
          (driver: ConnectorType) =>
            driver &&
            (!driver.access ||
              driver.access?.toLowerCase() === 'public' ||
              (this.userId &&
                driver.access?.toLowerCase() === 'private' &&
                driver.user?.toLowerCase() === this.userId.toLowerCase()) ||
              (this.workspaceId &&
                driver.access?.toLowerCase() === 'workspace' &&
                driver.workspace?.toLowerCase() ===
                  this.workspaceId.toLowerCase()))
        );
      return drivers;
    } else {
      return [];
    }
  }

  /**
   * Adds connector secrets (for admin only). Authentication required.
   *
   * @since 0.7.0
   * @param {Object} payload
   * @param {string} payload.connectorId - Credential key
   * @param {object} payload.secrets - Object with key-value pairs
   * @param {string} payload.environment - Environment (`production` or `staging`)
   * @returns {Promise} Promise
   */
  async putSecrets({
    connectorId,
    secrets,
    environment,
  }: {
    connectorId: string;
    secrets: { [key: string]: unknown };
    environment: string;
  }): Promise<any> {
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
   * Tests driver action. Authentication required.
   *
   * @param {Object} payload
   * @param {Operation} payload.step - Workflow step
   * @param {Object} payload.input - Sample user input
   * @param {string} [payload.environment=production] - Specifiy execution environment (`production` or `staging`). Optional. Default value `production`.
   * @returns {Promise<Object>} Promise object with action execution payload
   */
  async testAction({
    step,
    input,
    environment,
  }: {
    step: Operation;
    input: unknown;
    environment?: string;
  }): Promise<any> {
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
   * Run a single action. Authentication required.
   *
   * @since 0.9.0
   * @param {Object} payload
   * @param {Operation} payload.step - Workflow step
   * @param {Object} payload.input - Sample user input
   * @param {string} [payload.environment] - Specifiy execution environment (`production` or `staging`). Optional. Default value `production`.
   * @returns {Promise<Object>} Promise object with action execution payload
   */
  async runAction({
    step,
    input,
    environment,
  }: {
    step: Operation;
    input: unknown;
    environment?: string;
  }): Promise<any> {
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
   * Sends request to an operation's `inputFieldProviderUrl`. Authentication required.
   *
   * @param {Object} payload
   * @param {string} payload.connectorKey - Connector key
   * @param {string} payload.operationKey - Trigger or Action operation key
   * @param {object} payload.body - JSON RPC request object with user input
   * @param {string} [payload.environment] - Specifiy execution environment. Use `staging` for staging environment. Optional.
   * @returns {Promise<Object>} Promise object with operation's field provider response
   */
  async callInputProvider({
    connectorKey,
    operationKey,
    body,
    environment,
  }: {
    connectorKey: string;
    operationKey: string;
    body: any;
    environment?: string;
  }): Promise<any> {
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
   * @param {Object} payload
   * @param {string} payload.connectorKey - Connector key
   * @param {string} payload.operationKey - Trigger operation key
   * @param {object} payload.body - JSON body
   * @param {string} [payload.environment] - Specifiy execution environment. Use `staging` for staging environment. Optional.
   * @returns {Promise} Promise object with JSON RPC 2.0 response
   */
  async callWebhook({
    connectorKey,
    operationKey,
    body,
    environment,
  }: {
    connectorKey: string;
    operationKey: string;
    body: any;
    environment?: string;
  }): Promise<any> {
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
}

export default Connector;
