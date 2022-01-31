const fs = require("fs");
var ALL_PAGES = fs.existsSync("pages.config.json")
  ? eval(fs.readFileSync(`pages.config.json`).toString())
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
