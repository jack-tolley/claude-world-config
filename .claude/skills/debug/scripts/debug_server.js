#!/usr/bin/env node

/**
 * Debug Log Server
 *
 * Collects logs from instrumented code for evidence-based debugging.
 *
 * Usage:
 *   node debug_server.js [project_path]
 *
 * Endpoints:
 *   POST /session - Create a new debug session
 *   POST /log     - Write a log entry
 *   GET /         - Server status
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.DEBUG_PORT || 8787;
const PROJECT_PATH = process.argv[2] || process.cwd();
const DEBUG_DIR = path.join(PROJECT_PATH, '.debug');

// Ensure debug directory exists
if (!fs.existsSync(DEBUG_DIR)) {
  fs.mkdirSync(DEBUG_DIR, { recursive: true });
}

// Track active sessions
const sessions = new Map();

// Generate short unique ID
function generateId() {
  return crypto.randomBytes(3).toString('hex');
}

// Sanitize session name for filename
function sanitizeName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 30);
}

// Parse JSON body from request
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        // Handle both JSON and plain text (sendBeacon)
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// CORS headers for browser requests
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Send JSON response
function sendJson(res, statusCode, data) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Request handler
async function handleRequest(req, res) {
  setCorsHeaders(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  try {
    // GET / - Server status
    if (req.method === 'GET' && url.pathname === '/') {
      sendJson(res, 200, {
        status: 'running',
        port: PORT,
        debug_dir: DEBUG_DIR,
        active_sessions: Array.from(sessions.keys()),
      });
      return;
    }

    // POST /session - Create new session
    if (req.method === 'POST' && url.pathname === '/session') {
      const body = await parseBody(req);
      const name = body.name || 'debug';
      const sanitized = sanitizeName(name);
      const id = `${sanitized}-${generateId()}`;
      const logFile = path.join(DEBUG_DIR, `debug-${id}.log`);

      // Create empty log file
      fs.writeFileSync(logFile, '');

      sessions.set(id, { name, logFile, created: new Date().toISOString() });

      sendJson(res, 200, {
        session_id: id,
        log_file: logFile,
      });
      return;
    }

    // POST /log - Write log entry
    if (req.method === 'POST' && url.pathname === '/log') {
      const body = await parseBody(req);
      const { sessionId, msg, data, hypothesisId, loc } = body;

      if (!sessionId) {
        sendJson(res, 400, { error: 'sessionId required' });
        return;
      }

      // Find log file (from session or construct path)
      let logFile;
      if (sessions.has(sessionId)) {
        logFile = sessions.get(sessionId).logFile;
      } else {
        // Allow writing to session even if server restarted
        logFile = path.join(DEBUG_DIR, `debug-${sessionId}.log`);
      }

      const entry = {
        ts: new Date().toISOString(),
        msg,
        data,
        hypothesisId,
        loc,
      };

      fs.appendFileSync(logFile, JSON.stringify(entry) + '\n');

      sendJson(res, 200, { ok: true });
      return;
    }

    // 404 for unknown routes
    sendJson(res, 404, { error: 'Not found' });

  } catch (err) {
    console.error('Request error:', err.message);
    sendJson(res, 500, { error: err.message });
  }
}

// Check if port is already in use
function checkPort() {
  return new Promise((resolve) => {
    const testServer = http.createServer();
    testServer.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      }
    });
    testServer.once('listening', () => {
      testServer.close();
      resolve(true);
    });
    testServer.listen(PORT);
  });
}

// Main
async function main() {
  const portAvailable = await checkPort();

  if (!portAvailable) {
    console.log(JSON.stringify({
      status: 'already_running',
      port: PORT,
      message: 'Debug server already running on this port',
    }));
    process.exit(0);
  }

  const server = http.createServer(handleRequest);

  server.listen(PORT, () => {
    console.log(JSON.stringify({
      status: 'started',
      port: PORT,
      debug_dir: DEBUG_DIR,
      project: PROJECT_PATH,
    }));
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down debug server...');
    server.close();
    process.exit(0);
  });
}

main();
