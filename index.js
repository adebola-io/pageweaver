#!/usr/bin/env node
require("./lib/bin/page");

if (process.argv[2] === undefined)
  console.log(
    `
Welcome to Pageweaver.

Usage: pageweaver <command> [--arguments]

=== COMMANDS ===================

    <create-page>              Creates a new web page.
    ==arguments=====
    --responsive               Generates css files for different screen widths.             
    --no-default-html          Does not write into generated HTML document.
    --no-javascript            Does not generate javascript.
    --no-css                   Does not include CSS.
    --jquery                   Add Jquery CDN Link to website.
    --php                      Gnerates PHP file in place of HTML.
    --animation, --animated,   Generates animations.css file.
    --animations
    --vue                      Generates page with vue CDN link.
    --vue-cli                  Generates Vue CLI App.
    --vue-router               Adds router to Vue app.
    --react                    Generates page with React CDN link.
    --react-cli                Generates React CLI App.
    --redux                    Adds Redux to React App.
    --react_router             Add router to React App.
    --in:<PATH>                Path to where pages should be generated in. 
                               Defaults to the 'pages' folder.

    <delete-page>              Deletes existing web page.
    --from:<PATH>

    <nuke-project>             Deltes all web pages.
`.green
  );
