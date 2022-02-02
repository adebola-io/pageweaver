module.exports = `\`{
  "name": "\${mainParam.toLowerCase()}",
  "version": "0.1.0",
  "private": true,
  "structure": "pageweaver",
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",\${
    args.scss
      ? \`
    "watch-sass": "sass --watch ./src/styles/scss/\${mainParam}.app.scss:./src/styles/\${mainParam}.css",\`
      : \`\`
    }
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    \${
      args.scss
        ? \`
    "sass": "^1.43.3",\`
        : \`\`
    }
    "vue": "^3.0.0"\${
      args.vue_router
        ? \`,
    "vue-router": "^4.0.12"\`
        : \`\`
    }
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/compiler-sfc": "^3.0.0",\${
      args.typescript
        ? \`
    "typescript": "^4.5.5",\`
        : \`\`
    }
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^7.0.0"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/vue3-essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {}
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
 \``;
