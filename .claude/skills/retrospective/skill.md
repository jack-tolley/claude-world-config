---
name: retrospective
description: Structured team and individual reflection facilitator using proven retrospective formats. Captures insights, themes, and actionable improvements through guided questions and generates documented takeaways for continuous improvement.
---

# Team Retrospective Facilitator

Turn reflection into **action**, not just talk.

```
Choose format → Facilitate → Capture → Synthesize → Document → Track
```

## When to Use

**Trigger signals:**
- "Let's do a retro"
- "We need to reflect on [sprint/project/quarter]"
- "How can we improve our process?"
- "What went well/wrong with [initiative]?"
- End of sprint, project, milestone, or quarter

**Use when:**
- Ending sprints (Scrum/Agile teams)
- Completing projects or major initiatives
- Monthly/quarterly team reflections
- Post-incident reviews
- Individual weekly/monthly reflections
- After significant organizational changes

## Arguments

```
/retrospective [optional: format] [optional: context]
```

**Formats:**
- `start-stop-continue` (default) — Simple, effective
- `4ls` — Liked, Learned, Lacked, Longed For
- `sailboat` — Wind, anchor, rocks, island
- `mad-sad-glad` — Emotional state reflection
- `timeline` — Chronological event mapping
- `roses-thorns-buds` — Wins, challenges, opportunities
- `kalm` — Keep, Add, Less, More
- `personal` — Individual weekly reflection

**Context:** `sprint-X`, `project-name`, `q1-review`, etc.

## Workflow

### Phase 1: Format Selection & Setup (2 min)

#### Available Formats

| Format | Best For | Structure |
|--------|----------|-----------|
| **Start/Stop/Continue** | General retrospectives, teams new to retros | Start doing, Stop doing, Continue doing |
| **4Ls** | Learning-focused teams, post-training | Liked, Learned, Lacked, Longed For |
| **Sailboat** | Visual thinkers, identifying blockers | Wind (helping), Anchor (slowing), Rocks (risks), Island (goal) |
| **Mad/Sad/Glad** | Emotionally-aware teams, psychological safety building | Mad (frustrating), Sad (disappointing), Glad (celebrating) |
| **Timeline** | Complex projects, understanding sequence of events | Chronological: highs, lows, turning points |
| **Roses/Thorns/Buds** | Balancing wins and challenges | Roses (wins), Thorns (challenges), Buds (opportunities) |
| **KALM** | Action-oriented teams | Keep, Add, Less, More |
| **Personal** | Individual reflection, self-coaching | Wins, Learnings, Struggles, Next focus |

#### Setup Context

```
Retrospective Setup
- Format: [Selected format]
- Context: [Sprint/project/period being reflected on]
- Participants: [Individuals or team size]
- Mode: [Sync (live) / Async (written)]
- Duration: [Target time]
- Facilitator: Claude
```

**Choose mode:**
- **Sync (conversational):** Real-time Q&A, good for individuals or small teams
- **Async (written):** Batch input collection, good for distributed teams

──────────

### Phase 2: Facilitation (10-30 min)

#### 2a: Start/Stop/Continue Format

**Questions:**

1. **START** — What should we start doing?
   - What new practices would help us?
   - What are we not doing that we should be?
   - What experiments should we try?

2. **STOP** — What should we stop doing?
   - What's wasting our time?
   - What processes are broken?
   - What's causing frustration?

3. **CONTINUE** — What should we keep doing?
   - What's working well?
   - What gives us energy?
   - What should we protect?

**Facilitation approach:**
```
Use AskUserQuestion tool with multiSelect: true

Example:
- Question: "What should we START doing?"
- Options: Provide 3-4 common answers as suggestions
- Allow "Other" for custom input
```

#### 2b: 4Ls Format

**Questions:**

1. **LIKED** — What did you enjoy?
   - Moments you felt energized
   - Collaborative wins
   - Processes that flowed smoothly

2. **LEARNED** — What did you discover?
   - New skills or insights
   - Unexpected findings
   - "Aha!" moments

3. **LACKED** — What was missing?
   - Resources, tools, or information
   - Support or clarity
   - Time or capacity

4. **LONGED FOR** — What do you wish we had?
   - Dream state improvements
   - Aspirational changes
   - Future capabilities

#### 2c: Sailboat Format

**Questions (use visual framing):**

1. **ISLAND (Goal)** — Where are we trying to go?
   - What's our destination?
   - What does success look like?

