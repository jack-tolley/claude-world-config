---
name: interview
description: Conduct a structured interview to transform a vague idea into a complete specification. Use when requirements are unclear, when starting a new project or feature, or when you need to surface hidden assumptions before building.
argument-hint: "[software|research] [optional: initial idea]"
model: opus
---

# Interview

Surface assumptions before they become problems.

```
Detect type → Problem & users → Scope & constraints → Technical decisions → Edge cases → Success criteria → Write spec
```

## When to Use

**Trigger signals:**
- "I have an idea for..."
- "We need to build something that..."
- Requirements feel vague or incomplete
- About to start a project without a clear spec
- "Interview me about..."

**Use for:**
- Turning a rough idea into a buildable specification
- Surfacing hidden constraints before implementation begins
- Research projects that need a clear question and methodology
- Any situation where ambiguity would cause expensive rework

## Arguments

```
/interview software "build a task management app"
/interview research "investigate LLM hallucination patterns"
/interview          # Auto-detect type, ask for idea
```

──────────

## Phase 0: Setup (1 min)

Determine project type from argument or ask. Get the initial idea if not provided.

```
Project type?
- Software: Building an application, feature, or tool
- Research: Investigating a question, analysing data, writing a report
```

──────────

## SOFTWARE PROJECT INTERVIEW

### Phase 1: Problem & Users (3–5 questions)

**Goal:** Understand the problem before jumping to solutions.

Use AskUserQuestion — one question at a time. Good questions:
- "What problem does this solve? Who has this problem today?"
- "How do people currently solve this? What's painful about that?"
- "Who is the primary user? Are there secondary users with different needs?"
- "What's the cost of NOT building this?"
- "Is this a vitamin (nice to have) or painkiller (must have)?"

**Output:**
```
Problem: <what's broken or missing>
Users: Primary — <description>; Secondary — <description>
Current alternatives: <how people solve this today>
```

──────────

### Phase 2: Scope & Constraints (4–6 questions)

**Goal:** Define boundaries before they become surprises.

Good questions:
- "What's the smallest version that would be useful? (MVP)"
- "What's explicitly OUT of scope for v1?"
- "Are there hard deadlines, budget limits, or team constraints?"
- "What existing systems must this integrate with?"
- "Are there compliance/regulatory requirements? (GDPR, HIPAA, SOC2)"
- "What's the expected scale? 10 users or 10 million?"

**Output:**
```
MVP: <smallest useful thing>
Out of scope (v1): <deferred>
Constraints: <technical, business, regulatory>
```

──────────

### Phase 3: Technical Decisions (4–6 questions)

**Goal:** Surface architectural tradeoffs early.

Good questions:
- "Should this fail fast or retry with backoff? Why?"
- "Real-time sync or eventual consistency? What's the tolerance for stale data?"
- "Where does the source of truth live? What happens if it's unavailable?"
- "Offline support needed? What happens when reconnecting?"
- "What's the authentication model? Who can access what?"
- "What's the data retention policy? Can users delete their data?"

**Output:**
```
Key decisions:
| Decision | Choice | Rationale |
```

──────────

### Phase 4: Edge Cases & Failure Modes (3–5 questions)

**Goal:** Plan for what goes wrong before it does.

Good questions:
- "What happens when [critical operation] fails halfway through?"
- "How should the system behave under 10x normal load?"
- "What's the recovery path if data gets corrupted?"
- "What abuse scenarios should we defend against?"

**Output:**
```
Error handling: <strategy>
Abuse scenarios: <risks and mitigations>
```

──────────

### Phase 5: Success Criteria (2–3 questions)

**Goal:** Define what "done" looks like.

Good questions:
- "How will you know this is successful? What metrics?"
- "What would make you consider this a failure worth abandoning?"
- "What's the first thing you'll test when it's built?"

**Output:**
```
Success metrics: <measurable criteria>
Acceptance criteria: <what done looks like>
```

──────────

## RESEARCH PROJECT INTERVIEW

### Phase 1: Research Question (3–5 questions)

**Goal:** Sharpen the question before investigating.

