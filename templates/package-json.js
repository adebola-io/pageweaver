module.exports = `\`{
  "name": "\${mainParam.toLowerCase()}",
  "version": "0.1.0",
  "private": true,
  "scripts": {\${
    args.scss
      ? \`
    "watch-sass": "sass --watch ./\${mainParam}.styles/scss/\${mainParam}.app.scss:./\${mainParam}.styles/\${mainParam}.css",\`
      : \`\`
  }\${
    args.typescript
      ? \`
    "watch-ts": "tsc --watch",\`
      : \`\`
  }
    "test": "echo 'Error: no test specified' && exit 1"
  },
  "license": "ISC",
  "keywords": [],
  "dependencies": {\${
    args.scss
      ? \`
    "sass": "^\${
      args.scss_version
        ? args.scss_version
        : modulesConfig.currentVersions.scss
    }"\`
      : \`\`
  }
  },
  "devDependencies": {\${
    args.typescript
      ? \`
    "typescript": "^\${
      args.typescript_version
        ? args.typescript_version
        : modulesConfig.currentVersions.typescript
    }"\`
      : \`\`
  }
  }
}
 \``;
