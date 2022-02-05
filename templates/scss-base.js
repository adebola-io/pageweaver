module.exports = `\`/*
* This is the base SCSS file for your app.
*/
\${
  args.vanilla
    ? \`body {
  margin: 0;
  font-family: "Segoe-UI", Calibri, Arial, sans-serif;
  box-sizing: border-box;
    .fill {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .center-text {
        font-weight: bold;
        font-size: 18pt;
        color: #88ec59;
        \${args.animations ? "animation: animation_1 500ms;" : ""}
    }
}
html, body {
  height: 100%;
}
\`
    : ""
    }
\``;
