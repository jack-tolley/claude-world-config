---
name: permissions
description: Conversationally add, audit, or clean up Claude Code permission rules in settings.local.json and ~/.claude/settings.json, with judgment calls surfaced for review (which file, redundancy, deny conflicts, risky broad rules) rather than applied silently. Use when you keep approving the same commands, want to allow a new tool pattern, or want to audit for redundancy and coverage gaps. For a one-shot automated scan of read-only commands from recent transcripts, use the built-in fewer-permission-prompts skill instead; for simple non-permission settings.json edits (env vars, hooks), use the built-in update-config skill.
argument-hint: "[command to allow] or [audit] or [clean]"
---

# Permissions

Fix it once, stop approving it forever.

**How this differs from the built-in alternatives:** this skill is for when you want a second pair of eyes — it reads both settings files, reasons about which file a rule belongs in, checks for redundancy and deny conflicts, and shows you the diff before writing. `fewer-permission-prompts` (built-in) does the mechanical version of part of this: it scans recent transcripts and proposes an allowlist of read-only patterns in one pass, no back-and-forth. `update-config` (built-in) is for direct settings.json edits that aren't really a judgment call (env vars, hooks, non-permission config). Reach for this skill when you're not sure a rule is safe to add, when you suspect redundancy has built up, or when you want the reasoning shown before anything gets written.

```
Read both files → Classify request → Draft rule → Check conflicts → Apply edit
```

## When to Use

**Trigger signals:**
- "I keep approving this command"
- "Add permission for X"
- "Allow [command] automatically"
- "Audit our permissions"
- "Clean up redundant rules"

**Use for:**
- Adding a new `Bash(...)` allow rule for a command you keep manually approving
- Auditing both settings files for redundancy, coverage gaps, wrong paths
- Choosing the right file (local project vs global)
- Fixing misformatted or overly broad rules

## Arguments

```
/permissions [command]          # Add allow rule for this command
/permissions audit              # Full audit of both files
/permissions clean              # Remove redundant/duplicate rules
```

──────────

## Reference: Rule Format

Rules follow `Tool(pattern)`. Wildcards use `*`. Space before `*` enforces word boundary.

| Tool | Pattern Example | What it matches |
|------|-----------------|-----------------|
| `Bash(npm test *)` | `npm test -- --watch` | Any npm test command |
| `Bash(git commit *)` | `git commit -m "message"` | git commit only |
| `Bash(git push *)` | `git push origin main` | git push (any form) |
| `WebFetch(domain:github.com)` | Any github.com URL | GitHub fetches |
| `mcp__example__search_records` | Exact MCP tool name | That tool only |

**File locations:**
- `~/.claude/settings.json` — global, applies to all workspaces
- `.claude/settings.local.json` — project-specific, git-ignored

**Which file to edit:**

| Command type | Edit here |
|---|---|
| General dev tools (git, npm, grep, jq) | Global `~/.claude/settings.json` |
| Project-specific CLIs (hspt, go build, project scripts) | Local `settings.local.json` |
| MCP tool approvals | Local `settings.local.json` |
| WebFetch domains specific to this project | Local `settings.local.json` |

**Evaluation order:** `deny` wins over `allow`. First matching rule applies.

──────────

## Phase 1: Read Current State (1 min)

Always read both files before making any change — redundancy and wrong-file placement are the most common issues.

Files:
- `/Users/jacktolley/Documents/claude-world/.claude/settings.local.json`
- `/Users/jacktolley/.claude/settings.json`

Check:
- Does a matching or broader rule already exist? (e.g. `Bash(hspt *)` covers all hspt subcommands)
- Is there a deny rule that would block the new allow?
- Is the rule in the right file?

**Output:**
```
Existing coverage: [Yes — rule X already covers this / No — gap identified]
Conflicts: [None / Deny rule Y would block this]
Target file: [settings.local.json / settings.json]
```

──────────

## Phase 2: Classify the Request (1 min)

| Request type | Action |
|---|---|
| "Allow [specific command]" | Add targeted rule to correct file |
| "I keep approving [command]" | Extract minimum pattern, check if already covered |
| "audit" | Run Phase 3 |
| "clean" | Run Phase 4 |

