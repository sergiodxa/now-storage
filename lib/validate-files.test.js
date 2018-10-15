const validateFiles = require("./validate-files");

describe("validateFiles", () => {
  it("should throw if there is no files", () => {
    expect(() => validateFiles()).toThrow(
      "You must provide a file object or an array of file objects"
    );
  });

  it("should throw if the files array is empty", () => {
    expect(() => validateFiles([])).toThrow(
      "You must provide a file object or an array of file objects"
    );
  });

  it("should not throw if file is valid", () => {
    expect(
      validateFiles([{ name: "testing", content: "testing" }])
    ).toBeTruthy();
    expect(validateFiles({ name: "testing", content: "testing" })).toBeTruthy();
  });
});
