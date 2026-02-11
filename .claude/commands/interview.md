---
description: Interview me to build a complete specification
argument-hint: "[software|research] [optional: initial idea]"
model: opus
---

# interview

Conduct a structured interview to transform a vague idea into a complete specification. Optimized for software projects and research projects.

## Arguments

```
/interview software "build a task management app"
/interview research "investigate LLM hallucination patterns"
/interview         # Auto-detect type, ask for idea
```

## Critical Rules

1. **ASK, DON'T ASSUME** - Surface hidden assumptions through questions
2. **ONE QUESTION AT A TIME** - Use AskUserQuestion tool, not walls of text
3. **NON-OBVIOUS QUESTIONS** - Skip "what color should the button be"
4. **CHALLENGE DECISIONS** - "Why X instead of Y?" reveals constraints
5. **WRITE IT DOWN** - Generate spec file when interview complete

## Interview Phases

### Phase 0: Setup

Determine project type from argument or ask:

```
Project type?
- Software: Building an application, feature, or tool
- Research: Investigating a question, analyzing data, writing a report
```

Get the initial idea if not provided.

---

## SOFTWARE PROJECT INTERVIEW

### Phase 1: Problem & Users (3-5 questions)

**Goal:** Understand the problem before jumping to solutions.

Example questions:
- "What problem does this solve? Who has this problem today?"
- "How do people currently solve this? What's painful about that?"
- "Who is the primary user? Are there secondary users with different needs?"
- "What's the cost of NOT building this?"
- "Is this a vitamin (nice to have) or painkiller (must have)?"

**Output:** Problem statement, user personas, current alternatives.

---

### Phase 2: Scope & Constraints (4-6 questions)

**Goal:** Define boundaries before they become surprises.

Example questions:
- "What's the smallest version that would be useful? (MVP)"
- "What's explicitly OUT of scope for v1?"
- "Are there hard deadlines, budget limits, or team constraints?"
- "What existing systems must this integrate with?"
- "Are there compliance/regulatory requirements? (GDPR, HIPAA, SOC2)"
- "What's the expected scale? 10 users or 10 million?"

**Output:** MVP definition, non-goals, constraints list.

---

### Phase 3: Technical Decisions (4-6 questions)

**Goal:** Surface architectural tradeoffs early.

Example questions:
- "Should this fail fast or retry with backoff? Why?"
- "Real-time sync or eventual consistency? What's the tolerance for stale data?"
- "Where does the source of truth live? What happens if it's unavailable?"
- "Offline support needed? What happens when reconnecting?"
- "What's the authentication model? Who can access what?"
- "What's the data retention policy? Can users delete their data?"

**Output:** Key technical decisions with rationale.

---

### Phase 4: Edge Cases & Failure Modes (3-5 questions)

**Goal:** Plan for what goes wrong before it does.

Example questions:
- "What happens when [critical operation] fails halfway through?"
- "How should the system behave under 10x normal load?"
- "What's the recovery path if data gets corrupted?"
- "What abuse scenarios should we defend against?"
- "What's the worst thing a malicious user could do?"

**Output:** Error handling strategy, abuse prevention plan.

---

### Phase 5: Success Criteria (2-3 questions)

**Goal:** Define what "done" looks like.

Example questions:
- "How will you know this is successful? What metrics?"
- "What would make you consider this a failure worth abandoning?"
- "What's the first thing you'll test when it's built?"

**Output:** Success metrics, acceptance criteria.

---

## RESEARCH PROJECT INTERVIEW

### Phase 1: Research Question (3-5 questions)

**Goal:** Sharpen the question before investigating.

Example questions:
- "What's the core question you're trying to answer?"
- "Why does this question matter? Who cares about the answer?"
- "What would change if you found the answer?"
- "Is this exploratory (what's happening?) or confirmatory (is X true?)?"
- "What's your current hypothesis, if any?"

**Output:** Clear research question, hypothesis, significance.

---

### Phase 2: Scope & Boundaries (3-5 questions)

**Goal:** Define what's in and out of the investigation.

Example questions:
- "What time period, geography, or population does this cover?"
- "What's explicitly NOT part of this research?"
- "Are there related questions you're intentionally deferring?"
- "What level of certainty do you need? Directional insight or statistical proof?"
- "What's the deadline? Does this need to be exhaustive or timely?"

**Output:** Scope definition, non-goals.

---

### Phase 3: Methodology (4-6 questions)

