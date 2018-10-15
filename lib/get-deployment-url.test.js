const getDeploymentURL = require("./get-deployment-url");
const { DEPLOY_URL } = require("./constants.js");

describe("getDeploymentURL", () => {
  it("should return a URL without teamId if not defined", () => {
    expect(getDeploymentURL()).toBe(DEPLOY_URL);
  });

  it("should return a URL with teamId", () => {
    expect(getDeploymentURL({ teamId: "team_123" })).toBe(
      `${DEPLOY_URL}?teamId=team_123`
    );
  });

  it("should return a URL with team", () => {
    expect(getDeploymentURL({ team: "team_123" })).toBe(
      `${DEPLOY_URL}?teamId=team_123`
    );
  });
});