Good questions:
- "What's the core question you're trying to answer?"
- "Why does this question matter? Who cares about the answer?"
- "What would change if you found the answer?"
- "Is this exploratory (what's happening?) or confirmatory (is X true?)?"
- "What's your current hypothesis, if any?"

**Output:**
```
Research question: <clear, focused question>
Hypothesis: <if applicable>
Significance: <why this matters>
```

──────────

### Phase 2: Scope & Boundaries (3–5 questions)

**Goal:** Define what's in and out of the investigation.

Good questions:
- "What time period, geography, or population does this cover?"
- "What's explicitly NOT part of this research?"
- "What level of certainty do you need? Directional insight or statistical proof?"

**Output:**
```
In scope: <included>
Out of scope: <excluded>
```

──────────

### Phase 3: Methodology (4–6 questions)

**Goal:** Plan how to find answers.

Good questions:
- "What data sources will you use? How reliable are they?"
- "Qualitative (interviews, observations) or quantitative (metrics, surveys)?"
- "What's your sample size? Is it representative?"
- "What would falsify your hypothesis?"

**Output:**
```
Approach: <qualitative/quantitative/mixed>
Data sources: <list>
```

──────────

### Phase 4: Biases & Limitations (3–4 questions)

**Goal:** Acknowledge weaknesses before critics do.

Good questions:
- "What biases might affect this research? (confirmation, selection, survivorship)"
- "What data would you ideally have but don't?"
- "Who might disagree with your approach? What would they say?"

**Output:**
```
Known limitations: <gaps>
Bias mitigations: <strategies>
```

──────────

### Phase 5: Output & Audience (2–3 questions)

**Goal:** Define the deliverable.

Good questions:
- "Who is the primary audience for this research?"
- "What format should the output take? (report, presentation, data)"
- "What decisions will this research inform?"

**Output:**
```
Format: <report/presentation/data>
Audience: <who>
Intended use: <what decisions this informs>
```

──────────

## Generating the Specification

When the interview is complete, generate a spec file.

**Software:** `SPEC-{feature-name}.md`

```markdown
# Specification: {Feature Name}

## Problem Statement
{Who has this problem, why it matters}

## Users
- Primary: {description}
- Secondary: {description}

## Scope
### In Scope (MVP)
- {feature}

### Out of Scope (v1)
- {deferred}

## Constraints
- {technical, business, regulatory}

## Technical Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|

## Edge Cases & Error Handling
- {scenario}: {handling strategy}

## Success Criteria
- [ ] {measurable criterion}

## Open Questions
- {unresolved items}
```

**Research:** `RESEARCH-{topic}.md`

```markdown
# Research Plan: {Topic}

## Research Question
{Clear, focused question}

## Hypothesis
{If applicable}

## Scope
### In Scope
- {included}

### Out of Scope
- {excluded}

## Methodology
- Approach: {qualitative/quantitative/mixed}
- Data sources: {list}

## Limitations & Biases
- {limitation}: {mitigation}

## Deliverable
- Format: {report/presentation/data}
- Audience: {who}
```

──────────

## Critical Rules

1. **Ask, don't assume** — surface hidden assumptions through questions rather than guessing
2. **One question at a time** — use AskUserQuestion tool, not walls of text
3. **Challenge decisions** — "Why X instead of Y?" reveals constraints
4. **Write it down** — always generate the spec file when the interview is complete

## Interview Quality Checklist

Before generating spec, verify:
- [ ] Problem is clear (not just a solution)
- [ ] Users are identified (not "everyone")
- [ ] Scope has explicit boundaries
- [ ] Key tradeoffs are documented with rationale
- [ ] Edge cases are considered
- [ ] Success criteria are measurable

## Anti-Patterns

| Avoid | Instead |
|-------|---------|
| "What features do you want?" | "What problem are you solving?" |
| Assuming technical choices | "Why this stack? What tradeoffs?" |
| Accepting "all users" | "Who specifically? Primary vs secondary?" |
| Long multi-part questions | One focused question at a time |
| Leading questions | Open-ended, neutral framing |

## Integration

- Use after: `/onboard` — understand the project context before interviewing
- Use before: any implementation task where requirements are unclear
- Pairs with: `/skill-creator` — interview to clarify requirements before writing a skill
