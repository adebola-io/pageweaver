var colors = require("colors");
var fs = require("fs");

const { handleError } = require("../../utils/handleError");
const { addAnimationFile } = require("./addAnimationFile");
const { addPackageJSON } = require("./addPackageJSON");
const { addResponsiveStyles } = require("./addResponsiveStyles");
const addSCSS = require("./addSCSS");
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
module.exports = function createNewApp(
  fileName,
  args = {
    /**
     * Prevents default HTML from being written into the new page.
     * If set to true, the web app is created as an empty file.
     */
    no_default_html: false,
    /**
     * Does not add CSS stylesheet to the page.
     */
    no_css: false,
    /**
     * Does not add javascript to the web app.
     * If set to true, the web app is created without a script tag or javascript file.
     */
    no_javascript: false,
    /**
     * Adds Bootstrap 4 to the web app.
     * If set to true, the web app is created with CSS and Javascript links to the Bootstrap files.
     */
    bootstrap: false,
    /**
     * Adds JQuery to the web app.
     * If set to true, the web app is created with a link to the jQuery Javascript file.
     */
    jquery: false,
    /**
     * Adds the Vue CDN script link to the web app.
     */
    vue: false,
    /**
     * Creates the boilerplate for a Vue app.
     */
    vue_cli: false,
    /**
     * Adds a router to the vue app.
     */
    vue_router: false,
    /**
     * Add the React CDN script link to the web app.
     */
    react: false,
    /**
     * Creates the full boilerplate for a React App.
     */
    react_cli: false,
    /**
     * Adds a router to the React app.
     */
    react_router: false,
    /**
     * Creates a php file, rather than HTML.
     */
    php: false,
    /**
     * Adds the animations.css to the styles.
     */
    animations: false,
    /**
     * Creates separate css files for different screen widths.
     */
    responsive: false,
  },
  destination
) {
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
      // If page is part of a framework, e.g. React, Angular, Vue:
      if (args.react_cli || args.vue_cli) {
        fs.mkdirSync(`${appFolder}/public`);
        fs.createWriteStream(`${appFolder}/public/index.html`);
      } else {
        // If page is not part of a framework .i.e. Vanilla.
        fs.createWriteStream(`${appFolder}/index.${args.php ? "php" : "html"}`);
      }
      // Writes the default HTML template into the base document, if required.
      if (!args.no_default_html) {
        fs.appendFile(
          `${appFolder}/${
            args.react_cli || args.vue_cli
              ? `/public/index.html`
              : `index.${args.php ? "php" : "html"}`
          }`,
          generateText("default-html", fileName, args),
          handleError
        );
      }
      console.log(`Creating ${args.php ? "PHP" : "HTML"} document...`.blue);
      console.log("");

      // Creates CSS/SCSS stylesheet, if required.
      if (!args.no_css) {
        let stylesFolder = `${appFolder}/${fileName}.styles`,
          mainSheet = `${stylesFolder}/--${fileName}.css`;
        contentSheet = `${stylesFolder}/${fileName}.content.css`;
        if (args.react_cli || args.vue_cli) {
          fs.mkdirSync(`${appFolder}/src`);
          stylesFolder = `${appFolder}/src/styles`;
          mainSheet = `${stylesFolder}/--${fileName}.css`;
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
        // Javascript Structure for Frameworks.
        // React & Vue
        if (args.react_cli || args.vue_cli) {
          // Create the babel.config.js file for vue apps.
          if (args.vue_cli) {
            fs.appendFile(
              `${destination}/${fileName}.app/babel.config.js`,
              generateText("babel-config", fileName, args),
              handleError
            );
          }
          // Create the src folder if it doesn't already exist.
          if (!fs.existsSync(`${destination}/${fileName}.app/src`))
            fs.mkdirSync(`${destination}/${fileName}.app/src`);
          // Popular primary JS file with boilerplate code.
          fs.appendFile(
            `${destination}/${fileName}.app/src/${
              args.react_cli ? "index.js" : args.vue_cli ? "main.js" : "unknown"
            }`,
            `${
              args.react_cli
                ? generateText("react-index", fileName, args)
                : args.vue_cli
                ? generateText("vue-main", fileName, args)
                : "unknown"
            }`,
            handleError
          );
          // Populate starting component with boilerplate code.
          fs.appendFile(
            `${destination}/${fileName}.app/src/${
              fileName.charAt(0).toUpperCase() + fileName.slice(1)
            }.${args.react_cli ? "js" : args.vue_cli ? "vue" : ""}`,
            `${
              args.react_cli
                ? generateText("react-arrow-component", fileName, args)
                : args.vue_cli
                ? generateText("vue-component", fileName, args)
                : "unknown"
            }`,
            handleError
          );
          if (args.vue_router) {
            fs.appendFile(
              `${destination}/${fileName}.app/src/router.js`,
              generateText("vue-router", fileName, args),
              handleError
            );
          }
        } else {
          // VANILLA HTML
          fs.mkdirSync(`${destination}/${fileName}.app/${fileName}.js`);
          fs.createWriteStream(
            `${destination}/${fileName}.app/${fileName}.js/${fileName}.main.js`
          );
        }
        console.log(`Javascript File created succesfully.`.blue);
        console.log("");
      }

      stat = "success";
      // Create Packgae.json file.
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
