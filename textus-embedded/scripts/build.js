/**
 * This file is used to minify and bundle the embedded snippet using ESBuild.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get the package version
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const version = packageJson.version;

// Define paths
const distDir = path.resolve(__dirname, "..", "./dist");
const outputDir = path.resolve(__dirname, "..", `lib/${version}`);
const outputMinifyFile = path.join(outputDir, "embedded.min.js");
const outputFile = path.join(outputDir, "embedded.js");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Build the ESBuild command
const esbuildMinifyCmd = `npx esbuild ${distDir}/index.js --bundle --minify --global-name=TextUs --outfile=${outputMinifyFile}`;
const esbuildCmd = `npx esbuild ${distDir}/index.js --bundle --global-name=TextUs --outfile=${outputFile}`;

// Run the ESBuild command
try {
  execSync(esbuildMinifyCmd, { stdio: "inherit" });
  execSync(esbuildCmd, { stdio: "inherit" });
  console.log(`Build completed: ${outputFile}`);
} catch (error) {
  console.error("Error during build:", error.message);
  process.exit(1);
}
