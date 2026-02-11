#!/usr/bin/env node

/**
 * Debug Cleanup Script
 *
 * Removes debug instrumentation from source files.
 * Looks for code between #region debug and #endregion markers.
 *
 * Usage:
 *   node debug_cleanup.js [directory]
 *
 * Options:
 *   --dry-run    Show what would be removed without making changes
 */

const fs = require('fs');
const path = require('path');

const TARGET_DIR = process.argv[2] || process.cwd();
const DRY_RUN = process.argv.includes('--dry-run');

// File extensions to process
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.py', '.go'];

// Regex patterns for debug regions
const PATTERNS = {
  js: /\/\/\s*#region\s+debug[\s\S]*?\/\/\s*#endregion/g,
  py: /#\s*#region\s+debug[\s\S]*?#\s*#endregion/g,
  go: /\/\/\s*#region\s+debug[\s\S]*?\/\/\s*#endregion/g,
};

// Track statistics
const stats = {
  filesScanned: 0,
  filesModified: 0,
  regionsRemoved: 0,
};

// Get pattern for file extension
function getPattern(ext) {
  if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) return PATTERNS.js;
  if (ext === '.py') return PATTERNS.py;
  if (ext === '.go') return PATTERNS.go;
  return null;
}

// Process a single file
function processFile(filePath) {
  const ext = path.extname(filePath);
  const pattern = getPattern(ext);

  if (!pattern) return;

  stats.filesScanned++;

  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(pattern);

  if (!matches || matches.length === 0) return;

  stats.regionsRemoved += matches.length;

  console.log(`\n${filePath}:`);
  matches.forEach((match, i) => {
    const preview = match.split('\n')[0].substring(0, 60);
    console.log(`  [${i + 1}] ${preview}...`);
  });

  if (DRY_RUN) {
    console.log(`  → Would remove ${matches.length} region(s)`);
    return;
  }

  // Remove debug regions and clean up extra blank lines
  const cleaned = content
    .replace(pattern, '')
    .replace(/\n{3,}/g, '\n\n'); // Collapse multiple blank lines

  fs.writeFileSync(filePath, cleaned);
  stats.filesModified++;
  console.log(`  → Removed ${matches.length} region(s)`);
}

// Recursively walk directory
function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip common directories
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.next', '__pycache__', 'venv'].includes(entry.name)) {
        continue;
      }
      walkDir(fullPath, callback);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.includes(ext)) {
        callback(fullPath);
      }
    }
  }
}

// Main
function main() {
  console.log(`Debug Cleanup${DRY_RUN ? ' (DRY RUN)' : ''}`);
  console.log(`Directory: ${TARGET_DIR}`);
  console.log('─'.repeat(50));

  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`Error: Directory not found: ${TARGET_DIR}`);
    process.exit(1);
  }

  walkDir(TARGET_DIR, processFile);

  console.log('\n' + '─'.repeat(50));
  console.log('Summary:');
  console.log(`  Files scanned: ${stats.filesScanned}`);
  console.log(`  Files modified: ${stats.filesModified}`);
  console.log(`  Regions removed: ${stats.regionsRemoved}`);

  if (DRY_RUN && stats.regionsRemoved > 0) {
    console.log('\nRun without --dry-run to apply changes.');
  }
}

main();
