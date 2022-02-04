const fs = require("fs");
const terminal = require("./utils/terminal");

fs.watchFile(
  `serve-test.app/serve-test.styles/--serve-test.css`,
  { interval: 500 },
  (curr, prev) => {
    terminal.warn("Change");
  }
);
fs.watchFile(`serve-test.app/index.html`, { interval: 500 }, (curr, prev) => {
  terminal.warn("Change");
});
