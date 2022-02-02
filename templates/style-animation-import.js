module.exports = `\`/* All \${mainParam} Page Animations */
@\${args.scss ? "use" : "import"} '\${args.scss ? '_': ''}\${
  args.jsFramework ? \`\` : \`\${mainParam}.\`
}animations\${args.scss ? "" : ".css"}';

\``;
