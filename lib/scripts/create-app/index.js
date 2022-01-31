var colors = require("colors");
var fs = require("fs");

const { handleError } = require("../../utils/handleError");
const { addPackageJSON } = require("./addPackageJSON");
const addSCSS = require("./addSCSS");
const generateText = require("./generateText");

var ALL_PAGES = fs.existsSync("pages.config.json")
  ? eval(fs.readFileSync(`pages.config.json`).toString())
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
    // Create destination folder if it doesn't exist.
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    // Handle situation where web app already exists.
    if (fs.existsSync(`${destination}/${fileName}.app`)) {
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
      fs.mkdirSync(`${destination}/${fileName}.app`);

      // Creates web app HTML or PHP file.
      // If page is part of a framework, e.g. React, Angular, Vue:
      if (args.react_cli || args.vue_cli) {
        fs.mkdirSync(`${destination}/${fileName}.app/public`);
        fs.createWriteStream(
          `${destination}/${fileName}.app/public/index.html`
        );
      } else {
        // If page is not part of a framework .i.e. Vanilla.
        fs.createWriteStream(
          `${destination}/${fileName}.app/index.${args.php ? "php" : "html"}`
        );
      }
      // Writes the default HTML template into the base document, if required.
      if (!args.no_default_html) {
        fs.appendFile(
          `${destination}/${fileName}.app/${
            args.react_cli || args.vue_cli
              ? `/public/index.html`
              : `index.${args.php ? "php" : "html"}`
          }`,
          generateText("default-html", fileName, args),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
      console.log(`Creating ${args.php ? "PHP" : "HTML"} document...`.blue);
      console.log("");

      // Creates CSS stylesheet, if required.
      if (!args.no_css && !args.scss) {
        // Create stylesheet for frameworks.
        // React & Vue
        if (args.react_cli || args.vue_cli) {
          let pathToPrimaryStylesheet = `${destination}/${fileName}.app/src/styles/--${fileName}.css`,
            pathToContentStylesheet = `${destination}/${fileName}.app/src/styles/${fileName}.content.css`;
          fs.mkdirSync(`${destination}/${fileName}.app/src`);
          fs.mkdirSync(`${destination}/${fileName}.app/src/styles`);
          // Create Primary Stylesheet.
          fs.appendFile(
            pathToPrimaryStylesheet,
            generateText("css-main-css", fileName, args),
            handleError
          );
          // Create main content CSS file
          fs.appendFile(
            pathToContentStylesheet,
            generateText("css-content", fileName, args),
            handleError
          );
          // Create animations.css file, if required.
          if (args.animations) {
            let pathtoAnimatedFile = `${destination}/${fileName}.app/src/styles/${fileName}.animations.css`;
            fs.appendFile(
              pathtoAnimatedFile,
              generateText(`css-animation`, fileName, args),
              handleError
            );
            fs.appendFile(
              pathToPrimaryStylesheet,
              generateText("css-animation-import", fileName, args),
              handleError
            );
          }
          // Creates responsive CSS files for framework, if required.
          if (args.responsive) {
            fs.mkdirSync(`${destination}/${fileName}.app/src/styles/res`);
            [320, 375, 425, 768, 1024, 1440, 2160].forEach((width) => {
              fs.appendFile(
                `${destination}/${fileName}.app/src/styles/res/${fileName}.res.${width.toString()}px.css`,
                generateText("css-res-media", width, args),
                (err) => {
                  if (err) console.log(err);
                }
              );
            });
            // Import all res files to the res.base.
            fs.appendFile(
              `${destination}/${fileName}.app/src/styles/res/-${fileName}.res.base.css`,
              generateText("css-res-base", fileName, args),
              handleError
            );
            // Import res.base into the global css page file.
            fs.appendFile(
              pathToPrimaryStylesheet,
              generateText("css-res-main", fileName, args),
              handleError
            );
          }
        } else {
          // Vanilla CSS
          let pathToPrimaryStylesheet = `${destination}/${fileName}.app/${fileName}.styles/--${fileName}.css`,
            pathToContentStylesheet = `${destination}/${fileName}.app/${fileName}.styles/${fileName}.content.css`;
          fs.mkdirSync(`${destination}/${fileName}.app/${fileName}.styles`);
          fs.appendFile(
            pathToPrimaryStylesheet,
            generateText("css-main-css", fileName, args),
            handleError
          );
          // Create main content CSS file
          fs.appendFile(
            pathToContentStylesheet,
            generateText("css-content", fileName, args),
            handleError
          );
          if (args.animations) {
            let pathtoAnimatedFile = `${destination}/${fileName}.app/${fileName}.styles/${fileName}.animations.css`;
            fs.appendFile(
              pathtoAnimatedFile,
              generateText(`css-animation`, fileName, args),
              handleError
            );
            fs.appendFile(
              pathToPrimaryStylesheet,
              generateText("css-animation-import", fileName, args),
              handleError
            );
          }
          // Responsive Vanilla CSS.
          if (args.responsive) {
            fs.mkdirSync(
              `${destination}/${fileName}.app/${fileName}.styles/${fileName}.res`
            );
            [320, 375, 425, 768, 1024, 1440, 2160].forEach((width) => {
              fs.appendFile(
                `${destination}/${fileName}.app/${fileName}.styles/${fileName}.res/${fileName}.res.${width.toString()}px.css`,
                generateText("css-res-media", width, args),
                (err) => {
                  if (err) console.log(err);
                }
              );
            });
            // Import all res files to the res.base.
            fs.appendFile(
              `${destination}/${fileName}.app/${fileName}.styles/${fileName}.res/-${fileName}.res.base.css`,
              generateText("css-res-base", fileName, args),
              handleError
            );
            // Import res.base into the global css page file.
            fs.appendFile(
              pathToPrimaryStylesheet,
              generateText("css-res-main", fileName, args),
              handleError
            );
          }
        }
        // Creates separate css files for screen responsiveness, if required.
        console.log(`CSS Stylesheet created succesfully.`.blue);
        console.log("");
      }

      if (args.scss) {
        addSCSS(fileName, args, destination);
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
