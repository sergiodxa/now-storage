const Err = require("./error");

describe("Error", () => {
  it("should have property message", () => {
    const error = new Err("This is a test", "testing");
    expect(error.message).toBe("This is a test");
  });

  it("should have a property type", () => {
    const error = new Err("This is a test", "testing");
    expect(error.type).toBe("testing");
  });
});
