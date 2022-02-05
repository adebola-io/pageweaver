module.exports = `\`import React from "react";
import ReactDOM from "react-dom";
import \${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)} from "./\${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)}";
import reportWebVitals from "./reportWebVitals";
 
ReactDOM.render(\${
  args.typescript
    ? \`
  <React.StrictMode>
    \`
    : ""
}<\${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)} />\${
  args.typescript
    ? \`
  </React.StrictMode>\`
    : ""
}, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
\``;
