const colors = require("colors");
const terminal = require("../utils/terminal");
const fs = require("fs");
const linespace = require("../utils/linespace");
const cloneDirectory = require("../utils/cloneDirectory");
const { handleError } = require("../utils/handleError");
const modulesConfig = require("../modules.config");

/**
 * Install page dependencies after creation, if required.
 * @param {FileName} pageName
 * @param {Object} args
 * @param {Path} destination
 */
module.exports = installDependencies = (pageName, args, destination) => {
  return new Promise((resolve, reject) => {
    const error = false;
    terminal.prompt(
      "continue",
      "This page cannot run without dependencies. Do you want to install them now (Y/N) ? ",
      (result) => {
        switch (result) {
          case "y":
          case "Y":
          case "Yes":
          case "YES":
          case "yes":
            linespace();
            console.log("Downloading modules...".brightMagenta);
            linespace();
            let moduleFolder = `${args.framework_type}_${
              modulesConfig[args.framework_type].currentVersion
            }_modules${args.include_router ? `_with_router` : ``}`;
            fs.appendFile(
              `.gitignore`,
              `${destination}/${pageName}.page/node_modules`,
              handleError
            );
            fs.copyFileSync(
              `${modulesConfig.src}/${moduleFolder}.zip`,
              `${destination}/${pageName}.page/node_modules.zip`
            );
            terminal.success("Modules downloaded successfully.");
            break;
          case "N":
          case "n":
          case "No":
          case "NO":
          case "no":
            linespace();
            console.log(
              "To install dependencies later, cd into the page directory and run npm install."
                .magenta
            );
            linespace();
            break;
          default:
            terminal.error("Unrecognized command. Process Aborted.");
            linespace();
        }
      }
    );
    !error ? resolve() : reject();
  });
};
