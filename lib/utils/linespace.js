/**
 * Logs an empty line on the console.
 * @param {number} count
 */
module.exports = function linespace(count) {
  if (count > 1) {
    for (let i = 0; i < count; i++) {
      console.log("");
    }
  } else console.log("");
};
