module.exports = `\`{
  "compilerOptions": {\${
    args.react_cli
      ? \`
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"\`
      : \`
    "module": "commonjs",
    "target": "ES5",
    "outDir": "\${mainParam}.js",
    "rootDir": "\${mainParam}.ts"\`
  }
  }\${
    args.react_cli
      ? \`,
  "include": [
    "src"
  ]\`
      : ""
  }
}
\``;
