const getDeploymentName = require("./get-deployment-name");
const { DEPLOYMENT_NAME } = require("./constants.js");

describe("getDeploymentName", () => {
  it("should return the configured deployment name", () => {
    expect(getDeploymentName({ deploymentName: "testing" })).toBe("testing");
  });

  it("should return the default deployment name", () => {
    expect(getDeploymentName()).toBe(DEPLOYMENT_NAME);
  });
});
