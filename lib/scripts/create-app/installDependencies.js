const colors = require("colors");
const terminal = require("../../utils/terminal");
const linespace = require("../../utils/linespace");
const { exec } = require("child_process");

/**
 * Install page dependencies after creation, if required.
 * @param {FileName | String} appName
 * @param {Object} args
 * @param {Path | String} destination
 */
module.exports = installDependencies = (appName, args, destination) => {
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
          terminal.load.start("Installing modules");
          try {
            exec(
              `cd ${destination}/${appName}.app && npm install`,
              (err, stdout) => {
                if (err) throw err;
                terminal.load.stop();
                terminal.success(
                  "All required dependencies have been installed."
                );
              }
            );
          } catch (e) {
            terminal.error(e);
            terminal.load.stop();
          }
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
};
