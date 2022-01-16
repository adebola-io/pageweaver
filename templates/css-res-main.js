module.exports = `\`/* 
  All files corresponding to the mobile/desktop responsiveness are in the \${mainParam}.res folder. 
  The \${mainParam}.res.base.css file is the compiled import of all responsive css files. 
*/
@import url(./\${
      args.react_cli || args.vue_cli ? "" : \`\${mainParam}.res/\${mainParam}.\`
    }res.base.css);
\``;
