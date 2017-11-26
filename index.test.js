const fetch = require('node-fetch');
const { upload } = require('.');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

describe('File upload', () => {
  it('should upload a file and get a new URL', async () => {
    const content = 'This is a file uploaded with now-storage.';

    const { url } = await upload(
      process.env.NOW_TOKEN,
      {
        name: 'my-file.txt',
        content
      },
      { deploymentName: 'now-storage-test' }
    );

    const response = await fetch(`https://${url}`);
    const body = await response.text();

    expect(content).toBe(body);
  });

  it('should upload a file to a team and get a new URL', async () => {
    const content = JSON.stringify({
      key: 'value',
      key2: 123
    });

    const { url } = await upload(
      process.env.NOW_TOKEN,
      {
        name: 'my-file.json',
        content
      },
      { deploymentName: 'now-storage-test', teamId: 'now-storage' }
    );

    const response = await fetch(`https://${url}`);
    const body = await response.text();

    expect(content).toBe(body);
  });
});
