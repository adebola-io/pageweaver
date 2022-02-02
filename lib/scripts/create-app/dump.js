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
}
// Creates separate css files for screen responsiveness, if required.
console.log(`CSS Stylesheet created succesfully.`.blue);
console.log("");