For "I keep approving X" — extract the longest stable prefix before variable parts:
- `hspt contacts search --filter "..." -o json 2>/dev/null` → check if `Bash(hspt *)` already covers it before adding anything
- `git commit -m "..."` → `Bash(git commit *)` covers all variants

If a broad rule already covers the command, the issue may be session-level (rules load at start) or a shell redirect (`2>/dev/null`, pipes) that disrupts matching. Note this rather than adding a duplicate rule.

──────────

## Phase 3: Audit Mode

Read both files and report across four categories:

**Redundancy:** Rules that are strict subsets of other rules already present
- Example: `Bash(hspt contacts:*)` when `Bash(hspt *)` exists

**Path errors:** Deny rules referencing wrong usernames or paths
- Always use `/Users/jacktolley/` not `/Users/Jack/` or other variants

**Wrong file:** Project-specific tools in global settings, or general tools only in local
- `Bash(hspt *)` belongs in `settings.local.json`, not global

**Risky patterns:** Overly broad allow rules in global settings
- `Bash(rm *)` in global allow permits destructive deletes without confirmation
- `WebFetch(*)` in global allow bypasses domain restrictions

**Output:**
```
Audit Report
────────────
Redundant rules (N):
  - [file]: "[rule]" — already covered by "[broader rule]"

Path errors (N):
  - [file] line N: "[wrong path]" — should be "[correct path]"

Wrong file (N):
  - "[rule]" is project-specific but in global settings

Risky patterns (N):
  - [file]: "[rule]" — [reason it's risky]

Recommendations:
  1. [Specific change]
  2. [Specific change]
```

──────────

## Phase 4: Clean Mode

Remove confirmed redundant rules only. For each removal:
1. Confirm the broader rule exists and covers identical scope
2. Show the exact line to remove
3. Write only after confirming with the user

Never remove a rule with a different intent even if it looks covered — ask if unsure.

──────────

## Phase 5: Apply Edit

Show the JSON diff before writing any file:

```json
// settings.local.json — adding targeted hspt search rule
{
  "permissions": {
    "allow": [
      // ... existing rules ...
      "Bash(hspt contacts search *)"   // ← new
    ]
  }
}
```

For fixes to existing rules, show before and after on the same line.

Write the file. Confirm the change was applied by re-reading the relevant section.

**Output:**
```
Change: [description]
File: [which file]
Reason: [why this file, why this pattern]
Conflicts checked: [None / resolved by X]
```

──────────

## Critical Rules

1. **Read before writing** — always load both files first; adding a rule that already exists creates noise without fixing anything
2. **Broad rules beat narrow ones for allow** — `Bash(hspt *)` is better than five specific `Bash(hspt contacts *)` rules unless you need to deny specific subcommands
3. **Deny always beats allow** — a new allow rule won't work if a deny rule matches first; always check for conflicts
4. **Edit the right file** — project CLIs go in `settings.local.json`; general dev tools in global; MCP approvals always local
5. **Never loosen global deny rules** — `Bash(sudo *)`, `Bash(rm -rf *)`, `Bash(git push --force *)` are there for good reason; don't remove or narrow them

## Quality Checklist

- [ ] Read both files before any edit
- [ ] New rule doesn't duplicate a broader existing rule
- [ ] Rule placed in correct file (local vs global)
- [ ] No deny rule conflicts with new allow
- [ ] Diff shown and confirmed before writing

## Common Pitfalls

| Pitfall | Solution |
|---|---|
| Adding `Bash(hspt contacts *)` when `Bash(hspt *)` exists | Check for existing broad rules first |
| Deny paths using wrong username | Always `//Users/jacktolley/` not `//Users/Jack/` |
| Putting project CLIs in global settings | hspt, go build, project scripts belong in `settings.local.json` |
| Thinking multi-line commands need special rules | Claude Code matches on the fully-expanded command string |
| Rules not taking effect in current session | Permission rules load at session start — restart the session after changes |

## Integration

- Use after: any session where you repeatedly approved the same command
- Use before: `/security-audit` — permissions are part of the security posture
- Alternative for a fast automated pass: `fewer-permission-prompts` (built-in) — scans recent transcripts and proposes read-only allowlist entries in one shot
- Alternative for non-permission config: `update-config` (built-in) — env vars, hooks, other settings.json fields
