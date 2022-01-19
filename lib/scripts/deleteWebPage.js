var colors = require("colors");
var fs = require("fs");
const { deleteDirectory } = require("../utils/deleteDirectory");

var ALL_PAGES = fs.existsSync("pages.config.json")
  ? eval(fs.readFileSync(`pages.config.json`).toString())
  : [];

/**
 * Base function that deletes a web page.
 * @param {String} fileName The name of the web page file to be deleted.
 * @param {Path} source Where the web page is located.
 */
module.exports.deleteWebPage = (fileName, source) => {
  return new Promise((resolve, reject) => {
    const error = false;
    let stat = false;
    if (fileName !== undefined) {
      if (fs.existsSync(`./${source}/${fileName}.page`)) {
        deleteDirectory(`./${source}/${fileName}.page`);
        stat = "success";
      } else {
        if (
          ALL_PAGES.filter((page) => {
            page.pageName !== fileName;
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
