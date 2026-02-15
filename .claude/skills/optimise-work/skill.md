---
name: optimise-work
description: Workflow optimization assistant that identifies time-consuming tasks, researches automation opportunities, and generates practical implementation plans. Helps individuals and teams work smarter by systematically analyzing current workflows and recommending high-ROI improvements.
---

# Workflow Optimization Assistant

Work smarter, not harder — **automate the automatable**.

```
Map current state → Identify pain points → Research solutions → Prioritize by ROI → Implement or prototype
```

## When to Use

**Trigger signals:**
- "This takes too much time"
- "I keep doing this over and over"
- "There must be a better way"
- "How can I streamline [process]?"
- "I want to automate [task]"
- "I'm spending too much time on [activity]"

**Use when:**
- Feeling overwhelmed by repetitive tasks
- Onboarding to new role (identify quick wins)
- Quarter/year planning (strategic efficiency gains)
- Team complaining about process overhead
- Noticing bottlenecks in workflows
- Exploring productivity improvements

## Arguments

```
/optimise-work [optional: focus-area]
```

**Focus areas:**
- `time-audit` — Where does time actually go?
- `automation` — What can be automated?
- `tools` — Are we using the right tools?
- `delegation` — What should I stop doing?
- `processes` — How can we streamline workflows?

## Workflow

### Phase 1: Current State Mapping (5 min)

**Understand what you're actually doing:**

Use structured interview to capture:

```
Work Inventory:

Daily Activities:
- [Activity]: [Time spent] — [Frequency]
- [Activity]: [Time spent] — [Frequency]

Weekly Activities:
- [Activity]: [Time spent] — [Frequency]

Monthly Activities:
- [Activity]: [Time spent] — [Frequency]

Ad-hoc/Reactive:
- [Activity]: [Estimated time]
```

**Questions to ask:**

1. **What are your primary responsibilities?**
   - Revenue generation
   - Team management
   - Operations/admin
   - Strategic planning
   - Technical work
   - Customer-facing

2. **What tasks consume the most time?**
   - Email/communication
   - Meetings
   - Reporting
   - Data entry/admin
   - Planning/coordination
   - Firefighting/issues

3. **What tasks are most repetitive?**
   - Done daily/weekly without variation
   - Same steps every time
   - Could be checklist-driven

4. **What feels like a waste of time?**
   - Low-value activities
   - Waiting on others
   - Rework due to poor process
   - Manual data wrangling

**Output:**
```markdown
## Current State

### Time Allocation (Weekly)
- Meetings: 12 hours
- Email/Slack: 8 hours
- Reporting: 4 hours
- Strategic work: 6 hours
- Firefighting: 5 hours
- Admin/misc: 5 hours

**Total:** 40 hours

### Pain Points (Ranked by frustration)
1. [Pain point] — [Why frustrating]
2. [Pain point] — [Why frustrating]
3. [Pain point] — [Why frustrating]
```

──────────

### Phase 2: Pain Point Analysis (5 min)

**For each pain point, analyze:**

```
Pain Point: [Name]

Frequency: [Daily / Weekly / Monthly]
Time per occurrence: [X minutes/hours]
Total time cost: [Frequency × Time]

Why is this painful?
- [ ] Repetitive/boring
- [ ] Requires manual data entry
- [ ] Context switching
- [ ] Waiting on others
- [ ] Unclear process
- [ ] Poor tooling
- [ ] Unnecessary complexity

Root cause: [Why does this exist?]
Impact if eliminated: [What would change?]
```

**Categorize by type:**

| Type | Characteristics | Examples |
|------|-----------------|----------|
| **Automatable** | Same steps every time, rules-based | Data exports, report generation, email responses |
| **Delegatable** | Someone else could do this | Calendar management, basic research, data entry |
| **Eliminatable** | Doesn't need to happen at all | Unnecessary meetings, reports no one reads, redundant approvals |
| **Optimizable** | Must happen but could be streamlined | Onboarding, expense approvals, code reviews |
| **Strategic** | High-value work being crowded out | Planning, relationship building, creative work |

