---
name: debug
description: Runtime debugging workflow with automated log collection. Use when fixing bugs that require runtime evidence (values, types, flow). Automates log collection so you can read logs directly instead of asking users to copy-paste from DevTools.
---

# Debug Mode

Fix bugs with **runtime evidence**, not guesses.

```
Don't guess → Hypothesize → Instrument → Reproduce → Analyze → Fix → Verify
```

## When to Use

**Trigger signals** (if you're about to do any of these, use this skill instead):
- "Open DevTools Console and check for..."
- "Reproduce the bug and tell me what you see"
- "Add console.log and let me know the output"
- "Click X, open Y, check if Z appears in console"

**Use when debugging:**
- State/value issues (null, undefined, wrong type)
- Conditional logic (which branch was taken)
- Async timing (race conditions, load order)
- User interaction flows (modals, forms, clicks)

## Arguments

```
/debug [path/to/project] [optional: bug description]
```

If no path provided, use current working directory.

## Workflow

### Phase 1: Start Log Server

**Step 1: Ensure server is running:**

```bash
node .claude/skills/debug/scripts/debug_server.js &
```

Server outputs:
- `{"status":"started",...}` - new server started
- `{"status":"already_running",...}` - already running (fine!)

**Step 2: Create session:**

```bash
curl -s -X POST http://localhost:8787/session -H "Content-Type: application/json" -d '{"name":"describe-the-bug"}'
```

Response:
```json
{"session_id":"describe-the-bug-a1b2c3","log_file":".debug/debug-describe-the-bug-a1b2c3.log"}
```

**Save the `session_id`** - use it in all subsequent steps.

**Server endpoints:**
- `POST /session` with `{"name": "description"}` → creates session
- `POST /log` with `{"sessionId": "...", "msg": "..."}` → writes log
- `GET /` → returns status

**If port 8787 busy:** `lsof -ti :8787 | xargs kill -9` then restart

──────────

### Phase 2: Generate Hypotheses

**Before instrumenting**, generate 3-5 specific hypotheses:

```
Hypothesis H1: userId is null when passed to calculateScore()
  Expected: number (e.g., 5)
  Actual: null
  Test: Log userId at function entry

Hypothesis H2: score is string instead of number
  Expected: 85 (number)
  Actual: "85" (string)
  Test: Log typeof score

Hypothesis H3: API response missing expected field
  Expected: response.data.items[]
  Actual: response.data undefined
  Test: Log full API response
```

Each hypothesis must be:
- **Specific** (not "something is wrong")
- **Testable** (can confirm/reject with logs)
- **Cover different subsystems** (don't cluster)

──────────

### Phase 3: Instrument Code

Add logging calls to test all hypotheses.

**JavaScript/TypeScript:**
```javascript
// #region debug
const SESSION_ID = 'REPLACE_WITH_SESSION_ID';
const DEBUG_LOG_URL = 'http://localhost:8787/log';

const debugLog = (msg, data = {}, hypothesisId = null) => {
  const payload = JSON.stringify({
    sessionId: SESSION_ID,
    msg,
    data,
    hypothesisId,
    loc: new Error().stack?.split('\n')[2]?.trim(),
  });

  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon(DEBUG_LOG_URL, payload);
  } else {
    fetch(DEBUG_LOG_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    }).catch(() => {});
  }
};
// #endregion

// Usage examples
debugLog('Function entry', { userId, score, typeScore: typeof score }, 'H1,H2');
debugLog('API response received', { response: response.data }, 'H3');
debugLog('Branch taken', { condition: 'else', value: x }, 'H1');
```

**Python:**
```python
# #region debug
import requests
import traceback

SESSION_ID = 'REPLACE_WITH_SESSION_ID'

def debug_log(msg, data=None, hypothesis_id=None):
    try:
        requests.post('http://localhost:8787/log', json={
            'sessionId': SESSION_ID,
            'msg': msg,
            'data': data,
            'hypothesisId': hypothesis_id,
            'loc': traceback.format_stack()[-2].strip()
        }, timeout=0.5)
    except:
        pass
# #endregion

# Usage
debug_log('Function entry', {'user_id': user_id, 'type': type(user_id).__name__}, 'H1')
```

**Guidelines:**
- 3-8 instrumentation points
- Cover: entry/exit, before/after critical ops, branch paths
- Tag each log with `hypothesisId`
- Wrap in `// #region debug` ... `// #endregion` for easy removal
- **High-frequency events** (mousemove, scroll): log only on state change

──────────

### Phase 4: Clear and Reproduce

1. **Clear logs:**
   ```bash
   : > .debug/debug-$SESSION_ID.log
   ```

2. **Provide reproduction steps:**
   ```
   Reproduction steps:
   1. Start app: npm run dev
   2. Navigate to /users
   3. Click "Calculate Score" button
   4. Observe: NaN displayed instead of score
   ```

3. **User reproduces bug**

──────────

### Phase 5: Analyze Logs

Read and evaluate:

```bash
cat .debug/debug-$SESSION_ID.log
```

For each hypothesis:

```
Hypothesis H1: userId is null
  Status: CONFIRMED
  Evidence: {"msg":"Function entry","data":{"userId":null}}
  → ROOT CAUSE IDENTIFIED

Hypothesis H2: score is string
  Status: REJECTED
  Evidence: {"data":{"typeScore":"number"}}

Hypothesis H3: API response missing field
  Status: REJECTED
  Evidence: {"data":{"response":{"items":[...]}}}
```

**Status options:**
- **CONFIRMED**: Logs prove it → proceed to fix
- **REJECTED**: Logs disprove it
- **INCONCLUSIVE**: Need more instrumentation

**If all INCONCLUSIVE/REJECTED**: Generate new hypotheses from different subsystems, add more logs, iterate.

──────────

### Phase 6: Fix

**Only fix when logs confirm root cause.**

Keep instrumentation active (don't remove yet).

Tag verification logs with `runId: "post-fix"`:
```javascript
debugLog('Function entry', { userId, runId: 'post-fix' }, 'H1');
```

──────────

### Phase 7: Verify

1. Clear logs
2. User reproduces (bug should be gone)
3. Compare before/after:
   ```
   Before: {"data":{"userId":null},"runId":"pre-fix"}
   After:  {"data":{"userId":5},"runId":"post-fix"}
   ```
4. Confirm with log evidence

**If still broken**: New hypotheses, more logs, iterate.

──────────

### Phase 8: Five Whys (Optional)

**When to run:** Recurring bug, prod incident, security issue.

After fixing, ask "Why did this bug exist?":

```
Bug: API returns NaN for score

Why 1: userId was null → Fixed: added null check
Why 2: No input validation on API → Add: validation middleware
Why 3: No test for null case → Add: unit test
Why 4: Review didn't catch → Acceptable (one-off)
```

| Type | Action |
|------|--------|
| CODE | Fix immediately |
| TEST | Add test case |
| PROCESS | Update checklist |
| SYSTEMIC | Document pattern |

──────────

### Phase 9: Clean Up

Remove instrumentation only after:
- Post-fix logs prove success
- User confirms resolved

**Find and remove all debug code:**
```bash
grep -rn "#region debug" --include="*.ts" --include="*.js" --include="*.py"
```

Remove everything between `#region debug` and `#endregion`.

## Log Format

Each line is NDJSON:
```json
{"ts":"2024-01-03T12:00:00.000Z","msg":"Button clicked","data":{"id":5},"hypothesisId":"H1","loc":"app.js:42"}
```

## Critical Rules

1. **NEVER fix without runtime evidence** - Always collect logs first
2. **NEVER remove instrumentation before verification** - Keep until fix confirmed
3. **NEVER guess** - If unsure, add more logs
4. **If all hypotheses rejected** - Generate new ones from different subsystems

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Server won't start | Check port: `lsof -i :8787`, kill if busy |
| Logs empty | Check CORS/mixed content, verify session ID |
| Wrong log file | Verify session ID matches |
| Too many logs | Filter by hypothesisId, use state-change logging |
| Can't reproduce | Get exact steps, check environment differences |

### CORS / Mixed Content Workarounds

If logs aren't arriving from browser:

**1. Use `sendBeacon`** (avoids preflight):
```javascript
navigator.sendBeacon(DEBUG_LOG_URL, JSON.stringify(payload));
```

**2. Dev server proxy** (Vite example):
```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/__log': {
        target: 'http://localhost:8787',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/__log/, '/log'),
      },
    },
  },
};
// Then POST to /__log instead of localhost:8787/log
```

**3. Node.js/server-side**: No CORS issues, fetch works directly.

## Checklist

- [ ] Server running (started or already_running)
- [ ] Session created, session_id saved
- [ ] 3-5 hypotheses generated
- [ ] 3-8 logs added, tagged with hypothesisId
- [ ] Logs cleared before reproduction
- [ ] Reproduction steps provided
- [ ] Each hypothesis evaluated
- [ ] Fix based on evidence only
- [ ] Before/after comparison done
- [ ] Instrumentation removed after confirmation
