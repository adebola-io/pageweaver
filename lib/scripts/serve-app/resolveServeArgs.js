module.exports.resolveServeArgs = () => {
  return new Promise((resolve, reject) => {
    const error = false;
    let args = {};
    args.sourceFolder = ".";
    !error ? resolve(args) : reject();
  });
};
