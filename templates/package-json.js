module.exports = `\`{
  "name": "\${mainParam.toLowerCase()}",
  "version": "0.1.0",
  "private": true,
  "scripts": {\${
    args.scss
      ? \`
    "watch-sass": "sass --watch ./\${mainParam}.styles/scss/\${mainParam}.app.scss:./\${mainParam}.styles/\${mainParam}.css",\`
      : \`\`
  }
    "test": "echo 'Error: no test specified' && exit 1"
  },
  "license": "ISC",
  "keywords": [],
  "dependencies": {\${
    args.scss
      ? \`
    "sass": "^1.43.3"\`
      : \`\`
  }
  },
  "devDependencies": {\${
    args.typescript
      ? \`
    "typescript": "^4.5.5"\`
      : \`\`
  }
  }
}
 \``;
