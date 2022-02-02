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
    rootHTML = `${appFolder}/public/index.html`,
    src = `${appFolder}/src`;
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
  }
  if (args.react_cli) {
    let reactIndexFile = `${appFolder}/src/index.js`,
      appMainJs = `${appFolder}/src/${capitalize(fileName)}.js`;
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
    // Generate router file if required.
    if (args.vue_router) {
      fs.appendFile(
        router,
        generateText("vue-router", fileName, args),
        handleError
      );
    }
  }
};
