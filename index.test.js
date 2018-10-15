const fetch = require("node-fetch");
const { upload, multiUpload } = require(".");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("File upload", () => {
  it("should upload a file and get a new URL", async () => {
    const content = "This is a file uploaded with now-storage.";

    const { url } = await upload(
      process.env.NOW_TOKEN,
      {
        name: "my-file.txt",
        content
      },
      { deploymentName: "now-storage-test" }
    );

    const response = await fetch(`https://${url}`);
    const body = await response.text();

    expect(content).toBe(body);
  });

  it("should upload a single file and get a new URL", async () => {
    const content = "This is a file uploaded with now-storage.";

    const { url } = await multiUpload(
      process.env.NOW_TOKEN,
      [
        {
          name: "my-file.txt",
          content
        }
      ],
      { deploymentName: "now-storage-test" }
    );

    const response = await fetch(`https://${url}`);
    const body = await response.text();

    expect(content).toBe(body);
  });

  it("should upload a file to a team and get a new URL", async () => {
    const content = JSON.stringify({
      key: "value",
      key2: 123
    });

    const { url } = await upload(
      process.env.NOW_TOKEN,
      {
        name: "my-file.json",
        content
      },
      { deploymentName: "now-storage-test", teamId: process.env.NOW_TEAMID }
    );

    const response = await fetch(`https://${url}`);
    const body = await response.text();

    expect(content).toBe(body);
  });

  it("should upload multiple files and get a new URL", async () => {
    const content1 = "This is file 1 uploaded with now-storage.";
    const content2 = "This is file 2 uploaded with now-storage.";

    const { url } = await multiUpload(
      process.env.NOW_TOKEN,
      [
        {
          name: "my-file-1.txt",
          content: content1
        },
        {
          name: "my-file-2.txt",
          content: content2
        }
      ],
      { deploymentName: "now-storage-test" }
    );

    const response1 = await fetch(`https://${url}/my-file-1.txt`);
    const body1 = await response1.text();
    const response2 = await fetch(`https://${url}/my-file-2.txt`);
    const body2 = await response2.text();

    expect(body1).toBe(content1);
    expect(body2).toBe(content2);
  });
});
