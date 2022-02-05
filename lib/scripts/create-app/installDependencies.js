const colors = require("colors");
const terminal = require("../../utils/terminal");
const linespace = require("../../utils/linespace");
const { exec } = require("child_process");
const { setUpDevServer } = require("../serve-app/setUpDevServer");

/**
 * Install page dependencies after creation, if required.
 * @param {FileName | String} appName
 * @param {Object} args
 * @param {Path | String} destination
 */
module.exports = installDependencies = (appName, args, destination) => {
  terminal.continousPrompt(
    "continue",
    "This project cannot run without dependencies. Do you want to install them now (Y/N) ? ",
    (result) => {
      switch (result) {
        case "y":
        case "Y":
        case "Yes":
        case "YES":
        case "yes":
          let appFolder = `${destination}/${appName}.app`;
          linespace();
          terminal.load.start("Installing modules (This might take a while)");
          try {
            exec(`cd ${appFolder} && npm install`, (err, stdout) => {
              if (err) throw err;
              terminal.load.stop();
              terminal.success(
                "All required dependencies have been installed."
              );
              if (args.vanilla) {
                if (args.scss) {
                  exec(
                    `sass ${appFolder}/${appName}.styles/scss/${appName}.app.scss:${appFolder}/${appName}.styles/${appName}.css`,
                    (err, stdout, stderr) => {
                      if (err || stderr) terminal.error(err | stderr);
                    }
                  );
                }
                setUpDevServer(appName, args, destination);
              }
            });
          } catch (e) {
            terminal.error(
              `Something went wrong when installing your dependencies.`
            );
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
