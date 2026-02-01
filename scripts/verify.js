#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const pagesDir = path.join(repoRoot, "pages");
const aboutPage = path.join(pagesDir, "about-journalmatic-plugin");
const factoryFile = path.join(repoRoot, "factory.json");

function die(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(aboutPage)) {
  die("Missing pages/about-journalmatic-plugin (required for browse-all-plugins)");
}

try {
  JSON.parse(fs.readFileSync(aboutPage, "utf8"));
} catch (err) {
  die(`Invalid JSON in pages/about-journalmatic-plugin: ${err.message}`);
}

let factory;
try {
  factory = JSON.parse(fs.readFileSync(factoryFile, "utf8"));
} catch (err) {
  die(`Invalid JSON in factory.json: ${err.message}`);
}

const pages = Array.isArray(factory.pages) ? factory.pages : [];
if (!pages.includes("About Journalmatic Plugin")) {
  die("factory.json pages must include 'About Journalmatic Plugin'");
}

console.log("OK: journalmatic plugin metadata looks good");
