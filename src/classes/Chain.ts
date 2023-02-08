import { listChains } from '../helpers/utils';

/**
 * Blockchain object properties
 *
 * @typedef {Object} BlockchainProps
 * @property {string} value - An Id of the chain, following CAIP-2 schema e.g. eip155:1.
 * @property {string} label - User-friendly chain name, e.g. Ethereum.
 * @property {string} icon - Base64 encoded image string.
 * @property {string} [token] - Default chain token symbol, e.g. ETH.
 * @property {string} [tokenAddress] - Default chain token contract address.
 */

/**
 * Blockchain class
 *
 * @description A class to interact with blockchains
 * @memberof GrinderyClient
 */
class Chain {
  /**
   * Gets list of supported blockchains
   *
   * @since 0.9.1
   * @param {Object} payload
   * @param {string} payload.type=all - Blockchain type. One of `all`, `evm`, `non-evm`. Default value is `all`.
   * @param {string} [payload.environment] - Set environment for getting chains list. Optional.
   * @returns {Promise<BlockchainProps[]>} Promise object with an array of blockchains. See {@link BlockchainProps} definition.
   */
  async listChains({
    type = 'all',
    environment,
  }: {
    type: 'all' | 'evm' | 'non-evm';
    environment?: string;
  }): Promise<any> {
    return await listChains(type, environment);
  }
}

export default Chain;
