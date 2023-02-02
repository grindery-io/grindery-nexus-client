import { listChains } from '../helpers/utils';

/**
 * Blockchain class
 *
 * @description A class to interact with blockchains
 */
class Chain {
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
    return await listChains(type, environment);
  }
}

export default Chain;
