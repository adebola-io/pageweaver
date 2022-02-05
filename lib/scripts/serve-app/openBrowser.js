const { exec } = require("child_process");
/**
 * Open link in browser.
 * @param {String} address
 */
module.exports.openBrowser = function (address) {
  exec(`start ${address}`, (err, stdout, stderr) => {
    if (err || stderr) console.log(err | stderr);
  });
};
