const getFileURL = require("./get-file-url");
const { FILE_URL } = require("./constants.js");

describe("getFileURL", () => {
  it("should return a URL without teamId if not defined", () => {
    expect(getFileURL()).toBe(FILE_URL);
  });

  it("should return a URL with teamId", () => {
    expect(getFileURL({ teamId: "team_123" })).toBe(
      `${FILE_URL}?teamId=team_123`
    );
  });

  it("should return a URL with team", () => {
    expect(getFileURL({ team: "team_123" })).toBe(
      `${FILE_URL}?teamId=team_123`
    );
  });
});
