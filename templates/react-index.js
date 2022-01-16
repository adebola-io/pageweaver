module.exports = `\`import React from "react";
import ReactDOM from "react-dom";
import \${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)} from "./\${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)}";
ReactDOM.render(<\${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)} />, document.getElementById("root"));
\``;
