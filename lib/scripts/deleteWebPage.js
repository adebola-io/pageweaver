var colors = require("colors");
var fs = require("fs");
const { deleteDirectory } = require("../utils/deleteDirectory");

/**
 * Base function that deletes a web page.
 * @param {String} fileName The name of the web page file to be deleted.
 * @param {Path} source Where the web page is located.
 */
module.exports.deleteWebPage = (fileName, source) => {
  return new Promise((resolve, reject) => {
    const error = false;
    let stat = false;
    if (fs.existsSync(`./${source}/${fileName}.page`)) {
      deleteDirectory(`./${source}/${fileName}.page`);
      console.log(`${fileName} Page deleted succesfully.`.green);
      stat = "success";
    } else {
      console.log(
        `Could not delete page. ${fileName} page does not exist.`.grey
      );
      stat = "failed";
    }
    error === false ? resolve(stat) : reject();
  });
};
