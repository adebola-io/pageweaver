module.exports = `\`/* This should be your go-to file for styling all elements in the \${mainParam} project.*/
body {
  margin: 0;
  font-family: "Segoe-UI", Calibri, Arial, sans-serif;
  box-sizing: border-box;
  background: \${args.react_cli ? "#141414" : "white"}
}
html, body {
  height: 100%;
}
.\${args.react_cli ? mainParam.toLowerCase() : "fill"} {
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
  color: \${args.react_cli ? "#50c3e0" : "#88ec59"};
  \${args.animations ? "animation: animation_1 500ms;" : ""}
}
\``;
