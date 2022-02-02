const regularize = require("./regularize");
const versionableArguments = [
  "angular-cli",
  "next-js",
  "react-cli",
  "react-bootstrap",
  "react-cli",
  "react-redux",
  "react-router",
  "scss",
  "svelte-cli",
  "tailwind",
  "typescript",
  "vue-cli",
  "vue-x",
];
module.exports.isVersioned = (argument = "") => {
  let dissectedParam = argument.split("/");
  return (
    dissectedParam.length === 2 &&
    versionableArguments.find(
      (versionableArgument) =>
        versionableArgument === dissectedParam[0].slice(2)
    ) !== undefined
  );
};
module.exports.validVersionNumber = (argument = "") => {
  let x = argument
    .split("/")[1]
    .split(".")
    .map((p) => p - 0);
  for (let i = 0; i < x.length; i++) {
    if (!x[i] && x[i] !== 0) return false;
  }
  return true;
};
module.exports.dissect = function (argument = "") {
  return {
    argName: regularize(argument.split("/")[0]).slice(2),
    versionNumber: argument.split("/")[1],
  };
};
