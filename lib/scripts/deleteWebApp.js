var colors = require("colors");
var fs = require("fs");
const { deleteDirectory } = require("../utils/deleteDirectory");

var ALL_PAGES = fs.existsSync("pages.config.json")
  ? eval(fs.readFileSync(`pages.config.json`).toString())
  : [];

/**
 * Base function that deletes a web app.
 * @param {String} fileName The name of the web app file to be deleted.
 * @param {Path} source Where the web app is located.
 */
module.exports.deleteWebApp = (fileName, source) => {
  return new Promise((resolve, reject) => {
    const error = false;
    let stat = false;
    if (fileName !== undefined) {
      if (fs.existsSync(`./${source}/${fileName}.app`)) {
        deleteDirectory(`./${source}/${fileName}.app`);
        stat = "success";
      } else {
        if (
          ALL_PAGES.filter((page) => {
            page.appName !== fileName;
          }).length !== 0
        ) {
          console.log(9);
          stat = "exists-somewhere-else";
        } else stat = "non-existent";
      }
    } else {
      stat = "undefined-filename";
    }
    error === false ? resolve(stat) : reject();
  });
};
