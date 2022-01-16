const fs = require("fs");
const colors = require("colors");

/**
 * Returns a list of all the files in all the subdirectories in a given directory.
 * @param {String} path Path to the folder to get files from.
 * @param {Object} options Optional arguments, such as file extensions to get exclusively.
 */
module.exports = function recursivelyGetFiles(
  path,
  options = { ext: undefined }
) {
  let fileList = [];
  if (fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach((pathChild) => {
      if (fs.lstatSync(`${path}/${pathChild}`).isDirectory()) {
        fileList.push(recursivelyGetFiles(`${path}/${pathChild}/`));
      } else {
        fileList.push(pathChild);
      }
    });
  } else {
    throw new Error("Given path name does not lead to a directory.".brightRed);
  }
  return fileList.flat(1);
};
