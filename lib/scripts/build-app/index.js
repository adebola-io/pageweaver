const { exec } = require("child_process");
const generatePageID = require("../create-app/generatePageID");
const terminal = require("../../utils/terminal");
const fs = require("fs");
const linespace = require("../../utils/linespace");
var ALL_PAGES = fs.existsSync("projects.config.json")
  ? eval(fs.readFileSync(`projects.config.json`).toString())
  : [];

/**
 * Base page builder for production.
 * @param {String} appName
 * @param {String} source
 * @param {Object} args
 */
module.exports = function buildPage(appName, source) {
  let args = {};
  // Consult projects.config.json for app arguments.
  if (fs.existsSync(`${source}/${appName}.app`)) {
    if (
      ALL_PAGES.filter((app) => app.id === generatePageID(appName, source))
        .length !== 0
    ) {
      // Get app arguments.
      args = ALL_PAGES.find(
        (app) => app.id === generatePageID(appName, source)
      ).appArguments;
      if (args && args.jsFramework) {
        terminal.load.start(`Building ${appName}`);
        exec(
          `cd ${source}/${appName}.app && npm run build`,
          (err, stdout, stderr) => {
            terminal.load.stop();
            if (err)
              terminal.error(
                "There was an error during production. Make sure all dependencies are installed and try again."
              );
          }
        );
      } else
        terminal.error(`Production is not supported for this kind of project.`);
    } else
      terminal.error(`There was a problem with your projects.config.json file`);
  } else
    terminal.error(
      `The app '${appName}' does not exist. Check the app name and try again.`
    );
};
