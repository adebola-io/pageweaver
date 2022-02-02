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
body div {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
body div p {
  font-size: 16pt;
  color: #beb6c5;
}\`
    : \`\`
}\``;
