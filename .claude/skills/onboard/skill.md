---
name: onboard
description: Deep exploration of a project before engaging with requests. Use when starting work on an unfamiliar codebase, project, or task context — builds understanding of structure, purpose, conventions, and dependencies before writing code or taking action.
argument-hint: "[path/to/project] [optional: focus area]"
---

# Onboard

Build understanding before building anything.

```
Check history → [Returning: restore context] or [Fresh: Discover → Map → Conventions → Dependencies] → Document context → Ready to work
```

## When to Use

**Trigger signals:**
- "Get up to speed on this before we start"
- Starting work in an unfamiliar directory, repo, or project
- "Explore this first"
- About to implement something in a codebase you haven't seen
- Need context before making decisions or taking action

**Use for:**
- Understanding a codebase before writing code
- Mapping a project's architecture and conventions
- Getting context on a business or docs project before contributing
- Any situation where acting without context risks wrong assumptions

## Arguments

```
/onboard [path/to/directory]        # Explore specific directory
/onboard [path] [focus]             # Focus: auth, api, data, tests, deploy
/onboard                            # Use current working directory
```

──────────

## Phase 0: Check Session History (1 min)

Before exploring, check whether you've been here before — a previous closedown may have left context ready to restore.

```bash
ls -t /Users/jacktolley/Documents/claude-world/docs/session-notes/ 2>/dev/null | head -5
ls -t PICKUP-*.md 2>/dev/null | head -3
```

**If a PICKUP file or recent session note exists → Returning path:**

Read the most recent PICKUP file. Extract the standard header fields:
- `CONTINUING FROM:` — what project/task
- `FIRST ACTION:` — the exact next step
- `LAST FILE:` — where to resume in code

Then confirm with the user:
> "Last session: [date]. You were working on [task]. First action was: [action]. Resume from here, or do a full re-explore?"

- **Resuming** → skip to Phase 6 with restored context. Don't re-explore what you already know.
- **Re-exploring** → continue to Phase 1 as normal.

**If no history found → Fresh start path:**

Continue to Phase 1.

**Output:**
```
History: [Found: YYYY-MM-DD-[slug] | Not found]
Path: [Returning | Fresh start]
[If returning] Resuming: [task] — First action: [action]
```

──────────

## Phase 1: Discover Structure (2 min)

Orient to what type of project this is and how it's organised.

Check for project documentation first — it tells you what the project says about itself:

```bash
cat README.md 2>/dev/null | head -60
cat CLAUDE.md 2>/dev/null | head -60
ls -la
```

For code projects, also discover the stack:

```bash
cat package.json 2>/dev/null || cat pyproject.toml 2>/dev/null || cat go.mod 2>/dev/null
find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.go" \) | head -100
```

**Output:**
```
Project: <name>
Type: <codebase / docs / business / mixed>
Stack: <languages, frameworks, or primary tools>
Purpose: <one sentence — what is this for?>
Entry points: <key files or directories to start from>
```

──────────

## Phase 2: Map Architecture (3 min)

Understand how the parts connect and what each layer does.

For code projects, identify the layers:
```
├── API/Routes      → Where requests enter
├── Business Logic  → Core domain code
├── Data Layer      → Database, external services
├── Shared/Utils    → Common utilities
└── Config          → Environment, settings
```

For any project type, ask:
- What are the major components or areas?
- How do they relate to each other?
- Where does work enter and where does it exit?
- Who or what consumes the output of this project?

For each layer or area, note the key files, naming conventions, and responsibilities.

**Output:**
```
Architecture:
- <Layer>: <path> — <description>
- <Layer>: <path> — <description>
```

──────────

## Phase 3: Surface Conventions (3 min)

Find the established ways of working — follow them, don't invent new ones.

For code projects, look for:

| Pattern | Where to look | Example |
|---------|---------------|---------|
| Error handling | try/catch, Result types | `AppError` class |
| Validation | Zod, Joi, manual checks | `schemas/*.ts` |
| Testing | Jest, Vitest, pytest | `*.test.ts` patterns |
| Logging | winston, pino, console | `logger.ts` |

For any project, look for:
- How are decisions documented?
- What naming conventions exist?
- What style guides or templates are referenced?
- Are there CLAUDE.md files in subdirectories with local instructions?

**Output:**
```
Conventions:
- <Pattern>: <how it's done here>
- <Pattern>: <how it's done here>
```

──────────

## Phase 4: Identify Dependencies (2 min)

Map what this project depends on and what could break.

For code projects:
```bash
grep -r "process.env" --include="*.ts" -l | head -10
npm audit 2>/dev/null | head -20
```

For any project:
- What external systems, services, or teams does this connect to?
- What credentials, environment variables, or access is required?
- What would cause this to stop working?

**Output:**
```
External dependencies:
- <Service>: <purpose>

Required config/credentials:
- <VAR_NAME>: <what it's for>
```

──────────

## Phase 5: Development Workflow (2 min)

Understand how to run, test, and ship work.

```bash
cat package.json | jq '.scripts' 2>/dev/null
cat Makefile 2>/dev/null | head -30
```

Also check:
- How is work reviewed? (PRs, approvals, checklists)
- How is work deployed or published?
- Are there CI/CD configs or GitHub Actions?

**Output:**
```
Workflow:
- Dev: <command>
- Test: <command>
- Lint: <command>
- Deploy: <process>
```

──────────

## Phase 6: Summary

Produce a reference document for this session:

```markdown
# Project: <name>

## Quick Start
<how to run it>

## Architecture
<key layers and their paths>

## Conventions
<patterns to follow>

## External Dependencies
<integrations and required config>

## Workflow
<how to develop, test, ship>
```

End with:

```
Ready to work.

Key things I learned:
1. <most important insight>
2. <second insight>
3. <third insight>

Questions before proceeding:
- <ambiguities worth surfacing>
```

──────────

## Focus Areas

When a focus is provided, prioritise that area in Phases 2–4:

| Focus | Explore |
|-------|---------|
| `auth` | Authentication flow, session handling, permissions |
| `api` | Route structure, middleware, request/response patterns |
| `data` | Database schema, migrations, queries |
| `tests` | Test setup, mocking patterns, coverage |
| `deploy` | CI/CD, environment configs, build process |

## Critical Rules

1. **Explore before acting** — never write code or take action before completing at least Phases 1–3
2. **Follow existing conventions** — document what exists before proposing alternatives
3. **Surface ambiguities** — flag anything unclear rather than assuming
4. **Read key files, don't skim** — actually open and read them; don't guess from filenames

## Integration

- Use before: any implementation task in an unfamiliar project
- Pairs with: `/interview` — onboard to understand the project, then interview to clarify requirements
- Pairs with: `/closedown` — closedown writes the PICKUP file and session notes that Phase 0 reads on return; the two skills form the open/close loop for every session