**Goal:** Plan how to find answers.

Example questions:
- "What data sources will you use? How reliable are they?"
- "Qualitative (interviews, observations) or quantitative (metrics, surveys)?"
- "What's your sample size? Is it representative?"
- "How will you handle conflicting evidence?"
- "What would falsify your hypothesis?"
- "Are there ethical considerations? IRB approval needed?"

**Output:** Research methodology, data sources.

---

### Phase 4: Biases & Limitations (3-4 questions)

**Goal:** Acknowledge weaknesses before critics do.

Example questions:
- "What biases might affect this research? (confirmation, selection, survivorship)"
- "What data would you ideally have but don't?"
- "What alternative explanations should you consider?"
- "Who might disagree with your approach? What would they say?"

**Output:** Known limitations, bias mitigation strategies.

---

### Phase 5: Output & Audience (2-3 questions)

**Goal:** Define the deliverable.

Example questions:
- "Who is the primary audience for this research?"
- "What format should the output take? (report, presentation, data)"
- "What decisions will this research inform?"

**Output:** Deliverable format, audience, intended use.

---

## Interview Execution

### Using AskUserQuestion

For each question, use the AskUserQuestion tool:

```
Question: "What's the smallest version that would be useful?"

Options:
1. "Basic CRUD with no auth" - Simplest possible, prove the concept
2. "Single-user with local storage" - No backend needed
3. "Multi-user with accounts" - Full system from day one
4. (Other) - Custom response
```

### Probing Deeper

When answers are vague, probe:
- "Can you give me a specific example?"
- "What would that look like in practice?"
- "How would you prioritize if you could only pick two?"
- "What's driving that preference?"

### Challenging Assumptions

When detecting assumptions, surface them:
- "You mentioned X—is that a hard requirement or a preference?"
- "Why X instead of Y? What tradeoffs are you making?"
- "What if that constraint didn't exist?"

---

## Generating the Specification

When interview is complete, generate a spec file:

**For Software:** `SPEC-{feature-name}.md`

```markdown
# Specification: {Feature Name}

## Problem Statement
{Who has this problem, why it matters}

## Users
- Primary: {description}
- Secondary: {description}

## Scope
### In Scope (MVP)
- {feature 1}
- {feature 2}

### Out of Scope (v1)
- {deferred feature}

## Constraints
- {technical, business, regulatory constraints}

## Technical Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Auth model | JWT | Stateless, works offline |
| Data sync | Eventual consistency | Simpler, acceptable lag |

## Edge Cases & Error Handling
- {scenario}: {handling strategy}

## Success Criteria
- [ ] {measurable criterion}
- [ ] {measurable criterion}

## Open Questions
- {unresolved items for future discussion}
```

**For Research:** `RESEARCH-{topic}.md`

```markdown
# Research Plan: {Topic}

## Research Question
{Clear, focused question}

## Hypothesis
{If applicable}

## Significance
{Why this matters, who cares}

## Scope
### In Scope
- {included}

### Out of Scope
- {excluded}

## Methodology
- Approach: {qualitative/quantitative/mixed}
- Data sources: {list}
- Sample: {size, selection criteria}

## Limitations & Biases
- {known limitation}
- Mitigation: {strategy}

## Deliverable
- Format: {report, presentation, data}
- Audience: {who}
- Timeline: {deadline}

## Open Questions
- {unresolved items}
```

---

## Interview Quality Checklist

Before generating spec, verify:

- [ ] Problem is clear (not just solution)
- [ ] Users are identified (not "everyone")
- [ ] Scope has explicit boundaries
- [ ] Key tradeoffs are documented with rationale
- [ ] Edge cases are considered
- [ ] Success criteria are measurable
- [ ] Constraints are surfaced

---

## Anti-Patterns

| Avoid | Instead |
|-------|---------|
| "What features do you want?" | "What problem are you solving?" |
| "Should it be blue or green?" | "What matters most to users?" |
| Assuming technical choices | "Why this stack? What tradeoffs?" |
| Accepting "all users" | "Who specifically? Primary vs secondary?" |
| Long multi-part questions | One focused question at a time |
| Leading questions | Open-ended, neutral framing |

---

## Ending the Interview

When sufficient clarity is reached:

1. Summarize key decisions made
2. List any open questions remaining
3. Generate the specification file
4. Ask: "Does this capture your intent? Anything to add or change?"

Save spec to project root or designated docs folder.
