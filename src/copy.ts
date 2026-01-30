import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Handlebars from "handlebars";

export type BonVoyageConfig = {
  destination: string;
  primaryColor: string;
  secondaryColor: string;
  baseColor: string;
  baseRatio?: number;
  extras: {
    type: boolean;
    spacing: boolean;
    flex: boolean;
    grid: boolean;
  };
};

/**
 * Function to copy the files from the source to the dest
 */
export const copyLibrary = async (config: BonVoyageConfig, dev = false) => {
  // Ensure directory exists and creates it if not
  if (!fs.existsSync(config.destination)) {
    fs.mkdirSync(config.destination, { recursive: true });
  }

  // Copy files from templates, interpolating them with handlebars in the process
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const srcDir = path.resolve(moduleDir, "..", "templates");
  const files = fs.readdirSync(srcDir);

  files.forEach((file) => {
    const srcFilePath = path.join(srcDir, file);
    const destFilePath = path.join(
      config.destination,
      file.replace("gitignore", ".gitignore"),
    );

    const templateSource = fs.readFileSync(srcFilePath, "utf-8");
    const template = Handlebars.compile(templateSource, { noEscape: true });

    let rendered = template({
      primaryColor: config.primaryColor,
      secondaryColor: config.secondaryColor,
      baseColor: config.baseColor,
      baseRatio: config.baseRatio,
      extra: {
        type: config.extras.type,
        spacing: config.extras.spacing,
        flex: config.extras.flex,
        grid: config.extras.grid,
      },
    });

    if (dev) {
      const doNotEditHeading = `/*
  * This file is auto-generated. Do not edit directly.
  * To make changes, edit the templates in the "templates" directory.
*/
`;
      rendered = doNotEditHeading + rendered;
    }

    fs.writeFileSync(destFilePath, rendered, "utf-8");
  });
};

if (require.main === module) {
  // If this is run directly, we copy pasta to the dev harness with
  // default vars. We use this for making the SASS right 💅.
  (async () => {
    console.log("Running test copy");

    await copyLibrary(
      {
        destination: "./showcase/scss",
        primaryColor: "#3498db",
        secondaryColor: "#2ecc71",
        baseColor: "#ecf0f1",
        baseRatio: 1.333,
        extras: {
          type: true,
          spacing: true,
          flex: true,
          grid: false,
        },
      },
      true,
    );

    console.log("Templates copied successfully!");
    process.exit(0);
  })().catch((err) => {
    console.error("Failed to copy templates:", err);
    process.exit(1);
  });
}
