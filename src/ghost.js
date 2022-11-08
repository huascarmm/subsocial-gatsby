const GhostContentAPI = require("@tryghost/content-api")

class GhostConnector {
	constructor(config) {
    if (!GhostConnector._instance) {
      GhostConnector._instance = new GhostContentAPI(config);
    }
    return GhostConnector._instance;
  }
  static getInstance() {
    return this._instance;
  }
}
module.exports = GhostConnector;