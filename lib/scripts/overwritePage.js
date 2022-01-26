const terminal = require("../utils/terminal");
const createWebPage = require("./createWebPage");
const { deleteWebPage } = require("./deleteWebPage");
const { updatePageCount } = require("./updatePageCount");
/**
 * Overwite Web Page.
 */
module.exports = overwriteWebPage = (fileName, destination, args) => {
  terminal.prompt(
    "warning",
    `You are about to overwrite the ${fileName} page folder. Are you sure (Y/N)? `,
    (answer) => {
      if (answer === "Y" || answer === "y") {
        deleteWebPage(fileName, destination).then((substat) => {
          updatePageCount(fileName, "remove", args);
          if (substat === "success") {
            createWebPage(fileName, args, destination).then((substat2) => {
              if (substat2 === "duplicate") {
                updatePageCount(fileName, "append", args);
                terminal.success("Page Overwritten.");
              }
            });
          }
        });
      }
    }
  );
};
