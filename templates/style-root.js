module.exports = `\`\${
  args.scss
    ? \`\`
    : \`/*
  This is the base CSS file for your \${mainParam} page. 
  All other relevant CSS files are imported in here one way or another, and this file is imported directly into the document.
* The imports into this file have been arranged in such a way that prevents unecessary overriding. For more on the structure, see http://pageweaver.com/css.*/

/* By default, all main styling content should be kept in the .content.css stylesheet.*/
@import './\${mainParam}.content.css';\`
}
\``;
