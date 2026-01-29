import {
  confirm,
  intro,
  isCancel,
  log,
  multiselect,
  outro,
  spinner,
  text,
} from "@clack/prompts";
import chalk from "chalk";
import fs from "node:fs";
import path from "node:path";
import { COLOR_DEFAULTS, HEADER_WIDTH, TAB } from "./constants";
import { copyLibrary } from "./copy";
import {
  centerText,
  colorizeColorString,
  doCancel,
  makeHeader,
} from "./helpers";

console.log(makeHeader());
try {
  console.log(
    centerText(chalk.bgMagenta(" Let's get you ready to ship! "), HEADER_WIDTH),
  );

  console.log("");
  console.log("");

  intro(chalk.yellow("Please enter the options for your theme below:"));

  // Where
  let destExists = false;
  const destination = await text({
    message: "Where should I create the theme files?",
    placeholder: "./my-style-files",
    validate: (value) => {
      if (!value || value.trim() === "") {
        return "Please provide a directory path";
      }

      const filePath = path.isAbsolute(value)
        ? value
        : path.resolve(process.cwd(), value);

      if (fs.existsSync(filePath)) {
        destExists = true;
      }
    },
  });

  if (isCancel(destination)) doCancel();

  if (destExists) {
    const confirmOverwrite = await confirm({
      message: `⚠️ ${chalk.yellow.underline(`The selected directory already exists: '${chalk.cyan(destination)}'.`)} Do you want to continue and potentially overwrite files?`,
      initialValue: false,
    });

    if (isCancel(destination)) doCancel();

    if (!confirmOverwrite) {
      outro(chalk.magenta("Okay! Existing without making changes."));
      process.exit(0);
    }
  }

  // Primary color

  const primary = await text({
    message: "Enter the theme primary color:",
    placeholder: COLOR_DEFAULTS.primary,
    defaultValue: COLOR_DEFAULTS.primary,
  });

  if (isCancel(primary)) doCancel();

  // Secondary color

  const secondary = await text({
    message: "Enter the theme secondary color:",
    placeholder: COLOR_DEFAULTS.secondary,
    defaultValue: COLOR_DEFAULTS.secondary,
  });

  if (isCancel(secondary)) doCancel();

  // Neutral base color

  const base = await text({
    message:
      "Enter the theme neutral base color (should be about 50% lightness):",
    placeholder: COLOR_DEFAULTS.base,
    defaultValue: COLOR_DEFAULTS.base,
  });

  if (isCancel(base)) doCancel();

  // Pick extras...

  const extras = await multiselect({
    message: "Pick extra features to include:",
    options: [
      {
        label: "Typography base",
        value: "type",
        hint: "Includes sensible defaults for semantic elements",
      },
      {
        label: "Spacing utilities",
        value: "spacing",
        hint: "Bootstrap style m-* and p-* classes",
      },
      {
        label: "Flexbox utilities",
        value: "flex",
        hint: "Bootstrap style d-flex and flex-* classes (does not include full grid)",
      },
      {
        label: "Flexbox grid",
        value: "grid",
        hint: "Bootstrap style flexbox grid system",
      },
    ],
    initialValues: ["type", "spacing"],
  });

  if (isCancel(extras)) doCancel();

  log.success(
    `${chalk.greenBright("Excellent choices!")} Now I will copy your files over...`,
  );

  // Build and log out summary

  const extrasStringList: string[] = Array.isArray(extras) ? extras : [];
  const summary: string[] = [
    "I will generate the scss files for you using these settings:",
  ];
  [
    ["Destination directory", destination],
    ["Primary color", primary],
    ["Secondary color", secondary],
    ["Neutral base", base],
    ["Extras", extrasStringList],
  ].forEach(([label, item]) => {
    if (item) {
      const printableItem =
        typeof item === "string"
          ? colorizeColorString(item, chalk.cyan)
          : Array.isArray(item)
            ? chalk.cyan(item.join(", "))
            : chalk.cyan(item.toString());
      summary.push(`${TAB}- ${label?.toString()}: ${printableItem}`);
    }
  });
  log.info(summary.join("\n"));

  // add more stuff

  const tick = spinner({ indicator: "dots" });
  tick.start("Copying files...");

  await copyLibrary({
    destination: destination.toString(),
    primaryColor: primary.toString(),
    secondaryColor: secondary.toString(),
    baseColor: base.toString(),
    extras: {
      type: extrasStringList.includes("type"),
      spacing: extrasStringList.includes("spacing"),
      flex: extrasStringList.includes("flex"),
      grid: extrasStringList.includes("grid"),
    },
  });

  tick.stop(
    `Finished copying files. You will find them in: ${chalk.cyan(destination.toString())}`,
  );

  // Done
  outro(chalk.green("All done! Happy coding! 🚀"));
  process.exit(0);
} catch (error) {
  console.error("An error occurred:", error);
  process.exit(1);
}
