const fs = require("fs");
const { startLiveServer } = require("./startLiveServer");
/**
 * Starts a development server for a project.
 * @param {String} appName Name of project to serve.
 * @param {String} destination Project location.
 * @returns Promise
 */
module.exports.serveApp = (appName, destination) => {
  return new Promise((resolve, reject) => {
    const error = false;
    let stat = false;
    let appFolder = `${destination}/${appName}.app`;
    // Handle situation where project does not exist.
    if (!fs.existsSync(appFolder)) stat = "non-existent";
    else {
      if (!fs.existsSync(`${appFolder}/index.html`)) {
        stat = "non-existent";
      } else {
        startLiveServer(appFolder);
        stat = "success";
      }
    }
    !error ? resolve({ stat, port: 8080 }) : reject();
  });
  //   console.log(readFileSync(`${appName}.app`));
  //
};
