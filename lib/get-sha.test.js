const getSHA = require("./get-sha");

describe("getSHA", () => {
  it("should return the correct SHA1", () => {
    expect(getSHA("This is a testing")).toBe(
      "dba2195925ffeb89e4cf52920e3c9d721182624e"
    );
  });
});
