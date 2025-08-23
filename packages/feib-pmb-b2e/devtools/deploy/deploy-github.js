const ghpages = require("gh-pages");
// import ghpages from 'gh-pages';

ghpages.publish(
  "dist",
  {
    branch: "master",
    dest: "./",
    repo: "ssh://git@repo.zone0.science:28088/UX/feib-IBMB-B2E.git",
    // message:
    // '[Auto deploy] - ' +
    // 'Date: ' +
    // new Date().toLocaleDateString() +
    // ' Time: ' +
    // new Date().toLocaleTimeString(),
    message: "chore: gh pages auto deploy",
  },
  (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Deploy Complete!");
    }
  }
);
