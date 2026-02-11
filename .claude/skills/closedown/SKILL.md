---
name: closedown
description: End-of-session workflow that captures context, documents decisions, and prepares handoff for the next session. Ensures continuity across sessions and preserves institutional knowledge.
---

# Session Closedown

End sessions with **intentional handoff**, not abrupt stops.

```
Summarize → Preserve context → Prepare handoff → Cleanup → Setup next session
```

## When to Use

**Trigger signals:**
- "I'm done for today"
- "Let's wrap up"
- "Save this for tomorrow"
- "Hand this off to [person/future me]"
- End of a significant work block
- Before context window compression

**Use when:**
- Ending a multi-hour session
- Switching contexts to different project
- Handing work to another team member
- Before a meeting/break where you'll lose context
- Reaching a natural stopping point

## Arguments

```
/closedown [optional: handoff target]
```

Handoff targets: `self` (default) | `team` | `[person name]` | `archive`

## Workflow

### Phase 1: Session Summary (2 min)

**Capture what happened:**

```
Session: [Date] [Time range]
Focus: [Primary topic/task]

Accomplished:
- [x] [Completed task 1]
- [x] [Completed task 2]
- [ ] [In-progress task] — [current state]

Decisions Made:
| Decision | Rationale | Reversible? |
|----------|-----------|-------------|
| [Choice] | [Why] | Yes/No |

Discoveries:
- [Unexpected finding that matters]
- [Gotcha to remember]
```

**Key questions to answer:**
- What was the goal when we started?
- What did we actually accomplish?
- What changed from the original plan?
- What do we know now that we didn't before?

──────────

### Phase 2: Context Preservation (3 min)

**Save critical context that would be lost:**

#### 2a: Update Memory Files

Check for and update relevant context files:

```bash
# Check for existing context files
ls -la CLAUDE.md .claude/*.md *.context.md 2>/dev/null
```

**If CLAUDE.md exists, consider adding:**
- New conventions discovered
- Gotchas that caused problems
- Shortcuts that worked well

**If project-specific notes needed:**
Create `SESSION-[date].md` or update `CONTEXT.md`

#### 2b: Document Key Learnings

```
Learnings to Preserve:

Technical:
- [Code pattern that worked/failed]
- [Configuration insight]
- [Dependency quirk]

Process:
- [Workflow improvement]
- [Tool that helped]
- [Approach to avoid]

Domain:
- [Business rule clarified]
- [Stakeholder preference]
- [Constraint discovered]
```

#### 2c: Capture Unfinished Work State

For each in-progress task:

```
Task: [Name]
State: [Exactly where we left off]
File: [Current file and line if applicable]
Next step: [Very specific next action]
Blockers: [What's preventing completion]
Context needed: [What future-you needs to know]
```

──────────

### Phase 3: Handoff Preparation (3 min)

**Create clear next actions:**

#### 3a: Prioritized Action List

```
Next Session Priorities:

MUST DO (blockers/deadlines):
1. [ ] [Action] — [Why urgent]

SHOULD DO (important):
2. [ ] [Action]
3. [ ] [Action]

COULD DO (if time):
4. [ ] [Action]

DEFER (consciously postponed):
- [Item] — revisit [when/why]
```

#### 3b: Open Questions

```
Unresolved Questions:
- [ ] [Question] — need input from [who]
- [ ] [Question] — requires [research/decision]

Assumptions Made:
- [Assumption] — verify with [who/how]
```

#### 3c: Dependencies & Blockers

```
Waiting On:
- [Item] from [person/system] — expected [when]

Blocking Others:
- [Person] needs [deliverable] by [when]
```

#### 3d: Handoff-Specific Content

**If handoff target is `team` or specific person:**

```
Handoff to: [Name/Team]

Context they need:
- [Background summary]
- [Where to find things]
- [Who to ask about what]

What they should do:
1. [Specific action]
2. [Specific action]

What to avoid:
- [Known pitfall]
- [Don't touch this because...]

Questions they might have:
- Q: [Anticipated question]
  A: [Answer or where to find it]
```

──────────

### Phase 4: Cleanup (2 min)

**Tidy up the workspace:**

#### 4a: Code State

```bash
# Check git status
git status

# Check for uncommitted work
git diff --stat
```

**Decision tree:**
- Clean, tested code → Commit with clear message
- Work in progress → Commit to WIP branch or stash
- Experimental/broken → Stash with descriptive name
- Shouldn't be committed → Add to .gitignore or delete

**If committing:**
```bash
git add [specific files]
git commit -m "WIP: [clear description of state]

Session closedown [date]
- [What's done]
- [What's next]
- [Any warnings]"
```

#### 4b: Artifacts

```
Cleanup Checklist:
- [ ] Close unused browser tabs (or save to bookmarks)
- [ ] Stop running dev servers
- [ ] Archive/delete temporary files
- [ ] Move downloads to proper locations
- [ ] Clear sensitive data from clipboard
```

#### 4c: Logs & Debug

```bash
# If debug session was active
# Remove instrumentation
grep -rn "#region debug" --include="*.ts" --include="*.js"

# Archive useful logs
mv .debug/*.log ./logs/archive/ 2>/dev/null
```

──────────

### Phase 5: Next Session Setup (2 min)

**Make tomorrow-you's life easier:**

#### 5a: Create Pickup Context

Write a startup file for the next session:

**File: `PICKUP-[date].md`**

```markdown
# Pickup Context — [Date]

## Quick Start
Run this to get back to where we were:
```bash
[command to restore state]
```

## Last Session TL;DR
[2-3 sentences maximum]

## Continue From
- **File:** [path:line]
- **Task:** [specific task]
- **State:** [where exactly we stopped]

## First Action
[Single, specific next step — no decisions required]

## Key Context
- [Critical background item 1]
- [Critical background item 2]

## Don't Forget
- [ ] [Important thing that's easy to miss]
```

