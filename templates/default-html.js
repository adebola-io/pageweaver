module.exports = `\`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\${
      args.no_css || args.jsFramework
        ? ""
        : \`\${
          args.bootstrap && !args.bootstrap_local
            ? \`
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />\`
            : \`\`
        }
    <link rel="stylesheet" href="./\${mainParam}.styles/\${
      args.scss ? \`\` : \`--\`
    }\${mainParam}.css"/>\`
    }\${
    args.react_cli
      ? \`
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the 'public' folder during the build.
      Only files inside the 'public' folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running 'npm run build'.
    -->\`
      : \`\`
  }
    <title>\${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)}</title>
  </head>
  <body>
    \${
      args.jsFramework
        ? \`
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="\${args.react_cli ? "root" : args.vue_cli ? "app" : ""}"></div>\${
            args.react_cli || args.vue_cli
              ? \`
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run 'npm start' or 'yarn start'.
      To create a production bundle, use 'npm run build' or 'yarn build'.
    -->\`
              : \`\`
          }\`
        : \`<div class='fill'>
      <p class='center-text'> New Pageweaver Project.</p>
    </div>\`
    }
    \${
      args.no_javascript || args.jsFramework
        ? ""
        : \`\${
            args.bootstrap && !args.bootstrap_local
              ? \`<script
      src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"
    ></script>\`
              : ""
          }\${
            args.react
              ? \`
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>\`
              : ""
          }
    <script src="./\${mainParam}.js/\${mainParam}.main.js"></script>\`
    }
  </body>
</html>\``;
