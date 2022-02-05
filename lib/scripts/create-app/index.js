var colors = require("colors");
var fs = require("fs");

const { handleError } = require("../../utils/handleError");
const { addAnimationFile } = require("./addAnimationFile");
const { addPackageJSON } = require("./addPackageJSON");
const { addResponsiveStyles } = require("./addResponsiveStyles");
const addSCSS = require("./addSCSS");
const { createFrameworks } = require("./createFramework");
const generateText = require("./generateText");

var ALL_PAGES = fs.existsSync("projects.config.json")
  ? eval(fs.readFileSync(`projects.config.json`).toString())
  : [];
/**
 * Base function that creates a Web page.
 * @param {String} fileName The name of the web app file to be created.
 * @param {Object} args The web app creation arguments.
 * @param {Path} destination The destination folder.
 * @returns Promise
 */
module.exports = function createNewApp(fileName, args = {}, destination) {
  return new Promise((resolve, reject) => {
    const error = false;
    let stat = false;
    let appFolder = `${destination}/${fileName}.app`;
    // Create destination folder if it doesn't exist.
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    // Handle situation where web app already exists.
    if (fs.existsSync(appFolder)) {
      // Handle page overwriting.
      if (args.overwrite) {
        stat = "to-overwrite";
      } else stat = "already-exists";
    } else if (
      // Handle situation where web app name is undefined.
      fileName === undefined ||
      !fileName
    ) {
      stat = "undefined-name";
    } else {
      // Creates web app folder.
      fs.mkdirSync(appFolder);

      // Creates web app HTML or PHP file.
      if (!args.jsFramework) {
        let html = `${appFolder}/index.${args.php ? "php" : "html"}`;
        // Writes the default HTML template into the base document, if required.
        if (!args.no_default_html) {
          fs.appendFile(
            html,
            generateText("default-html", fileName, args),
            handleError
          );
          fs.writeFile(
            `${appFolder}/favicon.ico`,
            generateText("favicon", fileName, args),
            { encoding: "base64" },
            handleError
          );
        }
      }

      // Creates CSS/SCSS stylesheet, if required.
      if (!args.no_css) {
        let stylesFolder = `${appFolder}/${fileName}.styles`,
          mainSheet = `${stylesFolder}/--${fileName}.css`;
        contentSheet = `${stylesFolder}/${fileName}.content.css`;
        if (args.react_cli || args.vue_cli) {
          fs.mkdirSync(`${appFolder}/src`);
          stylesFolder = `${appFolder}/src/styles`;
          mainSheet = `${stylesFolder}/${
            args.jsFramework ? "" : "--"
          }${fileName}.css`;
          contentSheet = `${stylesFolder}/${fileName}.content.css`;
        }
        fs.mkdirSync(stylesFolder);
        // Add SCSS if required.
        if (args.scss) {
          mainSheet = `${stylesFolder}/${fileName}.css`;
          addSCSS(fileName, stylesFolder, args);
        } else {
          fs.appendFile(
            contentSheet,
            generateText("css-content", fileName, args),
            handleError
          );
        }
        fs.appendFile(
          mainSheet,
          generateText("style-root", fileName, args),
          handleError
        );
        if (args.animations) {
          addAnimationFile(
            fileName,
            args,
            stylesFolder,
            mainSheet,
            (options = { filetype: args.scss ? "scss" : "css" })
          );
        }
        if (args.responsive) {
          addResponsiveStyles(
            fileName,
            args,
            stylesFolder,
            mainSheet,
            (options = { filetype: args.scss ? "scss" : "css" })
          );
        }
      }
      // Creates Javascript files, if required.
      if (!args.no_javascript) {
        // If app requires a framework.
        if (args.jsFramework) {
          createFrameworks(appFolder, fileName, args);
        } else {
          let jsFolder = `${appFolder}/${fileName}.js`,
            mainJS = `${jsFolder}/${fileName}.main.js`;
          fs.mkdirSync(jsFolder);
          // Generate text for main.js file.
          fs.appendFile(
            mainJS,
            generateText("js-main", fileName, args),
            handleError
          );
          if (args.typescript) {
            let tsFolder = `${appFolder}/${fileName}.ts`,
              mainTS = `${tsFolder}/${fileName}.main.ts`,
              tsConfig = `${appFolder}/tsconfig.json`;
            // Generate typescript folder.
            fs.mkdirSync(tsFolder);
            // Generate main.ts file.
            fs.appendFile(
              mainTS,
              generateText("js-main", fileName, args),
              handleError
            );
            // Generate tsconfig file.
            fs.appendFile(
              tsConfig,
              generateText("tsconfig", fileName, args),
              handleError
            );
          }
        }
      }

      stat = "success";
      // Create Package.json file.
      if (args.includes_npm) {
        addPackageJSON(fileName, args, destination);
      }

      // Duplicate page names.
      if (
        ALL_PAGES.filter((page) => {
          return fileName === page.appName;
        }).length !== 0
      ) {
        stat = `duplicate`;
      }
    }
    error === false ? resolve(stat) : reject(stat);
  });
};
