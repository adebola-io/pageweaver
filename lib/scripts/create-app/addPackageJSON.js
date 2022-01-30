const fs = require("fs");
const { handleError } = require("../../utils/handleError");
const generateText = require("../generateText");
/**
 * Generate package.json file if required.
 */
module.exports.addPackageJSON = (fileName, args, destination) => {
  let toGenerate = "package-json";
  if (args.react_cli) {
    toGenerate = "react-package";
  } else if (args.vue_cli) {
    toGenerate = "vue-package";
  }
  fs.appendFile(
    `${destination}/${fileName}.app/package.json`,
    generateText(toGenerate, fileName, args),
    handleError
  );
};
