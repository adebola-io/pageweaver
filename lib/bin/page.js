#!/usr/bin/env node
/*
 * This nodejs file handles web page functions.
 * DO NOT DELETE.
 * The script commands are:
 *  To create a new web page = 'npm run create-page 'page-name' [arguments]'
 *  To delete a web page = 'npm run delete-page [page-name]'
 */

const createWebPage = require("../scripts/createWebPage");
const { deleteWebPage } = require("../scripts/deleteWebPage");
const linespace = require("../utils/linespace");
const { deleteAllWebPages } = require("../scripts/nukeProject");
const regularize = require("../utils/regularize");
const { updatePageCount } = require("../scripts/updatePageCount");
const condenseCSS = require("../scripts/condensecss");

/**
 * Resolves the argument array from the node process into a useful object.
 * @param {Process Array} node_process_argv
 * @returns Object of parameters for page creation.
 */
const resolveCreateArgs = (node_process_argv = []) => {
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
      process.argv.find((arg) => {
        return arg.slice(0, 5) === "--in:";
      }) !== undefined
    ) {
      args.diffDir = true;
      args.pageDestination = process.argv
        .find((arg) => {
          return arg.slice(0, 5) === "--in:";
        })
        .slice(5);
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

/**
 * Error checks the page name.
 * @param {String} name
 * @returns
 */
const resolvePageName = (name) => {
  if (name === undefined || name === " " || name.slice(0, 2) === "--") {
    return undefined;
  } else return name;
};

/**
 * Resolves the process argument variables array into a useful object of arguments for page deletion.
 * @param {Process Array} node_process_argv
 * @returns Object of arguments for page deletion.
 */
const resolveDelArgs = (node_process_argv) => {
  return new Promise((resolve, reject) => {
    let args = {};
    const error = false;
    let source = process.argv.find((arg) => {
      return arg.slice(0, 7) === "--from:";
    });
    if (source !== undefined) {
      args.sourceFolder = source.slice(7);
    } else args.sourceFolder = "./pages";
    !error ? resolve(args) : reject();
  });
};

switch (process.argv[2]) {
  case "create-page":
    let pageName = resolvePageName(process.argv[3]);
    resolveCreateArgs(process.argv.slice(3)).then((args) => {
      createWebPage(
        pageName,
        args,
        `${args.diffDir ? args.pageDestination : "./pages"}`
      ).then((stat) => {
        switch (stat) {
          case "success":
            updatePageCount(process.argv[3], "append", args);
            console.log(`${pageName} was created succesfully.`.green);
            linespace();
            break;
          case "already-exists":
            console.log(
              "Error: Could not create page. A page folder with the same name already exists."
                .grey
            );
            linespace();
            break;
          case "undefined-name":
            console.error(
              ` ERROR `.bgRed.black +
                `: Undefined or Invalid Web page name.`.brightRed
            );
            linespace();
            console.error(
              `The command structure is pageweaver create-page [page-name] -- [--arg1] [--arg2].`
                .brightRed
            );
            linespace();
            break;
          case "duplicate":
            updatePageCount(process.argv[3], "append", args);
            console.log(
              " WARNING ".bgYellow.black +
                ": " +
                `There is also a web page with the name ${pageName} in another folder.`
                  .yellow
            );
            linespace();
            break;
        }
      });
    });
    break;
  case "delete-page":
    resolveDelArgs(process.argv[2]).then((args) => {
      deleteWebPage(process.argv[3], args.sourceFolder).then((stat) => {
        if ((stat = "success")) {
          updatePageCount(
            process.argv[3],
            "remove",
            resolveCreateArgs(process.argv.slice(3))
          );
        }
      });
    });
    break;
  case "nuke-project":
    deleteAllWebPages();
    break;
  case "condense-css":
    condenseCSS(process.argv[3]);
    break;
  case "test":
    require("../test.js");
}
