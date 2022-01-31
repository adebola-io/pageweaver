var colors = require("colors");
var fs = require("fs");
const terminal = require("../../utils/terminal");
const { deleteDirectory } = require("../../utils/deleteDirectory");
const linespace = require("../../utils/linespace");
var ALL_PAGES = fs.existsSync("pages.config.json")
  ? eval(fs.readFileSync(`pages.config.json`).toString())
  : [];
/**
 * This function deletes ALL current web apps in a project.
 * The corresponding command is "npm run nuke-folder".
 */
module.exports.deleteAllWebPages = function () {
  return new Promise((resolve, reject) => {
    const error = false;
    let stat = false;
    // Prompt user to prevent accidental deletion.
    terminal.warn(
      "You are about to delete ALL web apps in this project. THIS PROCESS CANNOT BE UNDONE."
    );
    process.stdout.write("Are you sure you want to continue (Y/N)? ".yellow);
    process.stdin.once("readable", () => {
      switch (process.stdin.read().toString().slice(0, -2)) {
        case "Y":
        case "y":
          let source = "";
          console.log("Wiping your directories clean...".underline);
          ALL_PAGES.forEach((page) => {
            if (page.appArguments.diffDir) {
              source = page.appArguments.appDestination;
            } else source = ".";
            if (fs.existsSync(source)) {
              deleteDirectory(`${source}/${page.appName}.app`, () => {
                if (fs.readdirSync(source).length == 0) deleteDirectory(source);
              });
            }
          });
          setTimeout(() => {
            console.clear();
            console.log(
              `All your web app files have been deleted.`.brightGreen
            );
            linespace();
            console.log("Here's to another fresh start! :)".brightBlue);
            linespace();
          }, 1000);
          stat = "success";
          if (fs.existsSync("pages.config.json")) {
            fs.unlinkSync("pages.config.json");
          }
          if (fs.existsSync(".") && fs.readdirSync(".") === []) {
            deleteDirectory(".");
          }
          break;
        case "N":
        case "n":
          console.log(`Mission Aborted.`.green);
          stat = "aborted";
          break;
        default:
          console.error("Unrecognized Input. Process Aborted.".red);
          stat = "failed";
      }
      process.stdin.destroy();
    });
    !error ? resolve(stat) : reject();
  });
};