#### 5b: Prepare /standup Prompt

If you have a `/standup` command, prep its input:

```
Yesterday's carryover:
- [Task still in progress]

Today's priorities:
1. [First thing]
2. [Second thing]

Blockers to address:
- [Blocker]
```

#### 5c: Set Reminders (Optional)

```bash
# macOS reminder
osascript -e 'tell application "Reminders" to make new reminder with properties {name:"[task]", due date:date "[date time]"}'

# Or just note in calendar
echo "TODO: Add calendar block for [task]"
```

──────────

## Output Templates

### Quick Closedown (5 min)

For short sessions or natural stopping points:

```markdown
# Session Close — [Date]

**Done:** [1-2 sentences]
**Next:** [Single action]
**Note:** [One thing to remember]
```

### Standard Closedown (10 min)

```markdown
# Session Summary — [Date]

## Accomplished
- [Task 1]
- [Task 2]

## In Progress
- [Task] — stopped at [state]

## Decisions
- [Decision]: [rationale]

## Next Session
1. [ ] [First action]
2. [ ] [Second action]

## Open Questions
- [Question]

---
Files touched: [list]
Commit: [hash if applicable]
```

### Full Handoff (15 min)

```markdown
# Session Handoff — [Date]

## Executive Summary
[3-4 sentences: what, why, current state]

## Work Completed
| Task | Status | Notes |
|------|--------|-------|
| [Task] | Done | [Note] |
| [Task] | 80% | [What remains] |

## Decisions Made
| Decision | Options Considered | Choice | Rationale |
|----------|-------------------|--------|-----------|
| [Topic] | A, B, C | B | [Why] |

## Handoff Items

### Immediate Actions Required
1. [ ] [Action] — owner: [who] — due: [when]

### Context for Successor
- [Background they need]
- [Where to find resources]
- [Who to contact for what]

### Known Issues / Warnings
- [Issue]: [workaround or status]

### Open Questions Requiring Decision
- [ ] [Question] — decision needed by [when]

## Technical State
- Branch: [name]
- Last commit: [hash]
- Running processes: [none / list]
- Environment: [notes]

## Files Modified This Session
- [file]: [what changed]

---
Session duration: [X hours]
Prepared by: [name]
Handoff to: [name/team]
```

──────────

## Critical Rules

1. **NEVER end abruptly** — Even 2 minutes of closedown saves 20 minutes of context recovery
2. **NEVER assume you'll remember** — Write it down, future-you is a stranger
3. **ALWAYS specify the first next action** — Remove decision friction from startup
4. **ALWAYS commit or stash** — Uncommitted work is invisible and fragile
5. **ALWAYS note blockers** — They won't magically resolve themselves
6. **NEVER leave secrets exposed** — Clear clipboard, close sensitive tabs

## Quality Checklist

Before ending session:

- [ ] Summary captures what was accomplished
- [ ] Decisions are documented with rationale
- [ ] In-progress work state is clear and specific
- [ ] Next action is defined (no ambiguity)
- [ ] Open questions are captured
- [ ] Code is committed/stashed (nothing floating)
- [ ] Temporary files cleaned up
- [ ] Pickup context file created
- [ ] Sensitive data cleared

## Anti-Patterns

| Avoid | Instead |
|-------|---------|
| "I'll remember where I was" | Write specific file:line and next step |
| "It's obvious what to do next" | State it explicitly anyway |
| Leaving uncommitted changes | Commit WIP or stash with good message |
| Vague summaries ("worked on X") | Specific outcomes ("completed Y, blocked on Z") |
| Skipping cleanup | 2 min now saves 10 min debugging later |
| Giant context dumps | Focus on what's actionable |

## Integration with Other Skills

### After /research
```
Research completed: [topic]
Findings saved: [location]
Recommendation: [summary]
Next: Review with [stakeholder] before [action]
```

### After /debug
```
Bug status: [fixed/in-progress/blocked]
Root cause: [summary]
Instrumentation: [removed/still in place]
Logs archived: [location]
```

### Before /standup
```
Carryover prepared for standup:
- [Yesterday's incomplete items]
- [Today's priorities from closedown]
```

## Session Continuity Tips

### For Self-Handoff (Next Day)
- Write as if explaining to a colleague
- Include the "why" not just the "what"
- Note your energy/focus level if relevant to approach

### For Team Handoff
- Over-communicate context
- List specific files and line numbers
- Include "stupid questions" they might have
- Provide escalation contacts

### For Archive (Long-term)
- Focus on decisions and rationale
- Link to relevant documents/tickets
- Note what succeeded and what didn't
- Make it searchable (good keywords)

──────────

## Example Closedown

```markdown
# Session Summary — 2026-02-10

## Accomplished
- Created /research skill with government funding deep dive
- Updated .claude/README.md with new skill documentation
- Onboarded .claude directory structure

## Decisions
- Separated private vs govt funding in research workflow (different sources, compliance needs)
- Added NZ-specific funding sources (TEC, Callaghan Innovation)

## In Progress
- Closedown skill creation — 90% complete, needs testing

## Next Session
1. [ ] Test /closedown with a real session end
2. [ ] Add /standup command for session startup
3. [ ] Review proposed skills list with team

## Open Questions
- Should /research auto-save to a specific directory?
- Add hooks for auto-closedown on idle?

## Learnings
- Skills need YAML frontmatter for Claude to discover them
- Existing patterns in debug skill are good templates

---
Files modified: 3
Branch: main
Commit: pending (this closedown)
```
