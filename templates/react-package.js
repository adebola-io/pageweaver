module.exports = `\`{
  "name": "\${mainParam.toLowerCase()}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",\${
      args.typescript
        ? \`
    "@types/jest": "^27.4.0",
    "@types/node": "^16.11.19",
    "@types/react": "^17.0.38",
    "@types/react-dom": "^17.0.11",
    "typescript": "^\${
      args.typescript_version
        ? args.typescript_version
        : modulesConfig.currentVersions.typescript
    }",\`
        : ""
    }
    "react": "^\${
      args.react_cli_version
        ? args.react_cli_version
        : modulesConfig.currentVersions.react_cli
    }",
    "react-dom": "^\${
      args.react_cli_version
        ? args.react_cli_version
        : modulesConfig.currentVersions.react_cli
    }",\${
      args.react_router ? \`
    "react-router-dom" : "^\${
      args.react_router_version
        ? args.react_router_version
        : modulesConfig.currentVersions.react_router
    }",\` : \`\`
    }\${
      args.scss
        ? \`
    "sass": "^\${
      args.scss_version
        ? args.scss_version
        : modulesConfig.currentVersions.scss
    }",\`
        : \`\`
    }
    "react-scripts": "4.0.3",
    "web-vitals": "^1.1.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",\${
      args.scss
        ? \`
    "watch-sass": "sass --watch ./src/styles/scss/\${mainParam}.app.scss:./src/styles/\${mainParam}.css",\`
        : \`\`
    }
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
\``;
