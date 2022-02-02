module.exports = `\`import React from "react";
import ReactDOM from "react-dom";
import \${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)} from "./\${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)}";
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
\``;
