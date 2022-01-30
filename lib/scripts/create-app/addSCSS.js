const fs = require("fs");
const { handleError } = require("../../utils/handleError");
const generateText = require("../generateText");

/**
 * Generate SCSS files, if required.
 */
module.exports = addSCSS = (fileName, args, destination) => {
  let stylesFolder = `${destination}/${fileName}.app/${fileName}.styles`,
    scssFolder = `${destination}/${fileName}.app/${fileName}.styles/scss`,
    baseSCSSSheet = `${destination}/${fileName}.app/${fileName}.styles/scss/${fileName}.app.scss`,
    resultSheet = `${destination}/${fileName}.app/${fileName}.styles/${fileName}.css`;
  if (args.react_cli || args.vue_cli) {
    fs.mkdirSync(`${destination}/${fileName}.app/src`);
    stylesFolder = `${destination}/${fileName}.app/src/styles`;
    scssFolder = `${destination}/${fileName}.app/src/styles/scss`;
    baseSCSSSheet = `${destination}/${fileName}.app/src/styles/scss/${fileName}.app.scss`;
    resultSheet = `${destination}/${fileName}.app/src/styles/${fileName}.css`;
  }
  //   Create the styles folder.
  fs.mkdirSync(stylesFolder);
  //   Create the SCSS folder.
  fs.mkdirSync(scssFolder);
  //   Create the base SCSS file.
  fs.appendFile(
    baseSCSSSheet,
    generateText("scss-base", fileName, args),
    handleError
  );
  //   Create the result sheet.
  fs.createWriteStream(resultSheet);
};
