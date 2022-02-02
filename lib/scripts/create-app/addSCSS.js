const fs = require("fs");
const { handleError } = require("../../utils/handleError");
const generateText = require("./generateText");

/**
 * Generate SCSS files, if required.
 */
module.exports = addSCSS = (fileName, stylesFolder, args) => {
  let scssFolder = `${stylesFolder}/scss`,
    baseSCSSSheet = `${scssFolder}/${fileName}.app.scss`;

  //   Create the SCSS folder.
  fs.mkdirSync(scssFolder);
  //   Create the base SCSS file.
  fs.appendFile(
    baseSCSSSheet,
    generateText("scss-base", fileName, args),
    handleError
  );
};
