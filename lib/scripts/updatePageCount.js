const fs = require("fs");
var ALL_PAGES = fs.existsSync("pages.config.json")
  ? eval(fs.readFileSync(`pages.config.json`).toString())
  : [];
/**
 * Tracks the status of all generated pages in the project.
 * @param {String} selectedPageName The new page Name
 * @param {String} commandType append | remove
 * @param {Object} pageArguments Object of page arguments.
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
      count: ALL_PAGES.length + 1,
      pageName: selectedPageName,
      pageArguments,
    });
  } else if (commandType === "remove") {
    ALL_PAGES = ALL_PAGES.filter((page) => {
      return page.pageName !== selectedPageName;
    });
  }
  fs.writeFile(`pages.config.json`, `${JSON.stringify(ALL_PAGES)}`, (err) => {
    if (err) console.log(err);
  });
};
