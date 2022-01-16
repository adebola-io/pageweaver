var fs = require("fs");
/**
 * This function recursively deletes an entire directory.
 * @param {String} path Path to Directory.
 * @param {Function} callback Callback Function.
 */
module.exports.deleteDirectory = function deleteDirectory(
  path,
  callback = () => {}
) {
  if (fs.existsSync(path)) {
    if (fs.lstatSync(`${path}`).isDirectory()) {
      fs.readdirSync(path).forEach((subpath) => {
        if (fs.lstatSync(`${path}/${subpath}`).isDirectory()) {
          deleteDirectory(`${path}/${subpath}`);
        } else fs.unlinkSync(`${path}/${subpath}`);
      });
      fs.rmdirSync(path);
    } else fs.unlinkSync(`${path}`);
  }
  callback();
};
