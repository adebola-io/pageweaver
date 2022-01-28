const AdmZip = require("adm-zip");
const path = require("path");
/**
 * Extract a zip archive.
 * @param {String} source
 */
module.exports = extractArchive = (
  source,
  destination = `${path.parse(source).name}_extracted`
) => {
  try {
    new AdmZip(source).extractAllTo(destination);
  } catch (e) {
    console.log(e);
  }
};
