module.exports = `\`import React from "react";
\${args.react_router ? \`import {BrowserRouter as Router} from "react-router-dom";\`:\`\`}
import "./styles/--\${mainParam}.css";

const \${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)} = () => {
  return (\${args.react_router ? \`
    <Router>\`:\`\`}
    \${args.react_router ? \` \`:\`\`}<div className="\${mainParam.toLowerCase()}">
      \${args.react_router ? \` \`:\`\`}\${mainParam} page.
    \${args.react_router ? \` \`:\`\`}</div>\${args.react_router ? \`
    </Router>\`:\`\`}
    )
}
  
export default \${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)};\``;
