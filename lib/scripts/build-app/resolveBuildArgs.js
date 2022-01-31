/**
 * Resolves the argument array from the node build app process into a useful object.
 * @returns {Object} Object of parameters for page production.
 */
module.exports.resolveBuildArgs = () => {
  return new Promise((resolve, reject) => {
    let args = {};
    const error = false;
    let source = process.argv.find((arg) => {
      return arg.slice(0, 5) === "--in:";
    });
    if (source !== undefined) {
      args.sourceFolder = source.slice(5);
      if (
        args.sourceFolder.slice(0, 2) === "./" &&
        args.sourceFolder.length !== 2
      ) {
        args.sourceFolder = args.sourceFolder.slice(2);
      } else if (args.sourceFolder.slice(0, 1) === "/") {
        args.sourceFolder = args.sourceFolder.slice(1);
      }
    } else args.sourceFolder = ".";

    !error ? resolve(args) : reject();
  });
};
