const fs = require("fs");
/**
 *
 * @param {String: File location} path The location of the file to be parsed.
 * @param {String} mainParam The file name being passed as a parameter.
 * @param {Object} args The objects of values being passed as parameters.
 */
const stringifyFile = (path, mainParam, args) => {
  return eval(require(path));
};

/**
 * This function returns a generated String of boilerplate text using the template files.
 * @param {String} source The .template file to be used to be used in generation
 * @param {String} mainParam The main parameter
 * @param {Object} args The object of optional arguments
 * @returns generated Text.
 */
module.exports = function generateText(source, mainParam, args) {
  return stringifyFile(`../../templates/${source}.js`, mainParam, args);
};
