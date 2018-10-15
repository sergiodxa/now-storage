const { DEPLOY_URL } = require("./constants.js");

function getDeploymentURL(config = {}) {
  return config.teamId || config.team
    ? `${DEPLOY_URL}?teamId=${config.teamId || config.team}`
    : DEPLOY_URL;
}

module.exports = getDeploymentURL;
