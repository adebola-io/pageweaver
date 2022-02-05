const fs = require("fs");
const generateText = require("./scripts/create-app/generateText");
fs.writeFile(
  "fsv.ico",
  generateText("favicon", undefined, { empty: true }),
  { encoding: "base64" },
  () => {}
);