2. **WIND (Helping)** — What's propelling us forward?
   - What's helping us move toward the goal?
   - What strengths can we leverage?

3. **ANCHOR (Slowing)** — What's holding us back?
   - What's dragging us down?
   - What inefficiencies slow us?

4. **ROCKS (Risks)** — What dangers are ahead?
   - What could derail us?
   - What external threats exist?

#### 2d: Mad/Sad/Glad Format

**Questions:**

1. **MAD** — What frustrated you?
   - Sources of anger or irritation
   - Repeated problems
   - Unmet expectations

2. **SAD** — What disappointed you?
   - Missed opportunities
   - Things that didn't go as hoped
   - Losses or setbacks

3. **GLAD** — What made you happy?
   - Wins to celebrate
   - Moments of pride
   - Positive surprises

**Facilitation note:** This format requires psychological safety. Use for mature teams only.

#### 2e: Personal Reflection Format

For individual weekly/monthly reflections:

**Questions:**

1. **WINS** — What am I proud of?
   - Accomplishments (big or small)
   - Skills demonstrated
   - Challenges overcome

2. **LEARNINGS** — What did I discover?
   - About myself, work, or others
   - Mistakes and lessons
   - Feedback received

3. **STRUGGLES** — What was hard?
   - Obstacles faced
   - Energy drains
   - Unmet goals

4. **NEXT FOCUS** — What's my priority?
   - What to improve
   - What to try
   - What to let go of

──────────

### Phase 3: Capture Responses (during facilitation)

**Real-time capture format:**

```markdown
## [Format Section Name]

### Responses

- [Participant 1]: [Response]
- [Participant 2]: [Response]
- [Participant 3]: [Response]

### Votes (if voting used)
- [Response A]: ⭐⭐⭐⭐⭐ (5 votes)
- [Response B]: ⭐⭐⭐ (3 votes)
```

**Anonymous option (async mode):**
```
Responses (anonymous):
- Response 1
- Response 2
- Response 3
```

──────────

### Phase 4: Synthesis & Themes (5 min)

**Identify patterns:**

Group similar responses into themes:

```
Themes Identified:

1. **[Theme Name]** (appeared X times)
   - Related responses: [list]
   - Severity: High / Medium / Low
   - Actionable: Yes / No

2. **[Theme Name]** (appeared Y times)
   ...
```

**Prioritization:**
- **High priority:** Affects entire team, actionable, high impact
- **Medium priority:** Affects subset, actionable, medium impact
- **Low priority:** Individual issues, less actionable, low impact

**Output:**
```markdown
## Key Themes

### High Priority
1. **[Theme]** — [Why it matters]
2. **[Theme]** — [Why it matters]

### Medium Priority
3. **[Theme]**
4. **[Theme]**

### Insights
- [Pattern observed]
- [Surprising finding]
- [Positive trend to reinforce]
```

──────────

### Phase 5: Action Items (5 min)

**Convert themes into actions:**

For each high-priority theme, create SMART action:

```
Action: [Clear, specific action]
Owner: [Person responsible]
Due: [Deadline]
Success metric: [How we'll know it's done]
```

**Action item template:**
```markdown
## Action Items

1. [ ] **[Action]**
   - Why: [Theme it addresses]
   - Owner: [Name/role]
   - Due: [Date]
   - Success: [Metric or outcome]
   - Status: Not started / In progress / Done

2. [ ] **[Action]**
   ...
```

**Example:**
```markdown
1. [ ] **Implement daily 15-min standup**
   - Why: Addresses "communication gaps" theme
   - Owner: Engineering Lead
   - Due: Start next sprint (Feb 20)
   - Success: Team reports feeling more connected (check in 2 weeks)
   - Status: Not started
```

**Action quality checklist:**
- [ ] Specific (not vague like "improve communication")
- [ ] Assigned owner (not "team" or "everyone")
- [ ] Has deadline
- [ ] Has success metric
- [ ] Addresses root cause, not symptom

──────────

### Phase 6: Documentation (3 min)

**Generate retrospective report:**

