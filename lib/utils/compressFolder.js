const AdmZip = require("adm-zip");
/**
 * @param {Path} source
 * @param {Path} destination
 */
module.exports = compressFolder = (source, destination) => {
  try {
    const zip = new AdmZip();
    zip.addLocalFolder(source);
    zip.writeZip(destination);
  } catch (e) {
    console.log(e);
  }
};