**Output:**
```markdown
## Pain Point Analysis

### Automatable (High Potential)
1. **Weekly metrics report** — 2 hrs/week, repetitive data gathering
2. **Invoice processing** — 1 hr/week, manual data entry
3. **Meeting notes distribution** — 30 min/week, copy-paste work

### Delegatable
4. **Email triage** — 3 hrs/week, could use EA/admin support
5. **Calendar scheduling** — 1 hr/week, back-and-forth emails

### Eliminatable
6. **Status update meetings** — 2 hrs/week, async would work
7. **Duplicate reporting** — 1 hr/week, consolidate sources

### Optimizable
8. **Code review process** — 4 hrs/week, needs clearer guidelines
9. **Onboarding new hires** — 8 hrs/month, needs templates

### Strategic Work (Being Crowded Out)
- Product strategy: Should be 8 hrs/week, currently 2 hrs/week
- Team coaching: Should be 4 hrs/week, currently 1 hr/week
```

──────────

### Phase 3: Solution Research (10 min)

**For each high-impact pain point, research solutions:**

Use `/research` skill for deeper dives:
```
/research [pain point] automation
/research [pain point] tools
```

**Research framework:**

```
Pain Point: [Name]

Solution Categories:
1. **Automation**
   - Scripts/code
   - No-code tools (Zapier, Make, n8n)
   - AI assistants
   - Browser extensions

2. **Tools/Software**
   - Specialized tools for this task
   - Better alternatives to current tools
   - Integrations between existing tools

3. **Process Changes**
   - Reorder steps for efficiency
   - Batch processing
   - Templates/checklists
   - Delegation/responsibility shifts

4. **Elimination**
   - Question: Does this need to happen?
   - Alternative: What if we just stopped?
   - Risk: What's the worst that happens?

Existing Solutions Found:
- [Tool/approach 1]: [Pros/cons/cost]
- [Tool/approach 2]: [Pros/cons/cost]
- [Tool/approach 3]: [Pros/cons/cost]
```

**Examples by pain point type:**

| Pain Point | Solution Type | Example |
|------------|---------------|---------|
| Weekly metrics report | Automation | Script that pulls from APIs, generates report, emails to stakeholders |
| Email triage | AI + Rules | AI categorizes, rules auto-archive/forward, you handle only important |
| Status meetings | Process change | Replace with async written updates in Slack/Notion |
| Invoice processing | Tool + Integration | Accounting software with OCR and approval workflow |
| Onboarding | Templates + Automation | Notion template + automated welcome emails and provisioning |

**Output:**
```markdown
## Solution Research

### 1. Weekly Metrics Report (2 hrs/week saved)

**Current:** Manually pulling data from 3 systems, copy-pasting into slides

**Solutions:**
- **Option A:** Python script + scheduled job
  - Pros: Free, customizable, runs automatically
  - Cons: Requires coding, maintenance
  - Effort: 4 hours to build, 1 hour/quarter to maintain
  - ROI: Pays back in 2 weeks

- **Option B:** Power BI / Tableau dashboard
  - Pros: Professional, interactive, self-service
  - Cons: License cost ($70/mo), learning curve
  - Effort: 8 hours to set up, minimal maintenance
  - ROI: Pays back in 1 month

- **Option C:** Zapier + Google Sheets + email
  - Pros: No-code, quick to set up
  - Cons: Limited data transformation, ongoing cost ($20/mo)
  - Effort: 2 hours to set up, minimal maintenance
  - ROI: Pays back in 1 week

**Recommendation:** Start with Option C (quick win), migrate to Option A later for full control
```

──────────

### Phase 4: ROI Prioritization (5 min)

**Calculate return on investment for each solution:**

```
ROI Formula:
- Time saved per week: [X hours]
- Annual time saved: [X hours × 52 weeks]
- Value of time: [Hourly rate or opportunity cost]
- Annual value: [Time saved × Value]
- Implementation effort: [Hours to build/deploy]
- Ongoing maintenance: [Hours per year]
- Tool costs: [Annual cost]
- Net benefit: [Annual value - Effort - Cost]
- Payback period: [Effort + Cost] / [Weekly value]
```

