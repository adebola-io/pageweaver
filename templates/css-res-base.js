module.exports = `\`/* 
    This file is the base file for responsiveness of the \${mainParam} Page.
    NOTE: Responsive configuration files are imported from LARGEST to SMALLEST screens, to prevent style overwriting. 
*/

/* Extra large screens, 4K Screens & TV */
@import url(./\${mainParam}.res.2160px.css);

/* Laptop & iPad screens */
@import url(./\${mainParam}.res.1440px.css);
@import url(./\${mainParam}.res.1024px.css);

/* Tablet Screens */
@import url(./\${mainParam}.res.768px.css);

/* Large Mobile devices */
@import url(./\${mainParam}.res.425px.css);

/* Medium Mobile devices */
@import url(./\${mainParam}.res.375px.css);

/* Small Mobile devices */
@import url(./\${mainParam}.res.320px.css);\``;