```markdown
# [Context] Retrospective — [Date]

**Format:** [Format used]
**Participants:** [Count or names]
**Facilitator:** Claude Code

---

## Summary

[2-3 sentence overview of the session]

---

## [Format Section 1]

### Responses
- [Response 1]
- [Response 2]
- [Response 3]

## [Format Section 2]

### Responses
...

---

## Key Themes

1. **[Theme]** — [Description]
2. **[Theme]** — [Description]

---

## Action Items

1. [ ] **[Action]**
   - Owner: [Name]
   - Due: [Date]
   - Success: [Metric]

2. [ ] **[Action]**
   ...

---

## Insights & Patterns

- [Observation 1]
- [Observation 2]

---

## Next Retrospective

**Scheduled:** [Date]
**Format:** [Suggested format based on this session]
**Focus areas:** [What to check on]

---

**Facilitated by Claude Code on [Date]**
```

**Save location:**
```bash
# Team retrospectives
docs/session-notes/retrospectives/YYYY-MM-DD-[context].md

# Personal reflections
docs/session-notes/personal/YYYY-MM-DD-reflection.md
```

──────────

### Phase 7: Follow-up Tracking (ongoing)

**Action item tracking:**

Create or update action tracker:

```markdown
# Retrospective Action Tracker

## Active Actions

| Action | Retrospective | Owner | Due | Status |
|--------|---------------|-------|-----|--------|
| [Action] | 2026-02-15 Sprint 23 | [Name] | Mar 1 | In progress |
| [Action] | 2026-02-15 Sprint 23 | [Name] | Feb 20 | Not started |

## Completed Actions

| Action | Retrospective | Owner | Completed | Outcome |
|--------|---------------|-------|-----------|---------|
| [Action] | 2026-02-01 Sprint 22 | [Name] | Feb 10 | [Result] |

## Abandoned Actions

| Action | Retrospective | Owner | Reason |
|--------|---------------|-------|--------|
| [Action] | 2026-01-15 Sprint 21 | [Name] | Deprioritized, context changed |
```

**Review cadence:**
- Check action status at start of each retrospective
- Archive completed actions
- Discuss abandoned actions (learn why)

──────────

## Templates

### Quick Personal Reflection (5 min)

```markdown
# Personal Reflection — [Date]

**Wins:**
- [1-3 wins this week]

**Learnings:**
- [1-3 things learned]

**Next week focus:**
- [1-3 priorities]
```

### Standard Team Retro (30 min)

Full workflow with:
- Format selection
- Facilitated questions
- Theme synthesis
- Action items
- Documentation

### Post-Incident Review (45 min)

Specialized format:

```markdown
# Incident Review — [Date]

**Incident:** [Name/ID]
**Impact:** [Severity and scope]
**Resolved:** [Date/time]

## Timeline
[Chronological events]

## What Went Well
- [Response strengths]

## What Went Wrong
- [Failures and gaps]

## Action Items (Blameless)
1. [ ] [Preventive action]
2. [ ] [Process improvement]
3. [ ] [Tool enhancement]

## Learnings
- [Key takeaway 1]
- [Key takeaway 2]
```

──────────

## Format Decision Tree

**New to retrospectives?**
→ Start/Stop/Continue (simple, effective)

**Focused on learning?**
→ 4Ls (Liked, Learned, Lacked, Longed For)

**Visual team?**
→ Sailboat (wind, anchor, rocks, island)

**Emotionally mature team?**
→ Mad/Sad/Glad (requires safety)

**Complex project just ended?**
→ Timeline (chronological mapping)

**Individual reflection?**
→ Personal format (wins, learnings, struggles, next)

**Want quick action focus?**
→ KALM (Keep, Add, Less, More)

**Balancing positives and negatives?**
→ Roses/Thorns/Buds

──────────

## Critical Rules

1. **ALWAYS create psychological safety** — No blame, no judgment
2. **ALWAYS generate action items** — Reflection without action is wasted
3. **ALWAYS assign owners** — "Team" ownership = no ownership
4. **ALWAYS document** — Context is lost without writing it down
5. **ALWAYS follow up** — Track actions, review in next retro
6. **NEVER skip celebration** — Acknowledge wins, not just problems
7. **NEVER let dominant voices take over** — Use async for equal input

## Anti-Patterns

| Avoid | Instead |
|-------|---------|
| Blame game | Focus on systems, not individuals |
| Vague actions ("communicate better") | Specific, measurable actions |
| Too many actions (10+) | Focus on 3-5 high-impact items |
| Same format every time | Rotate formats to keep fresh |
| No follow-up | Review actions in next retro |
| Skipping wins | Balance problems with celebrations |
| One-time event | Make retrospectives regular habit |

## Integration with Other Skills

### With /closedown
```
After retrospective:
- Save retro notes to docs/session-notes/retrospectives/
- Add action items to team todo tracker
- Schedule next retrospective
```

