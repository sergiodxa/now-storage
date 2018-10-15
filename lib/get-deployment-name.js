const { DEPLOYMENT_NAME } = require("./constants.js");

function getDeploymentName(config = {}) {
  return config.deploymentName || DEPLOYMENT_NAME;
}

module.exports = getDeploymentName;
