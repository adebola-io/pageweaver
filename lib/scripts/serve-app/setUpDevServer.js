const { serveApp } = require(".");
const colors = require("colors");
const { prompt, load, success, error } = require("../../utils/terminal");

module.exports.setUpDevServer = function (appName, args, destination) {
  prompt(
    "continue",
    `Do you want to start the development server for ${appName} (Y/N)? `,
    (result) => {
      switch (result) {
        case "Y":
        case "y":
        case "Yes":
        case "YES":
        case "yes":
          serveApp(appName, destination).then(({ stat, port }) => {
            switch (stat) {
              case "success":
                console.clear();
                success(
                  "Pageweaver Development Server Started.",
                  `Your ${appName} project is running on http://localhost:${port}.`
                );
                console.log("Hit CTRL + C to stop the server.".brightBlue);
                break;
              default:
                console.log(stat);
                error("Something went wrong.");
            }
          });
          break;
        case "N":
        case "n":
        case "No":
        case "NO":
        case "no":
          console.log(
            `To use the dev server later, run pageweaver serve-app ${appName}.`
          );
          break;
        default:
          error("Unrecognized command. Process aborted.", undefined, true);
      }
    }
  );
};
