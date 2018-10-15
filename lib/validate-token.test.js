const validateToken = require("./validate-token");

describe("validateToken", () => {
  it("should throw if there is no token", () => {
    expect(() => validateToken()).toThrow("Missing Now token");
  });

  it("should throw if the token is not a string", () => {
    expect(() => validateToken(123)).toThrow("Invalid token");
  });

  it("should not throw if token is valid", () => {
    expect(validateToken("MY_TOKEN")).toBeTruthy();
  });
});
