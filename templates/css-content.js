module.exports = `\`/* This should be your go-to file for styling all elements on the \${mainParam} page.*/
\${
  !args.jsFramework
    ? \`body {
  margin: 0;
  font-family: "Segoe-UI", Calibri, Arial, sans-serif;
  box-sizing: border-box;
}
html, body {
  height: 100%;
}
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
}\`
    : \`\`
}\``;
