const fs = require("fs");
const generatePageID = require("./generatePageID");
var ALL_PAGES = fs.existsSync("pages.config.json")
  ? eval(fs.readFileSync(`pages.config.json`).toString())
  : [];

/**
 * Tracks the status of all generated pages in the project.
 * @param {String} selectedPageName The new page Name
 * @param {('append'| 'remove'| 'overwite')} commandType append | remove
 * @param {PageArgs} pageArguments Object of page arguments.
 */
module.exports.updatePageCount = (
  selectedPageName,
  commandType,
  pageArguments
) => {
  if (!fs.existsSync(`pages.config.json`)) {
    fs.createWriteStream(`pages.config.json`);
  }
  if (commandType === "append") {
    ALL_PAGES.push({
      id: generatePageID(
        selectedPageName,
        pageArguments.pageDestination
          ? pageArguments.pageDestination
          : "pageweaver.pages"
      ),
      pageName: selectedPageName,
      pageArguments,
    });
  } else if (commandType === "remove") {
    ALL_PAGES = ALL_PAGES.filter((page) => {
      return (
        page.id !== generatePageID(selectedPageName, pageArguments.sourceFolder)
      );
    });
  } else if (commandType === "overwite") {
    console.log("overwiting...");
  }
  fs.writeFile(`pages.config.json`, `${JSON.stringify(ALL_PAGES)}`, (err) => {
    if (err) console.log(err);
  });
};
