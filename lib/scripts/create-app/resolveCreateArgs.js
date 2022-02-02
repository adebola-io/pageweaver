const regularize = require("../../utils/regularize");
const terminal = require("../../utils/terminal");
const linespace = require("../../utils/linespace");
const {
  isVersioned,
  validVersionNumber,
  dissect,
} = require("../../utils/versioning");
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
    let allArguments = [
      "--no-default-html",
      "--no-css",
      "--no-javascript",
      "--bootstrap",
      "--jquery",
      "--scss",
      "--typescript",
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
    ];

    // VERSIONING
    node_process_argv.forEach((inputArg) => {
      if (isVersioned(inputArg) && validVersionNumber(inputArg)) {
        args[dissect(inputArg).argName] = true;
        args[`${dissect(inputArg).argName}_version`] =
          dissect(inputArg).versionNumber;
      }
    });

    allArguments.forEach((argument) => {
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
      args.appDestination = node_process_argv
        .filter((arg) => {
          return arg.slice(0, 5) === "--in:";
        })[0]
        .slice(5);
      if (
        args.appDestination.slice(0, 2) === "./" &&
        args.appDestination.length !== 2
      ) {
        args.appDestination = args.appDestination.slice(2);
      } else if (args.appDestination.slice(0, 1) === "/") {
        args.appDestination = args.appDestination.slice(1);
      }
    }

    // NODE APPS.
    if (
      args.scss ||
      args.react_cli ||
      args.vue_cli ||
      args.angular_cli ||
      args.typescript
    ) {
      args.includes_npm = true;
    }
    if (args.react_cli || args.vue_cli || args.angular_cli) {
      args.jsFramework = true;

      // Resolve multiple framework discrepancy.
      if (
        (args.react_cli && args.vue_cli) ||
        (args.react_cli && args.angular_cli)
      ) {
        terminal.warn(
          "Conflicting or Incomplete Arguments",
          "You cannot use multiple frameworks in the same app. React has been chosen as the default framework."
        );
        delete args.vue_cli;
        delete args.vue_cli_version;
        delete args.angular_cli;
        delete args.angular_cli_version;
      } else if (args.vue_cli && args.angular_cli) {
        terminal.warn(
          "Conflicting or Incomplete Arguments",
          "You cannot use multiple frameworks in the same app. Vue has been chosen as the default framework."
        );
        delete args.angular_cli;
        delete args.angular_cli_version;
      }

      // Set Framework Type.
      if (args.react_cli) {
        args.jsFramework_type = "react";
      } else if (args.vue_cli) {
        args.jsFramework_type = "vue";
      } else if (args.angular_cli) {
        args.jsFramework_type = "angular";
      }
    }
    // Resolve react-router discrepancy
    if (args.react_router && !args.react_cli) {
      terminal.warn(
        "Conflicting or Incomplete Arguments.",
        "You cannot use the React router outside of a React CLI app."
      );
      console.log(
        "To use the React router, delete the page, then recreate it while adding the --react-cli argument."
          .brightYellow
      );
      linespace();
      delete args.react_router;
      delete args.react_router_version;
    }
    // Resolve vue router discrepancy.
    if (args.vue_router && !args.vue_cli) {
      terminal.warn(
        "Conflicting or Incomplete Arguments.",
        "You cannot use the Vue router outside of a Vue CLI app."
      );
      console.log(
        "To use the Vue router, delete the page, then recreate it while adding the --vue-cli argument."
          .brightYellow
      );
      linespace();
      delete args.vue_router;
      delete args.vue_router_version;
    }
    if (args.react_router || args.vue_router) {
      args.include_router = true;
    }
    if (args.animation || args.animations || args.animated) {
      args.animations = true;
    }
    !error ? resolve(args) : reject();
    return args;
  });
};
