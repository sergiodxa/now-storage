const fetch = require("node-fetch");
const Err = require("./error.js");

const getFileURL = require("./get-file-url.js");

function uploadFile(token, config, file) {
  const fileUrl = getFileURL(config);

  return async () => {
    const response = await fetch(fileUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/octet-stream",
        "Content-Length": file.content.length,
        "x-now-digest": file.sha,
        "x-now-size": file.content.length
      },
      body: file.content
    });

    if (!response.ok) {
      const body = await response.json();

      switch (body.error.code) {
        case "forbidden": {
          const error = new Err("Not authorized.", "not-authorized");
          error.code = body.error.code;
          throw error;
        }
        default: {
          const error = new Err(
            `File upload failed, code: ${body.error.code}.`,
            "file-upload-failed"
          );
          error.code = body.error.code;
          throw error;
        }
      }
    }
  };
}

module.exports = uploadFile;
