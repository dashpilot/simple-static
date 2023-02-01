const fs = require("fs");
const { execSync } = require("child_process");

fs.watch("./public/", (eventType, filename) => {
  console.log(eventType);
  // could be either 'rename' or 'change'. new file event and delete
  // also generally emit 'rename'
  console.log(filename);

  if (filename == "template.htm" && eventType == "rename") {
    execSync("npm run build");
  }
});
