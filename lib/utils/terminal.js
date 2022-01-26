const colors = require("colors");
const linespace = require("./linespace");

module.exports.error = function (
  head = "An error occured",
  reason = undefined,
  lowPriority = false
) {
  console.error(
    " ERROR "[lowPriority ? "bgWhite" : "bgRed"]["black"] +
      ": " +
      head[lowPriority ? "gray" : "brightRed"]
  );
  linespace();
  if (reason) {
    console.error(reason[lowPriority ? "gray" : "brightRed"]);
    linespace();
  }
};

module.exports.success = function (
  head = "Operation completed successfully.",
  reason = undefined
) {
  console.error(" SUCCESS ".bgGreen.black + ": " + head.brightGreen);
  linespace();
  if (reason) {
    console.error(reason.bgGreen);
    linespace();
  }
};

module.exports.warn = function (
  head = "This is a warning!",
  reason = undefined
) {
  console.error(" WARNING ".bgYellow.black + ": " + head.brightYellow);
  linespace();
  if (reason) {
    console.error(reason.brightYellow);
    linespace();
  }
};

module.exports.prompt = function (
  promptType,
  promptText,
  callback = function () {}
) {
  process.stdout.write(
    promptText[
      promptType === "warning"
        ? "yellow"
        : promptType === "continue"
        ? "brightBlue"
        : "white"
    ]
  );
  process.stdin.once("readable", () => {
    callback(process.stdin.read().toString().slice(0, -2));
    process.stdin.destroy();
  });
};
