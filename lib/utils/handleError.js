/**
 * Logs errors.
 * @param {Error} err
 */
module.exports.handleError = (err) => {
  if (err) console.log(err.red);
};
