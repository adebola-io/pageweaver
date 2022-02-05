const fs = require("fs");
const { capitalize } = require("../../utils/capitalize");
const { handleError } = require("../../utils/handleError");
const generateText = require("./generateText");

/**
 * Generate framework structure for javascript.
 * @param {String} appFolder Main folder for app
 * @param {String} fileName App name
 * @param {Object} args Creation arguments
 */
module.exports.createFrameworks = (appFolder, fileName, args) => {
  let public = `${appFolder}/public`,
    rootHTML = `${public}/index.html`,
    favicon = `${public}/favicon.ico`,
    src = `${appFolder}/src`,
    assets = `${src}/assets`;
  let filetype = args.typescript ? "tsx" : "js";
  switch (args.jsFramework_type) {
    case "react":
    case "vue":
      // Make public folder.
      fs.mkdirSync(public);
      //   Make index.html file.
      fs.appendFile(
        rootHTML,
        generateText("default-html", fileName, args),
        handleError
      );
      if (!fs.existsSync(src)) fs.mkdirSync(src);
      fs.mkdirSync(`${src}/components`);
      fs.writeFile(
        favicon,
        generateText("favicon", fileName, args),
        { encoding: "base64" },
        () => {}
      );
      fs.mkdirSync(assets);
      fs.appendFile(
        `${assets}/logo.svg`,
        generateText("logo", fileName, args),
        handleError
      );
  }
  if (args.react_cli) {
    let reactIndexFile = `${src}/index.${filetype}`,
      appMainJs = `${src}/${capitalize(fileName)}.${filetype}`,
      setupTests = `${src}/setupTests.js`,
      robotsTxt = `${public}/robots.txt`,
      reportWebVitals = `${src}/reportWebVitals.js`;
    // Generate robots.txt file.
    fs.appendFile(
      robotsTxt,
      generateText("react-robots-txt", fileName, args),
      handleError
    );
    // Generate text for the index.js file.
    fs.appendFile(
      reactIndexFile,
      generateText("react-index", fileName, args),
      handleError
    );
    // Generate text for Filename.js component.
    fs.appendFile(
      appMainJs,
      generateText("react-arrow-component", fileName, args),
      handleError
    );
    // Generate setupTest.js
    fs.appendFile(
      setupTests,
      generateText("react-setup-tests", fileName, args),
      handleError
    );
    // Generate reportWebVitals.js
    fs.appendFile(
      reportWebVitals,
      generateText("react-web-vitals", fileName, args),
      handleError
    );
    // Generate react-app-env.d.ts file if required.
    if (args.typescript) {
      fs.appendFile(
        `${appFolder}/react-app-env.d.ts`,
        generateText("react-app-env.d", fileName, args),
        handleError
      );
    }
  }
  if (args.vue_cli) {
    let vueMainFile = `${appFolder}/src/main.js`,
      vueComponent = `${appFolder}/src/${capitalize(fileName)}.vue`,
      babelConfig = `${appFolder}/babel.config.js`;
    router = `${appFolder}/src/router.js`;

    // Generate text into main.js file.
    fs.appendFile(
      vueMainFile,
      generateText("vue-main", fileName, args),
      handleError
    );
    // Generate text into Filename.vue component.
    fs.appendFile(
      vueComponent,
      generateText("vue-component", fileName, args),
      handleError
    );
    // Generate babel.config.js file.
    fs.appendFile(
      babelConfig,
      generateText("vue-babel-config", fileName, args),
      handleError
    );
    // Generate vue.config.js file.
    fs.createWriteStream(`${appFolder}/vue.config.js`);
    // Generate router file if required.
    if (args.vue_router) {
      fs.appendFile(
        router,
        generateText("vue-router", fileName, args),
        handleError
      );
    }
  }
  // Generate tsconfig.json file if required.
  if (args.typescript) {
    let tsConfig = `${appFolder}/tsconfig.json`;
    fs.appendFile(
      tsConfig,
      generateText("tsconfig", fileName, args),
      handleError
    );
  }
};
