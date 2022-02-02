const { handleError } = require("../../utils/handleError");
const fs = require("fs");
const generateText = require("./generateText");
/**
 *
 * @param {String} fileName name of app
 * @param {Object} args Creation arguments
 * @param {String} stylesFolder
 * @param {Object} options
 */
module.exports.addResponsiveStyles = (
  fileName,
  args,
  stylesFolder,
  mainSheet,
  options = { filetype: "css" }
) => {
  let resFolder = `${stylesFolder}/${args.scss ? "scss/" : ""}${
      args.react_cli || args.vue_cli ? "" : `${fileName}.`
    }res`,
    // Base SCSS or CSS file for responsiveness.
    resBase = `${resFolder}/${options.filetype === "scss" ? "_" : "-"}${
      args.react_cli || args.vue_cli ? "" : `${fileName}.`
    }res.base.${options.filetype}`;
  // Make folder for responsiveness.
  fs.mkdirSync(resFolder);
  let widths = [320, 375, 425, 768, 1024, 1440, 2160];
  widths.forEach((width) => {
    fs.appendFile(
      `${resFolder}/${options.filetype === "scss" ? "_" : ""}${
        args.framework ? "" : `${fileName}.`
      }res.${width.toString()}px.${options.filetype}`,
      generateText("style-res-media", width, args),
      handleError
    );
  });
  // Append import/use content to res base file.
  fs.appendFile(
    resBase,
    generateText("style-res-base", fileName, args),
    handleError
  );
  // Append res base file to main SCSS or CSS sheet.
  fs.appendFile(
    args.scss ? `${stylesFolder}/scss/${fileName}.app.scss` : mainSheet,
    generateText("style-res-main", fileName, args),
    handleError
  );
};
