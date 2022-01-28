/**
 * Resolves the process argument variables array into a useful object of arguments for page deletion.
 * @param {Process Array} node_process_argv
 * @returns Object of arguments for page deletion.
 */
module.exports = resolveDelArgs = (node_process_argv) => {
  return new Promise((resolve, reject) => {
    let args = {};
    const error = false;
    let source = process.argv.find((arg) => {
      return arg.slice(0, 7) === "--from:";
    });
    if (source !== undefined) {
      args.sourceFolder = source.slice(7);
      if (
        args.sourceFolder.slice(0, 2) === "./" &&
        args.sourceFolder.length !== 2
      ) {
        args.sourceFolder = args.sourceFolder.slice(2);
      } else if (args.sourceFolder.slice(0, 1) === "/") {
        args.sourceFolder = args.sourceFolder.slice(1);
      }
    } else args.sourceFolder = "pageweaver.pages";
    !error ? resolve(args) : reject();
  });
};
