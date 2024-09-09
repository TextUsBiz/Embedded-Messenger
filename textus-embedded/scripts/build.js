/**
 * This file is used to bundle and minify the embedded snippet using ESBuild.
 * This file is run through dotenvx, so it has access to environment variables from the .env files.
 */

const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const env = process.env.ENV;

// Get the package version
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const version = packageJson.version;

// Define paths
const distDir = path.resolve(__dirname, "..", "./dist");
const outputDir = path.resolve(__dirname, "..", `lib/${version}`);
const outputFile =
  env === "production"
    ? path.join(outputDir, "embedded.js")
    : path.join(outputDir, "embedded.dev.js");
const outputMinifyFile =
  env === "production"
    ? path.join(outputDir, "embedded.min.js")
    : path.join(outputDir, "embedded.dev.min.js");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Bundle
esbuild
  .build({
    entryPoints: [`${distDir}/index.js`],
    bundle: true,
    format: "esm",
    // globalName: "TextUs",
    outfile: outputFile,
    define: {
      "process.env.TEXTUS_URL": JSON.stringify(process.env.TEXTUS_URL),
    },
  })
  .then(() => {
    // Log that the file was created successfully
    console.log(`Created ${outputFile}`);
  })
  .catch(() => process.exit(1));

// Bundle + minify
esbuild
  .build({
    entryPoints: [`${distDir}/index.js`],
    bundle: true,
    format: "esm",
    // globalName: "TextUs",
    minify: true,
    outfile: outputMinifyFile,
    define: {
      "process.env.TEXTUS_URL": JSON.stringify(process.env.TEXTUS_URL),
    },
  })
  .then(() => {
    // Log that the file was created successfully
    console.log(`Created ${outputMinifyFile}`);
  })
  .catch(() => process.exit(1));
