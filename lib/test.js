const fs = require("fs");
const { handleError } = require("./utils/handleError");
var ALL_PAGES = fs.existsSync("pages.config.json")
  ? eval(fs.readFileSync(`pages.config.json`).toString())
  : [];

fs.writeFile("pages.config.json", `["love":{}]`, handleError);