### With /research
```
Before retrospective:
- Research best practices for [team challenge]
- Find benchmarks for [process metric]
- Inform action items with evidence
```

## Output Example

```markdown
# Sprint 23 Retrospective — 2026-02-15

**Format:** Start/Stop/Continue
**Participants:** 6 (Engineering team)
**Facilitator:** Claude Code

---

## Summary

Productive retrospective focused on improving PR review speed and clarifying sprint goals. Team morale is high, with strong collaboration noted. Key improvement area: reduce context switching.

---

## START

### Responses
- Start using PR size limits (max 400 lines) — suggested by Alex
- Start having async pre-sprint planning (review stories before planning meeting) — suggested by Jordan
- Start tracking cycle time metrics — suggested by Sam

### Votes
- PR size limits: ⭐⭐⭐⭐⭐ (5 votes)
- Async pre-planning: ⭐⭐⭐⭐ (4 votes)
- Cycle time tracking: ⭐⭐ (2 votes)

## STOP

### Responses
- Stop accepting stories without acceptance criteria — suggested by Morgan
- Stop scheduling meetings during focus time (9-11am) — suggested by Taylor
- Stop working on multiple stories simultaneously — suggested by Alex

### Votes
- No meetings during focus time: ⭐⭐⭐⭐⭐⭐ (6 votes — unanimous!)
- Stories need acceptance criteria: ⭐⭐⭐⭐ (4 votes)
- One story at a time: ⭐⭐⭐ (3 votes)

## CONTINUE

### Responses
- Continue pair programming Fridays — love it! — suggested by Jordan
- Continue team lunches (great for bonding) — suggested by Sam
- Continue celebrating small wins in Slack — suggested by Taylor
- Continue detailed PR descriptions — makes reviews faster — suggested by Morgan

### Votes
- Pair programming Fridays: ⭐⭐⭐⭐⭐⭐ (6 votes)
- Team lunches: ⭐⭐⭐⭐⭐ (5 votes)
- Celebrating wins: ⭐⭐⭐⭐ (4 votes)
- Detailed PR descriptions: ⭐⭐⭐⭐ (4 votes)

---

## Key Themes

### High Priority
1. **Focus time protection** — Team unanimously wants uninterrupted morning blocks (9-11am). Context switching is killing productivity.
2. **PR size and review speed** — Large PRs are bottlenecks. Team wants size limits and better descriptions.

### Medium Priority
3. **Sprint planning quality** — Stories often lack clear acceptance criteria, leading to mid-sprint confusion.
4. **Work-in-progress limits** — Some engineers juggle too many stories, slowing delivery.

### Insights
- Pair programming Fridays are highly valued — protect this
- Team morale is strong; celebration culture is working
- PM/Engineering collaboration could be tighter (acceptance criteria issue)

---

## Action Items

1. [ ] **Block 9-11am as "Focus Time" in team calendar**
   - Why: Addresses context switching theme (unanimous vote)
   - Owner: Sam (Engineering Lead)
   - Due: Implement starting Monday Feb 19
   - Success: Zero recurring meetings scheduled in 9-11am slot; team reports better flow state
   - Status: Not started

2. [ ] **Implement PR size limit (400 lines max)**
   - Why: Addresses PR review speed theme
   - Owner: Alex
   - Due: Add to PR template and CI check by Feb 22
   - Success: 90% of PRs under 400 lines; review time drops from avg 3 days to 1.5 days
   - Status: Not started

3. [ ] **Create acceptance criteria template**
   - Why: Addresses sprint planning quality theme
   - Owner: Jordan (to work with PM)
   - Due: Ready for next sprint planning (Feb 26)
   - Success: 100% of stories have acceptance criteria before sprint starts
   - Status: Not started

4. [ ] **Experiment with WIP limits (max 2 stories per person)**
   - Why: Addresses work-in-progress theme
   - Owner: Taylor
   - Due: Try during next sprint, review in next retro
   - Success: Faster story completion; less thrashing
   - Status: Not started

---

## Next Retrospective

**Scheduled:** March 1, 2026 (end of Sprint 24)
**Format:** Try 4Ls (change it up for variety)
**Focus areas:**
- Check: Did focus time work?
- Check: Are PRs smaller and faster to review?
- Check: Do stories have clear acceptance criteria?
- Review: WIP limit experiment results

---

**Facilitated by Claude Code on 2026-02-15**
```
