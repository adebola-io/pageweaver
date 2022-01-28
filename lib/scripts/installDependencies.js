const colors = require("colors");
const terminal = require("../utils/terminal");
const fs = require("fs");
const linespace = require("../utils/linespace");
const modulesConfig = require("../modules.config");
const extractArchive = require("../utils/extractArchive");

/**
 * Install page dependencies after creation, if required.
 * @param {FileName | String} pageName
 * @param {Object} args
 * @param {Path | String} destination
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
            fs.copyFileSync(
              `${modulesConfig.src}/test.zip`,
              `${destination}/${pageName}.page/node_modules.zip`
            );
            linespace();
            console.log("Extracting modules package...".brightMagenta);
            linespace();
            extractArchive(
              `${destination}/${pageName}.page/node_modules.zip`,
              `${destination}/${pageName}.page/node_modules`
            );
            terminal.success("All required dependencies have been installed.");
            fs.unlinkSync(`${destination}/${pageName}.page/node_modules.zip`);
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
