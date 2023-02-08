import Chain from './Chain';
import Connector from './Connector';
import Credentials from './Credentials';
import User from './User';
import Workflow from './Workflow';
import Workspace from './Workspace';

/**
 * Grindery Nexus Client
 *
 * @description A class to interact with Grindery Nexus engine API
 */
class GrinderyClient {
  /**
   * A class to interact with user object
   */
  public user: User;

  /**
   * A class to interact with workflow object
   */
  public workflow: Workflow;

  /**
   * A class to interact with authentication credentials
   */
  public credentials: Credentials;

  /**
   * A class to interact with connectors
   */
  public connector: Connector;

  /**
   * A class to interact with blockchains
   */
  public chain: Chain;

  /**
   * A class to interact with workspaces
   */
  public workspace: Workspace;

  constructor(token?: string) {
    this.user = new User(token);
    this.workflow = new Workflow(token);
    this.credentials = new Credentials(token);
    this.connector = new Connector(token);
    this.chain = new Chain();
    this.workspace = new Workspace(token);
  }
}

export default GrinderyClient;
