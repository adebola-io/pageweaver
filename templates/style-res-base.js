module.exports = `\`/* 
    This file is the base file for responsiveness of the \${mainParam} Page.
    NOTE: Responsive configuration files are \${
      args.scss ? "included" : "imported"
    } from LARGEST to SMALLEST screens, to prevent style overwriting. 
*/

/* Extra large screens, 4K Screens & TV */
\${args.scss ? "@use" : "@import"} '\${
  args.scss ? "_" : ""
}\${args.jsFramework ? \`\` : \`\${mainParam}\${args.scss ? '_': '.'}\`}res\${args.scss ? '_': '.'}2160px\${args.scss ? "" : ".css"}';

/* Laptop & iPad screens */
\${args.scss ? "@use" : "@import"} '\${
  args.scss ? "_" : ""
}\${args.jsFramework ? \`\` : \`\${mainParam}\${args.scss ? '_': '.'}\`}res\${args.scss ? '_': '.'}1440px\${args.scss ? "" : ".css"}';
\${args.scss ? "@use" : "@import"} '\${
  args.scss ? "_" : ""
}\${args.jsFramework ? \`\` : \`\${mainParam}\${args.scss ? '_': '.'}\`}res\${args.scss ? '_': '.'}1024px\${args.scss ? "" : ".css"}';

/* Tablet Screens */
\${args.scss ? "@use" : "@import"} '\${
  args.scss ? "_" : ""
}\${args.jsFramework ? \`\` : \`\${mainParam}\${args.scss ? '_': '.'}\`}res\${args.scss ? '_': '.'}768px\${args.scss ? "" : ".css"}';

/* Large Mobile devices */
\${args.scss ? "@use" : "@import"} '\${
  args.scss ? "_" : ""
}\${args.jsFramework ? \`\` : \`\${mainParam}\${args.scss ? '_': '.'}\`}res\${args.scss ? '_': '.'}425px\${args.scss ? "" : ".css"}';

/* Medium Mobile devices */
\${args.scss ? "@use" : "@import"} '\${
  args.scss ? "_" : ""
}\${args.jsFramework ? \`\` : \`\${mainParam}\${args.scss ? '_': '.'}\`}res\${args.scss ? '_': '.'}375px\${args.scss ? "" : ".css"}';

/* Small Mobile devices */
\${args.scss ? "@use" : "@import"} '\${
  args.scss ? "_" : ""
}\${args.jsFramework ? \`\` : \`\${mainParam}\${args.scss ? '_': '.'}\`}res\${args.scss ? '_': '.'}320px\${args.scss ? "" : ".css"}';\``;
