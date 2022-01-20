const regularize = require("../utils/regularize");
/**
 * Resolves the argument array from the node process into a useful object.
 * @param {Process Array} node_process_argv
 * @returns Object of parameters for page creation.
 */
module.exports = resolveCreateArgs = (node_process_argv = []) => {
  return new Promise((resolve, reject) => {
    const error = false;
    let args = {};
    // All possible arguments.
    [
      "--no-default-html",
      "--no-css",
      "--no-javascript",
      "--bootstrap",
      "--jquery",
      "--vue",
      "--react",
      "--animations",
      "--animated",
      "--animation",
      "--angular",
      "--react-cli",
      "--react-router",
      "--vue-cli",
      "--vue-router",
      "--angular-cli",
      "--php",
      "--responsive",
      "--overwrite",
    ].forEach((argument) => {
      if (
        node_process_argv.find((inputArgs) => {
          return inputArgs === argument;
        }) === argument
      ) {
        args[regularize(argument).slice(2)] = true;
      }
    });
    if (
      node_process_argv.find((arg) => {
        return arg.slice(0, 5) === "--in:";
      }) !== undefined
    ) {
      args.diffDir = true;
      args.pageDestination = node_process_argv
        .filter((arg) => {
          return arg.slice(0, 5) === "--in:";
        })[0]
        .slice(5);
      if (args.pageDestination.slice(0, 2) === "./") {
        args.pageDestination = args.pageDestination.slice(2);
      }
      if (args.pageDestination.slice(0, 1) === "/") {
        args.pageDestination = args.pageDestination.slice(1);
      }
    }
    if (args.react_cli || args.vue_cli || args.angular_cli) {
      args.framework = true;
    }
    // Resolve react-router discrepancy
    if (args.react_router && !args.react_cli) {
      console.warn(
        " WARNING ".bgYellow.black +
          ": " +
          "Your page has conflicting or incomplete Arguments.".brightYellow
      );
      linespace();
      console.log("You cannot use the React router outside of a React app.");
      linespace();
      console.log(
        "To use the React router, delete the page, then recreate it while adding the --react-cli argument."
          .brightYellow
      );
      linespace();
      delete args.react_router;
    }
    // Resolve vue router discrepancy.
    if (args.vue_router && !args.vue_cli) {
      console.warn(
        " WARNING ".bgYellow.black +
          ": " +
          "Your page has conflicting or incomplete Arguments.".brightYellow
      );
      linespace();
      console.log("You cannot use the Vue router outside of a Vue CLI app.");
      linespace();
      console.log(
        "To use the Vue router, delete the page, then recreate it while adding the --vue-cli argument."
          .brightYellow
      );
      linespace();
      delete args.vue_router;
    }
    if (args.animation || args.animations || args.animated) {
      args.animations = true;
    }
    !error ? resolve(args) : reject();
    return args;
  });
};
