const validateFile = require("./validate-file");

describe("validateFile", () => {
  it("should throw if there is no file", () => {
    expect(() => validateFile()).toThrow("The file is required");
  });

  it("should throw if file is not an object", () => {
    expect(() => validateFile("testing")).toThrow(
      "The file provided must be an object"
    );
  });

  it("should throw if the file has no name", () => {
    expect(() => validateFile({})).toThrow("The file object must have a name");
  });

  it("should throw if the fila name is not an string", () => {
    expect(() => validateFile({ name: 123 })).toThrow(
      "The file name must be a string"
    );
  });

  it("should throw if the file has no content", () => {
    expect(() => validateFile({ name: "testing" })).toThrow(
      "The file object must have a content"
    );
  });

  it("should not throw if file is valid", () => {
    expect(validateFile({ name: "testing", content: "testing" })).toBeTruthy();
  });
});
