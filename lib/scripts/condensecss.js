const fs = require("fs");
const colors = require("colors");
var ALL_PAGES = fs.existsSync("pages.config.json")
  ? eval(fs.readFileSync(`pages.config.json`).toString())
  : [];
const recursivelyGetFiles = require("../utils/recursivelyGetFiles");
/**
 *
 * @param {String} pageName
 */
module.exports = function condenseCSS(pageName) {
  return new Promise((resolve, reject) => {
    const error = false;
    // Confirm that page exists with the given name before running.
    if (!fs.existsSync(`pages/${pageName}.page`)) {
      console.error(
        "Error: The given page does not exist. Please check the name and try again."
          .brightRed
      );
      console.log("");
    } else {
      let pageArguments = ALL_PAGES.filter((page) => {
        return page.pageName === pageName;
      })[0].pageArguments;
      // Confirm that the page exists in the pages.config.json file.
      if (pageArguments === undefined) {
        console.error(
          "ERROR: Something went wrong with your pages.config.json file."
            .brightRed
        );
        console.log("");
      } else {
        // FOR VANILLA PAGES
        if (pageArguments.framework !== true) {
          let pathToStyles = `pages/${pageName}.page/${pageName}.styles`;
          //   Confirm that the styles folder exists.
          if (
            !fs.existsSync(pathToStyles) ||
            (fs.existsSync(pathToStyles) &&
              !fs.lstatSync(pathToStyles).isDirectory())
          ) {
            console.error(
              "ERROR: Your page.styles folder could not be found. Confirm that it exists and try again."
                .brightRed
            );
          } else {
            let pathToCondensedFile = `${pathToStyles}/${pageName}.condensed.css`;
            //  Check if there is a page.res folder and condense all files in it.
            if (fs.existsSync(`${pathToStyles}/${pageName}.res`)) {
              console.log(`Condensing Resolution.css files...`.blue);
              console.log("");
              //   Get all specified screen widths.
              const allCSSWidths = recursivelyGetFiles(
                `${pathToStyles}/${pageName}.res`
              )
                .filter((resFileName) => {
                  // Exclude the res.base file.
                  return resFileName !== `-${pageName}.res.base.css`;
                })
                .map((resFileName) => {
                  // Get resolution from file name.
                  return resFileName.slice(pageName.length + 5, -6) - 0;
                })
                .sort((a, b) => {
                  // Sort resolutions from highest to lowest
                  return b - a;
                });
              let condensedResContent = "";
              allCSSWidths.forEach((width) => {
                /**
                 *  For all specified screen widths, read the file in which the styles are written, and then append all its data to the condensed CSS.res file.
                 */
                condensedResContent += fs
                  .readFileSync(
                    `${pathToStyles}/${pageName}.res/${pageName}.res.${width}px.css`
                  )
                  .toString();
              });
              fs.appendFile(pathToCondensedFile, condensedResContent, (err) =>
                err ? console.log(err) : () => {}
              );
              console.log("Resolution files condensed successfully.".green);
              console.log("");
            }
          }
        }
      }
    }
    !error ? resolve() : reject();
  });
};
