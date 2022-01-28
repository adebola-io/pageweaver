var colors = require("colors");
var fs = require("fs");
const terminal = require("../utils/terminal");
const { deleteDirectory } = require("../utils/deleteDirectory");
const linespace = require("../utils/linespace");
var ALL_PAGES = fs.existsSync("pages.config.json")
  ? eval(fs.readFileSync(`pages.config.json`).toString())
  : [];
/**
 * This function deletes ALL current web pages in a project.
 * The corresponding command is "npm run nuke-project".
 */
module.exports.deleteAllWebPages = function () {
  return new Promise((resolve, reject) => {
    const error = false;
    let stat = false;
    // Prompt user to prevent accidental deletion.
    terminal.warn(
      "You are about to delete ALL web pages in this project. THIS PROCESS CANNOT BE UNDONE."
    );
    process.stdout.write("Are you sure you want to continue (Y/N)? ".yellow);
    process.stdin.once("readable", () => {
      switch (process.stdin.read().toString().slice(0, -2)) {
        case "Y":
        case "y":
          let source = "";
          console.log("Wiping your directories clean...".underline);
          ALL_PAGES.forEach((page) => {
            if (page.pageArguments.diffDir) {
              source = page.pageArguments.pageDestination;
            } else source = "pageweaver.pages";
            if (fs.existsSync(source)) {
              deleteDirectory(`${source}/${page.pageName}.page`, () => {
                if (fs.readdirSync(source).length == 0) deleteDirectory(source);
              });
            }
          });
          setTimeout(() => {
            console.clear();
            console.log(
              `All your web page files have been deleted.`.brightGreen
            );
            linespace();
            console.log("Here's to another fresh start! :)".brightBlue);
            linespace();
          }, 1000);
          stat = "success";
          if (fs.existsSync("pages.config.json")) {
            fs.unlinkSync("pages.config.json");
          }
          if (
            fs.existsSync("pageweaver.pages") &&
            fs.readdirSync("pageweaver.pages") === []
          ) {
            deleteDirectory("pageweaver.pages");
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
