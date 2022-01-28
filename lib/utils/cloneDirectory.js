const fs = require("fs");
/**
 * Clone a directory
 * @param {Path} source Directory to clone
 * @param {Path} destination Directory to clone into.
 */
module.exports = cloneDirectory = (source, destination) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }
  fs.readdirSync(source).forEach((subDir) => {
    if (fs.lstatSync(`${source}/${subDir}`).isDirectory()) {
      cloneDirectory(`${source}/${subDir}`, `${destination}/${subDir}`);
    } else fs.copyFileSync(`${source}/${subDir}`, `${destination}/${subDir}`);
  });
};
