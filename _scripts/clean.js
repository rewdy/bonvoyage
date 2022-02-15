var DotJson = require("dot-json");
var inquirer = require("inquirer");
var fs = require("fs");
var gitconfig = require("gitconfig");

const { exec } = require("child_process");

// Constants
const DEPS_TO_DELETE = ["inquirer", "dot-json", "gitconfig"];
const SCRIPTS_TO_DELETE = ["fresh-start", "postinstall"];

// Helper function
const logStep = (msg) => console.log("\x1b[45m ✓ " + msg + "\033[0m");

// Run the prompts
inquirer
  .prompt([
    {
      type: "input",
      name: "new_name",
      message: "What is your project called?",
      default() {
        return __dirname.split("/").reverse()[1];
      },
    },
    {
      type: "input",
      name: "author",
      message: "Your name (to be used for package.json `author`)",
      default: async () => {
        const name = await gitconfig.get("user.name").then((name) => name);
        return name;
      },
    },
    {
      type: "input",
      name: "desc",
      message: "What are you building (used for package.json `description`)?",
      default: () => "New static website",
    },
    {
      type: "confirm",
      name: "confirmed",
      message: "Proceed?",
    },
  ])
  .then((answers) => {
    const { new_name, confirmed, author, desc } = answers;
    if (confirmed) {
      const pkg = new DotJson("./package.json");
      logStep("Setting new package.json values");
      pkg.set("name", new_name);
      pkg.set("author", author);
      pkg.set("description", desc);
      pkg.set("version", "0.0.1");

      logStep("Removing deps and scripts we don't want");
      DEPS_TO_DELETE.forEach((dep) => {
        pkg.delete(`devDependencies.${dep}`);
      });
      SCRIPTS_TO_DELETE.forEach((script) => {
        pkg.delete(`scripts.${script}`);
      });

      // save changes to pkg, done making updates
      pkg.save();

      logStep("Deleting unused files/folders");
      fs.rmSync(".git", { recursive: true, force: true });
      fs.rmSync("_scripts", { recursive: true, force: true });

      logStep("Re-installing node dependencies");
      exec("yarn install", (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
    } else {
      console.log("👋 Not doing anything.");
    }
  });
