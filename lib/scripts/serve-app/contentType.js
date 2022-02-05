/**
 * Gets the Content-Type for requested files.
 * @param {String | FileExt} requestURL The requested url.
 * @returns {String} The content-type.
 */
module.exports.contentType = function (requestURL) {
  let reqExt = requestURL.split(".")[requestURL.split(".").length - 1];
  switch (reqExt) {
    case "js":
      return "text/javascript";
    case "jpg":
    case "jpeg":
      return "image/jpg";
    default:
      return `text/${reqExt}`;
  }
};