**Prioritization matrix:**

| Solution | Time Saved/Week | Annual Value | Effort (hrs) | Cost/Year | Payback Period | Priority |
|----------|-----------------|--------------|--------------|-----------|----------------|----------|
| Metrics automation | 2 hrs | $10,400 | 2 hrs | $240 | 1 week | **HIGH** |
| Email triage AI | 3 hrs | $15,600 | 4 hrs | $300 | 2 weeks | **HIGH** |
| Status meeting → async | 2 hrs | $10,400 | 1 hr | $0 | Immediate | **HIGH** |
| Onboarding templates | 2 hrs/mo | $2,500 | 8 hrs | $0 | 4 months | **MEDIUM** |
| Code review guidelines | 1 hr | $5,200 | 6 hrs | $0 | 6 weeks | **MEDIUM** |

**Prioritize by:**
1. **Quick wins** — High value, low effort (do first)
2. **Major projects** — High value, high effort (schedule)
3. **Fill-ins** — Medium value, low effort (when time permits)
4. **Defer** — Low value (don't bother)

**Output:**
```markdown
## Optimization Roadmap

### Immediate (This Week)
1. **Replace status meetings with async updates** — 0 effort, 2 hrs/week saved
2. **Set up email triage automation** — 2 hrs effort, 3 hrs/week saved

### Short-term (This Month)
3. **Automate metrics report** — 2 hrs effort, 2 hrs/week saved
4. **Create onboarding template** — 8 hrs effort, 2 hrs/month saved

### Long-term (This Quarter)
5. **Implement code review guidelines** — 6 hrs effort, 1 hr/week saved
6. **Migrate to BI dashboard** — 8 hrs effort, enables self-service

### Defer
- [Low-value optimizations]
```

──────────

### Phase 5: Implementation or Prototyping (variable)

**For immediate/quick wins:**

**Option A: Implement Now**

If solution is straightforward (script, template, process change):
1. Build/configure the solution
2. Test with real data/scenario
3. Document usage
4. Share with stakeholders
5. Schedule review in 2 weeks

**Option B: Prototype**

If solution is complex or uncertain ROI:
1. Build minimal viable version
2. Use for 1-2 weeks
3. Measure actual time savings
4. Decide: expand, modify, or abandon

**Option C: Research & Plan**

If solution requires significant investment:
1. Create detailed implementation plan
2. Get stakeholder buy-in
3. Allocate dedicated time
4. Track as project with milestones

**Implementation checklist:**
- [ ] Solution built/configured
- [ ] Tested with real scenario
- [ ] Documented (how to use, how to maintain)
- [ ] Stakeholders notified/trained
- [ ] Monitoring in place (measure time saved)
- [ ] Review scheduled (validate ROI)

──────────

### Phase 6: Measurement & Iteration (ongoing)

**Track impact:**

```markdown
# Optimization Tracker

## Active Optimizations

| Optimization | Implemented | Expected Savings | Actual Savings | Status |
|--------------|-------------|------------------|----------------|--------|
| Metrics automation | 2026-02-15 | 2 hrs/week | [TBD - measure] | Testing |
| Async status updates | 2026-02-10 | 2 hrs/week | 1.5 hrs/week | Working |

## Lessons Learned

| Optimization | Outcome | Lesson |
|--------------|---------|--------|
| Email AI triage | Abandoned after 2 weeks | False positives too high; manual review still needed |
| Onboarding template | Success! | Saved 3 hrs on last hire; refine based on feedback |
```

**Review cadence:**
- **Weekly:** Check if optimizations are being used
- **Monthly:** Measure actual time savings vs. expected
- **Quarterly:** Identify new pain points as work evolves

**Iteration triggers:**
- Optimization isn't being used → Why? Make easier or eliminate
- Time savings less than expected → Root cause? Adjust or abandon
- New pain points emerging → New round of optimization

──────────

## Templates

### Quick Time Audit (5 min)

```markdown
# Time Audit — [Week of Date]

Where did my time actually go?

**Meetings:** [X hours]
- [Meeting type]: [Y hours]

**Email/Slack:** [X hours]

**Deep work:** [X hours]
- [Project]: [Y hours]

**Admin/overhead:** [X hours]

**Firefighting:** [X hours]

**Top 3 time wasters:**
1. [Activity] — [X hours]
2. [Activity] — [Y hours]
3. [Activity] — [Z hours]

**If I could eliminate one thing:** [Activity]
```

### Automation Opportunity Canvas

```markdown
# Automation Opportunity: [Task Name]

**Current Process:**
1. [Step]
2. [Step]
3. [Step]

**Pain Points:**
- [What's annoying/time-consuming]

**Automation Potential:**
- Repetitive? [Yes/No]
- Rules-based? [Yes/No]
- High volume? [Yes/No]

**Automation Approaches:**
- [ ] Script/code
- [ ] No-code tool (Zapier, Make)
- [ ] Existing software feature we're not using
- [ ] Process change (eliminate steps)

**Effort:** [Hours]
**Savings:** [Hours/week]
**Payback:** [Time]
```

### Meeting Audit Template

```markdown
# Meeting Audit

## Recurring Meetings

| Meeting | Frequency | Duration | Attendees | Value Score (1-5) | Could Be Async? |
|---------|-----------|----------|-----------|-------------------|-----------------|
| [Name] | Weekly | 1 hr | 6 people | 2/5 | Yes |
| [Name] | Weekly | 30 min | 3 people | 4/5 | No |

**Total weekly meeting time:** [X hours]

**Recommendations:**
- Cancel: [Low-value meetings]
- Make async: [Meetings that are just updates]
- Shorten: [Meetings that run over]
- Improve: [Meetings with unclear purpose]
```

──────────

## Domain-Specific Pain Points

### For Managers/Executives
- Meeting overload → Audit, async updates, delegate
- Email flood → Filters, rules, EA support
- Status reporting → Dashboards, automation
- Context switching → Time blocking, batch processing

### For Engineers
- Repetitive deployments → CI/CD automation
- Code review slowness → Guidelines, review reminders
- Manual testing → Automated test suites
- Environment setup → Docker, scripts, documentation

### For Operations
- Data entry → OCR, form automation, integrations
- Approval bottlenecks → Workflow automation, delegation
- Reporting → Scheduled reports, dashboards
- Inventory/tracking → Barcode systems, integrations

### For Sales/Marketing
- Lead follow-up → CRM automation, sequences
- Proposal creation → Templates, CPQ tools
- Social media posting → Scheduling tools, AI assistance
- Performance reporting → Analytics automation

──────────

## Critical Rules

1. **ALWAYS measure current state** — Can't optimize what you don't measure
2. **ALWAYS calculate ROI** — Time is money; prioritize high-return optimizations
3. **ALWAYS start with elimination** — The fastest task is one you don't do
4. **ALWAYS prototype before committing** — Test assumptions with minimal investment
5. **ALWAYS measure results** — Did the optimization actually save time?
6. **NEVER automate broken processes** — Fix first, then automate
7. **NEVER over-engineer** — Simple solutions beat perfect ones

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| Automating for automation's sake | Always check ROI first |
| Over-engineering solutions | Start simple, iterate if needed |
| Ignoring maintenance cost | Factor in ongoing effort |
| Not measuring actual impact | Track time saved, not just implemented |
| Automating broken processes | Optimize process first, then automate |
| Building instead of buying | Check if tool already exists |
| Optimizing the wrong thing | Focus on highest-impact pain points |

## Integration with Other Skills

### With /research
```
/research [pain point] automation
/research [tool category] tools
→ Find existing solutions before building
```

### With /closedown
```
After optimization session:
- Document: Optimizations implemented
- Next: Measure actual time savings
- Review: In 2 weeks, validate ROI
```

### With /interview
```
For team workflow optimization:
→ Interview team about pain points
→ Gather data on time spent
→ Prioritize by consensus
```

## Output Example

```markdown
# Workflow Optimization — Jack, General Manager

**Date:** 2026-02-15
**Focus:** Reduce admin overhead, reclaim strategic time

---

## Current State

### Time Allocation (Weekly Average)
- Meetings: 15 hours (38%)
- Email/Slack: 7 hours (18%)
- Reporting: 4 hours (10%)
- Firefighting: 5 hours (12%)
- Strategic work: 6 hours (15%)
- Admin/misc: 3 hours (7%)

**Total:** 40 hours

**Problem:** Only 15% on strategic work (should be 40%+)

---

## Top Pain Points

1. **Weekly metrics report** — 2 hrs/week
   - Manual data gathering from 3 systems
   - Copy-paste into slides, send email

2. **Recurring status meetings** — 3 hrs/week
   - 2 meetings that are just updates
   - Could be async Slack posts

3. **Email triage** — 7 hrs/week
   - Too much time in inbox
   - Reactive rather than proactive

4. **Ad-hoc reporting requests** — 2 hrs/week
   - Board/investors ask for data
   - Same data, different formats

5. **Meeting scheduling** — 1.5 hrs/week
   - Back-and-forth emails for availability

---

## Optimization Plan

### Immediate (This Week)

#### 1. Replace status meetings with async updates
- **Action:** Cancel 2 recurring meetings, ask for written Slack updates instead
- **Time saved:** 3 hrs/week
- **Effort:** 30 min (write new process, notify team)
- **Payback:** Immediate
- **Status:** ✅ Done (Feb 15)

#### 2. Set up Calendly for external scheduling
- **Action:** Create Calendly account, add to email signature
- **Time saved:** 1 hr/week
- **Effort:** 30 min
- **Payback:** Immediate
- **Status:** ⏳ Not started

### Short-term (This Month)

#### 3. Automate weekly metrics report
- **Action:** Build Zapier workflow (Google Sheets + Gmail)
- **Time saved:** 2 hrs/week
- **Effort:** 2 hrs to set up
- **Cost:** $20/mo
- **Payback:** 1 week
- **Status:** ⏳ Scheduled for Feb 20

#### 4. Implement email filters and rules
- **Action:** Set up Gmail filters for auto-archive, priority inbox
- **Time saved:** 2 hrs/week (reduce email time from 7 to 5 hrs)
- **Effort:** 1 hr
- **Payback:** Immediate
- **Status:** ⏳ Not started

### Long-term (This Quarter)

#### 5. Create self-serve metrics dashboard
- **Action:** Build Google Data Studio dashboard pulling from all systems
- **Time saved:** 2 hrs/week (ad-hoc requests)
- **Effort:** 8 hrs
- **Payback:** 1 month
- **Status:** 🗓️ Planned for March

#### 6. Hire part-time EA for admin support
- **Action:** Recruit for 10 hrs/week EA role
- **Time saved:** 5 hrs/week (email, calendar, admin)
- **Effort:** 10 hrs to recruit
- **Cost:** $5,000/year (10 hrs × $10/hr × 50 weeks)
- **Payback:** 3 weeks
- **Status:** 🤔 Under consideration

---

## Expected Impact

### Time Reclaimed
- Status meetings → async: **3 hrs/week**
- Metrics automation: **2 hrs/week**
- Email optimization: **2 hrs/week**
- Calendly: **1 hr/week**
- Ad-hoc reporting → dashboard: **2 hrs/week**

**Total:** **10 hrs/week** reclaimed for strategic work

### New Allocation Target
- Strategic work: 16 hrs (40%) ← was 6 hrs (15%)
- Meetings: 12 hrs (30%) ← was 15 hrs (38%)
- Email/Slack: 5 hrs (12%) ← was 7 hrs (18%)
- Reporting: 0 hrs (0%) ← was 4 hrs (10%)
- Firefighting: 5 hrs (12%)
- Admin/misc: 2 hrs (6%)

---

## Monitoring Plan

**Weekly check-in:**
- Are async updates working? (Check: Are people posting? Is info sufficient?)
- Is Calendly reducing scheduling time?
- Email time trending down?

**Monthly review:**
- Measure actual time savings
- Identify new pain points
- Adjust optimizations as needed

**Next optimization session:** March 15, 2026

---

**Optimized by Claude Code on 2026-02-15**
```
