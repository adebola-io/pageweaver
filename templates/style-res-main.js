module.exports = `\`/* 
  All files corresponding to the mobile/desktop responsiveness are in the \${mainParam}.res folder. 
  The \${
    args.scss ? "_" : "-"
  }\${mainParam}.res.base.css file is the compiled import of all responsive css files. 
*/
\${args.scss ? "@use" : "@import"} '\${
      args.framework ? \`res/\${args.scss ? "_" : ""}\` : \`\${mainParam}.res/\${args.scss ? "_" : "-"}\${mainParam}.\`
    }res.base\${args.scss ? "" : ".css"}';
\``;
