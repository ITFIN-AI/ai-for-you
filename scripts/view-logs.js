#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Get logs directory
const logsDir = path.join(process.cwd(), 'logs');

// Check if logs directory exists
if (!fs.existsSync(logsDir)) {
  console.error('Logs directory does not exist. No logs have been generated yet.');
  process.exit(1);
}

// Get all log files
const logFiles = fs.readdirSync(logsDir)
  .filter(file => file.startsWith('log-') && file.endsWith('.txt'))
  .sort((a, b) => {
    // Sort by date (newest first)
    const dateA = a.replace('log-', '').replace('.txt', '');
    const dateB = b.replace('log-', '').replace('.txt', '');
    return dateB.localeCompare(dateA);
  });

if (logFiles.length === 0) {
  console.error('No log files found.');
  process.exit(1);
}

// Parse command line arguments
const args = process.argv.slice(2);
let selectedDate = null;
let filterLevel = null;
let searchTerm = null;

// Process arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--date' && args[i + 1]) {
    selectedDate = args[i + 1];
    i++;
  } else if (args[i] === '--level' && args[i + 1]) {
    filterLevel = args[i + 1].toUpperCase();
    i++;
  } else if (args[i] === '--search' && args[i + 1]) {
    searchTerm = args[i + 1];
    i++;
  } else if (args[i] === '--help') {
    console.log(`
Usage: node scripts/view-logs.js [options]

Options:
  --date YYYY-MM-DD   Show logs for a specific date
  --level LEVEL       Filter logs by level (ERROR, INFO)
  --search TERM       Search for a specific term in logs
  --help              Show this help message

Examples:
  node scripts/view-logs.js                     # Show all logs
  node scripts/view-logs.js --date 2023-04-15   # Show logs for April 15, 2023
  node scripts/view-logs.js --level ERROR       # Show only error logs
  node scripts/view-logs.js --search "email"    # Search for "email" in logs
    `);
    process.exit(0);
  }
}

// Filter log files by date if specified
let filesToProcess = logFiles;
if (selectedDate) {
  const dateFile = `log-${selectedDate}.txt`;
  if (logFiles.includes(dateFile)) {
    filesToProcess = [dateFile];
  } else {
    console.error(`No log file found for date: ${selectedDate}`);
    process.exit(1);
  }
}

// Process each log file
console.log('='.repeat(80));
console.log('APPLICATION LOGS');
console.log('='.repeat(80));

filesToProcess.forEach(file => {
  const filePath = path.join(logsDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Split the file content by double newlines to get individual log entries
  const logEntries = fileContent.split('\n\n').filter(entry => entry.trim());
  
  // Process each log entry
  logEntries.forEach(entry => {
    try {
      const logEntry = JSON.parse(entry);
      
      // Apply filters
      if (filterLevel && logEntry.level !== filterLevel) {
        return;
      }
      
      if (searchTerm) {
        const entryString = JSON.stringify(logEntry).toLowerCase();
        if (!entryString.toLowerCase().includes(searchTerm.toLowerCase())) {
          return;
        }
      }
      
      // Format and display the log entry
      const date = new Date(logEntry.timestamp);
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      
      console.log(`\n[${logEntry.level}] ${formattedDate}`);
      console.log(`Message: ${logEntry.message}`);
      
      if (logEntry.error) {
        console.log(`Error: ${logEntry.error.name}: ${logEntry.error.message}`);
        if (logEntry.error.stack) {
          console.log('Stack Trace:');
          console.log(logEntry.error.stack);
        }
      }
      
      if (logEntry.context) {
        console.log('Context:');
        console.log(JSON.stringify(logEntry.context, null, 2));
      }
      
      console.log('-'.repeat(80));
    } catch (error) {
      console.error(`Error parsing log entry: ${error.message}`);
    }
  });
});

console.log(`\nProcessed ${filesToProcess.length} log file(s).`); 