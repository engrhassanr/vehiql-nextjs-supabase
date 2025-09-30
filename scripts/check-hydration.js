/**
 * Script to help identify potential hydration issues in the codebase
 */

const fs = require("fs");
const path = require("path");

function findFiles(dir, extension) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !item.startsWith(".") &&
      item !== "node_modules"
    ) {
      files.push(...findFiles(fullPath, extension));
    } else if (stat.isFile() && item.endsWith(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

function checkHydrationIssues() {
  console.log("🔍 Checking for potential hydration issues...\n");

  const jsxFiles = findFiles("./app", ".jsx");
  const jsFiles = findFiles("./components", ".jsx");
  const allFiles = [...jsxFiles, ...jsFiles];

  const issues = [];

  for (const file of allFiles) {
    const content = fs.readFileSync(file, "utf8");
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;

      // Check for potential hydration issues
      if (line.includes("Date.now()") || line.includes("Math.random()")) {
        issues.push({
          file,
          line: lineNumber,
          content: line.trim(),
          issue: "Non-deterministic value that changes on each render",
        });
      }

      if (
        line.includes("window.") &&
        !line.includes("useEffect") &&
        !line.includes("useHydration")
      ) {
        issues.push({
          file,
          line: lineNumber,
          content: line.trim(),
          issue: "Direct window access outside of useEffect",
        });
      }

      if (
        line.includes("document.") &&
        !line.includes("useEffect") &&
        !line.includes("useHydration")
      ) {
        issues.push({
          file,
          line: lineNumber,
          content: line.trim(),
          issue: "Direct document access outside of useEffect",
        });
      }

      if (
        line.includes("localStorage.") &&
        !line.includes("useEffect") &&
        !line.includes("useHydration")
      ) {
        issues.push({
          file,
          line: lineNumber,
          content: line.trim(),
          issue: "Direct localStorage access outside of useEffect",
        });
      }

      if (
        line.includes("navigator.") &&
        !line.includes("useEffect") &&
        !line.includes("useHydration")
      ) {
        issues.push({
          file,
          line: lineNumber,
          content: line.trim(),
          issue: "Direct navigator access outside of useEffect",
        });
      }
    }
  }

  if (issues.length === 0) {
    console.log("✅ No obvious hydration issues found!");
  } else {
    console.log(`❌ Found ${issues.length} potential hydration issues:\n`);

    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.file}:${issue.line}`);
      console.log(`   Issue: ${issue.issue}`);
      console.log(`   Code: ${issue.content}`);
      console.log("");
    });

    console.log("\n💡 Recommendations:");
    console.log("- Wrap client-side code in useEffect or useHydration hook");
    console.log("- Use ClientOnly component for problematic components");
    console.log("- Ensure consistent rendering between server and client");
  }
}

checkHydrationIssues();
