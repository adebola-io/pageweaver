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

let loading = true;
module.exports.load = {
  /**
   *
   * @param {String} head Text to display while loading.
   * @param {Boolean} stopper Condition to check to stop the loader.
   * @param {Number} type Type of terminal loader.
   */
  start: function (head = "Loading", type = 1) {
    process.stdout.write(head.brightMagenta);
    this.continue(head, type);
  },
  continue: function (head, type) {
    if (loading) {
      if (type === 1) {
        process.stdout.clearLine(head.length);
        process.stdout.cursorTo(head.length);
        if (loading) process.stdout.write(".".brightMagenta);
        if (loading)
          setTimeout(() => {
            if (loading) process.stdout.write(".".brightMagenta);
          }, 500);
        if (loading)
          setTimeout(() => {
            if (loading) process.stdout.write(".".brightMagenta);
          }, 1000);
        if (loading)
          setTimeout(() => {
            if (loading) process.stdout.write(".".brightMagenta);
          }, 1500);
        if (loading)
          setTimeout(() => {
            if (loading) this.semaphore(head);
          }, 2000);
      }
      if (type === 2) {
        process.stdout.clearLine(head.length);
        process.stdout.cursorTo(head.length);
        if (loading) {
          process.stdout.write("|".brightMagenta);
          process.stdout.clearLine(head.length);
          process.stdout.cursorTo(head.length);
        }
        if (loading)
          setTimeout(() => {
            if (loading) {
              process.stdout.write("/".brightMagenta);
              process.stdout.clearLine(head.length);
              process.stdout.cursorTo(head.length);
            }
          }, 300);
        if (loading)
          setTimeout(() => {
            if (loading) {
              process.stdout.write("-".brightMagenta);
              process.stdout.clearLine(head.length);
              process.stdout.cursorTo(head.length);
            }
          }, 600);
        if (loading)
          setTimeout(() => {
            if (loading) {
              process.stdout.write("|".brightMagenta);
              process.stdout.clearLine(head.length);
              process.stdout.cursorTo(head.length);
            }
          }, 900);
        if (loading)
          setTimeout(() => {
            if (loading) {
              process.stdout.write("-".brightMagenta);
              process.stdout.clearLine(head.length);
              process.stdout.cursorTo(head.length);
            }
          }, 1200);
        if (loading)
          setTimeout(() => {
            if (loading) {
              process.stdout.write("\\".brightMagenta);
              process.stdout.clearLine(head.length);
              process.stdout.cursorTo(head.length);
            }
          }, 1500);
        if (loading)
          setTimeout(() => {
            if (loading) this.semaphore(head, type);
          }, 1800);
      }
    }
  },
  semaphore: function (head, type) {
    if (loading) {
      process.stdout.clearLine(head.length);
      process.stdout.cursorTo(head.length);
      this.continue(head, type);
    }
  },
  stop: function () {
    loading = false;
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  },
};
