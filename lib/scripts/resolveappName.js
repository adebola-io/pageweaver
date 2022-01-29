/**
 * Error checks the page name.
 * @param {String} name
 * @returns
 */
module.exports = resolveappName = (name) => {
  if (name === undefined || name === " " || name.slice(0, 2) === "--") {
    return undefined;
  } else return name;
};
