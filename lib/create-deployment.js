// Packages
const fetch = require("node-fetch");

// Modules
const getDeploymentName = require("./get-deployment-name.js");
const getDeploymentURL = require("./get-deployment-url.js");

function mapper(file) {
  return {
    file: file.name,
    sha: file.sha,
    size: file.content.length
  };
}

function createDeployment(token, config, files) {
  const deployURL = getDeploymentURL(config);
  const name = getDeploymentName(config);

  return async () => {
    const response = await fetch(deployURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        deploymentType: "STATIC",
        files: files.map(mapper)
      })
    });

    const body = await response.json();

    if (!response.ok) {
      (body.error.warnings || []).forEach(warning =>
        console.warn(`Warning: ${warning.reason}\n${warning.sha}`)
      );

      (body.error.missing || []).forEach(missing =>
        console.warn(`Warning: The file ${missing} is missing.`)
      );
      throw new Error(body.error.message);
    }

    return body;
  };
}

module.exports = createDeployment;
