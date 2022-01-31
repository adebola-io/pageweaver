const fs = require("fs");
var ALL_PAGES = fs.existsSync("projects.config.json")
  ? eval(fs.readFileSync(`projects.config.json`).toString())
  : [];

/**
 * Base page builder for production
 * @param {Filename} appName
 * @param {Path} source
 */
module.exports = function buildPage(appName, source) {
  return new Promise((resolve, reject) => {
    const error = false;

    !error ? resolve() : reject();
  });
};
