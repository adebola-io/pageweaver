const fs = require("fs");
const { handleError } = require("../../utils/handleError");
const generateText = require("./generateText");
/**
 * Add an animation file to a new app project.
 * @param {String} fileName Name of app
 * @param {String} args App creation arguments
 * @param {String} stylesFolder Style folder
 * @param {String} mainSheet Main style sheet
 * @param {Object} options Animation creation options.
 */
module.exports.addAnimationFile = (
  fileName,
  args,
  stylesFolder,
  mainSheet,
  options = {}
) => {
  let animationFile = `${stylesFolder}/${args.scss ? "scss/_" : ""}${
    args.framework ? "" : `${fileName}.`
  }animations.${options.filetype}`;
  fs.createWriteStream(animationFile);
  //   Generate text for animation file.
  fs.appendFile(
    animationFile,
    generateText("style-animations", fileName, args),
    handleError
  );
  // Append animation file to main SCSS or CSS sheet.
  fs.appendFile(
    args.scss ? `${stylesFolder}/scss/${fileName}.app.scss` : mainSheet,
    generateText("style-animation-import", fileName, args),
    handleError
  );
};
