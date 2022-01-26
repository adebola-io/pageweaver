const terminal = require("../utils/terminal");
const fs = require("fs");
const linespace = require("../utils/linespace");

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
      "This page has dependencies. Do you want to install them now? ",
      (result) => {
        switch (result) {
          case "y":
          case "Y":
          case "Yes":
          case "YES":
          case "yes":
            let moduleBundle = "";
            switch (args.framework_type) {
              case "react":
                moduleBundle = "react-modules.rar";
                break;
              case "vue":
                moduleBundle = "vue-modules.rar";
                break;
            }
            fs.copyFileSync(
              `${require("../modules.link")}/${moduleBundle}`,
              `${destination}/${pageName}.page/${pageName}-node-modules.rar`
            );
            terminal.success("Dependencies installed successfully.");
            break;
          case "N":
          case "n":
          case "No":
          case "NO":
          case "no":
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
