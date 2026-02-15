---
name: policies-procedures
description: Full lifecycle policy and procedure management with automated research, consistent formatting, version control via GitHub, cross-posting to Notion, and drift detection. Ensures organizational documentation is evidence-based, compliant, and synchronized across platforms.
---

# Policy & Procedure Management

Transform organizational documentation from **scattered and stale** to **current and accessible**.

```
Research → Draft/Reformat → Review → Publish → Monitor
```

## When to Use

**Trigger signals:**
- "We need a policy for..."
- "Our [policy] needs updating"
- "Reformat these procedures to be consistent"
- "Are our GitHub and Notion policies in sync?"
- "Help me draft a procedure that meets [compliance standard]"

**Use when:**
- Creating new organizational policies
- Updating existing procedures
- Standardizing documentation format
- Publishing to GitHub and Notion
- Auditing for drift between platforms
- Ensuring compliance with regulations

## Arguments

```
/policies-procedures [action] [optional: policy-name]
```

**Actions:**
- `draft` — Create new policy/procedure
- `reformat` — Standardize existing documentation
- `publish` — Push to GitHub + Notion
- `audit` — Check GitHub ↔ Notion drift
- `review` — Assess policy for gaps/compliance

## Workflow

### Phase 1: Research & Requirements (5-10 min)

Use the `/research` skill to gather evidence:

```
/research [policy topic] compliance
```

**Required information:**
```
Policy Scope:
- Title: [Clear, specific name]
- Category: [HR / Finance / Operations / Compliance / Safety / IT]
- Applies to: [Who must follow this]
- Owner: [Responsible department/role]
- Review frequency: [Annual / Biannual / As needed]

Compliance Requirements:
- Legal/regulatory: [Applicable laws, standards]
- Industry standards: [ISO, OWASP, etc.]
- Organizational: [Internal governance requirements]

Stakeholders:
- Author: [Who writes]
- Reviewers: [Who reviews]
- Approvers: [Who approves]
- Audience: [Who reads]

References:
- Related policies: [List]
- External standards: [List]
- Templates: [Any mandated formats]
```

**Research checklist:**
- [ ] Identified legal/regulatory requirements
- [ ] Reviewed industry best practices
- [ ] Found 2+ comparable organization policies
- [ ] Confirmed compliance framework alignment
- [ ] Identified approval workflow
- [ ] Noted required review cycle

──────────

### Phase 2: Draft or Reformat (10-15 min)

#### 2a: Standard Policy Template

All policies follow this structure:

```markdown
# [Policy Title]

**Category:** [HR / Finance / Operations / Compliance / Safety / IT]
**Owner:** [Department/Role]
**Effective Date:** [Date]
**Review Date:** [Date]
**Version:** [X.Y.Z]

---

## Purpose

[1-2 sentences: Why this policy exists]

## Scope

**Applies to:** [Who/what this covers]
**Does not apply to:** [Explicit exclusions]

## Policy Statement

[Clear, unambiguous statement of the policy]

### Principles

1. [Key principle 1]
2. [Key principle 2]
3. [Key principle 3]

## Procedures

### [Process Name 1]

**Who:** [Role responsible]
**When:** [Triggering event or frequency]
**How:**

1. [Step 1]
   - Detail or example
2. [Step 2]
   - Detail or example
3. [Step 3]
   - Detail or example

**Expected outcome:** [What success looks like]

### [Process Name 2]

[Repeat structure]

## Roles & Responsibilities

| Role | Responsibility |
|------|----------------|
| [Role 1] | [What they do] |
| [Role 2] | [What they do] |

## Compliance & Monitoring

**Compliance requirements:**
- [Legal/regulatory requirement 1]
- [Standard/framework requirement 2]

**Monitoring approach:**
- [How compliance is verified]
- [Frequency of audits]
- [Reporting mechanism]

**Non-compliance consequences:**
- [Progressive discipline approach]

## Definitions

- **[Term]:** [Clear definition]
- **[Term]:** [Clear definition]

## Related Documents

- [Related Policy 1] — [Link]
- [Related Procedure 2] — [Link]
- [External Standard] — [Link]

## Revision History

| Version | Date | Changes | Approved By |
|---------|------|---------|-------------|
| 1.0.0 | [Date] | Initial creation | [Name] |

---

**Next review due:** [Date]
**Questions:** Contact [email/role]
```

#### 2b: Reformat Existing Policy

For reformatting:

1. Read existing policy
2. Extract content into standard template
3. Preserve substance, improve structure
4. Add missing sections (Scope, Definitions, Compliance)
5. Create revision history entry

**Reformatting rules:**
- Keep original intent intact
- Improve clarity and readability
- Add structure where missing
- Flag gaps requiring SME input
- Maintain version history

──────────

### Phase 3: Review & Quality Check (5 min)

**Quality checklist:**

- [ ] **Clear purpose** — Anyone can understand why it exists
- [ ] **Specific scope** — No ambiguity about who/what it covers
- [ ] **Actionable procedures** — Steps are concrete, not vague
- [ ] **Assigned responsibilities** — Clear who does what
- [ ] **Compliance mapped** — Requirements linked to standards
- [ ] **Plain language** — Jargon explained, sentences clear
- [ ] **Consistent format** — Matches template structure
- [ ] **Version controlled** — Has version number and history
- [ ] **Review date set** — Won't become stale

**Compliance review:**
```
Compliance Check:
- [ ] Legal requirements addressed
- [ ] Industry standards referenced
- [ ] Audit trail enabled
- [ ] Approval workflow followed
- [ ] Accessibility requirements met (WCAG if web-published)
```

**Readability review:**
- Flesch Reading Ease > 50 (target: 60+)
- Sentences < 25 words average
- Paragraphs < 5 sentences
- Active voice preferred
- Jargon minimized

──────────

### Phase 4: Publish to GitHub (5 min)

#### 4a: File Structure

Organize policies in GitHub:

```
policies/
├── README.md                    # Index of all policies
├── hr/
│   ├── code-of-conduct.md
│   ├── remote-work-policy.md
│   └── leave-policy.md
├── finance/
│   ├── expense-policy.md
│   └── procurement-policy.md
├── operations/
│   ├── data-retention-policy.md
│   └── incident-response.md
├── compliance/
│   ├── privacy-policy.md
│   └── security-policy.md
└── templates/
    └── policy-template.md
```

#### 4b: Commit to GitHub

```bash
# Navigate to policies repo
cd ~/policies  # or wherever policies are stored

# Create or update policy file
# (done via Write tool)

# Commit with semantic versioning
git add [category]/[policy-name].md
git commit -m "feat(hr): Add remote work policy v1.0.0

- Initial creation
- Based on research: [sources]
- Approved by: [name]
- Effective: [date]"

# Push to GitHub
git push origin main
```

**Commit message format:**
```
[type]([category]): [description]

Types: feat, fix, docs, refactor, chore
Categories: hr, finance, ops, compliance, it, safety
```

──────────

### Phase 5: Cross-post to Notion (5 min)

**Prerequisites:**
- Notion integration token in environment
- Notion database ID for policies

#### 5a: Convert Markdown to Notion Blocks

Notion uses block-based structure. Convert:
- `# Headings` → Heading blocks
- Paragraphs → Paragraph blocks
- Lists → Bulleted/numbered list blocks
- Tables → Table blocks
- Code blocks → Code blocks

#### 5b: Create or Update Notion Page

Use Notion API via custom script or manual sync:

**Manual sync workflow:**
1. Copy markdown content
2. Paste into Notion page
3. Add metadata properties:
   - Category (select)
   - Owner (person)
   - Effective Date (date)
   - Review Date (date)
   - Version (text)
   - Status (select: Draft/Active/Archived)
   - GitHub URL (url)

**Automated sync workflow (future):**
```bash
# Sync specific policy
python scripts/sync-to-notion.py --file hr/remote-work-policy.md

# Sync all policies
python scripts/sync-to-notion.py --all
```

──────────

### Phase 6: Audit for Drift (10 min)

Check if GitHub and Notion versions match.

#### 6a: List All Policies

```bash
# Get GitHub policies
find policies/ -name "*.md" -not -path "*/templates/*" | sort

# Get Notion policies (manual or via API)
# Note: Policy names, last modified dates
```

#### 6b: Compare Versions

For each policy:
```
Policy: [Name]
- GitHub version: [X.Y.Z] — last updated [date]
- Notion version: [X.Y.Z] — last updated [date]
- Status: ✅ Synced / ⚠️ Drift detected / ❌ Missing
```

#### 6c: Drift Detection

**Drift indicators:**
- Version numbers don't match
- Modified dates differ by >7 days
- Content hash mismatch (if using automation)
- Policy exists in one platform but not the other

**Output:**
```markdown
# Policy Audit — [Date]

## Synced (GitHub ↔ Notion)
- ✅ [Policy 1] — both v2.1.0
- ✅ [Policy 2] — both v1.3.1

## Drift Detected
- ⚠️ [Policy 3] — GitHub v2.0.0, Notion v1.9.0
  - Action: Update Notion from GitHub
- ⚠️ [Policy 4] — GitHub v1.5.0, Notion v1.5.0 but content differs
  - Action: Manual review required

## Missing from Notion
- ❌ [Policy 5] — exists in GitHub only
  - Action: Create Notion page

## Missing from GitHub
- ❌ [Policy 6] — exists in Notion only
  - Action: Add to GitHub repo

## Recommendations
1. [Specific sync action needed]
2. [Specific sync action needed]
```

──────────

## Templates

### Quick Policy Creation (15 min)

For simple, uncontroversial policies:

```markdown
# [Policy Name]

**Owner:** [Role]
**Effective:** [Date]
**Version:** 1.0.0

## Purpose
[Why this exists]

## Scope
[Who/what this covers]

## Policy
[Clear statement of what is/isn't allowed]

## Procedure
1. [Step]
2. [Step]
3. [Step]

## Questions
Contact [email]
```

### Full Policy Creation (45 min)

For complex, compliance-critical policies:
- Use full template from Phase 2a
- Include all sections
- Add comprehensive definitions
- Document approval workflow
- Link to related policies

### Reformatting Batch (per policy: 10 min)

For existing policies needing standardization:

1. Read existing policy
2. Apply standard template
3. Flag gaps for SME review
4. Preserve revision history
5. Commit with "refactor" type

──────────

## Domain-Specific Considerations

### HR Policies
- [ ] Employment law compliance
- [ ] Equal opportunity language
- [ ] Privacy and data protection
- [ ] Accommodation provisions
- [ ] Consultation with legal

### Finance Policies
- [ ] Regulatory compliance (SOX, etc.)
- [ ] Audit trail requirements
- [ ] Approval thresholds
- [ ] Segregation of duties
- [ ] Tax implications

### IT/Security Policies
- [ ] NIST, ISO 27001 alignment
- [ ] Incident response procedures
- [ ] Access control requirements
- [ ] Data classification
- [ ] Regular penetration testing

### Safety Policies
- [ ] OSHA or local equivalent compliance
- [ ] Hazard identification
- [ ] Emergency procedures
- [ ] Training requirements
- [ ] Incident reporting

### Compliance Policies
- [ ] Regulatory mapping
- [ ] Audit schedule
- [ ] Whistleblower provisions
- [ ] Record retention
- [ ] Third-party certification

──────────

## Critical Rules

1. **NEVER publish without review** — Policies have legal/compliance implications
2. **NEVER skip compliance check** — Map to applicable laws/standards
3. **NEVER use ambiguous language** — "Should" vs "must" matters
4. **ALWAYS version policies** — Track what changed and when
5. **ALWAYS set review dates** — Policies expire if not reviewed
6. **ALWAYS link to sources** — Evidence-based policy creation
7. **ALWAYS define roles** — Ambiguous responsibility = no accountability

## Integration with Other Skills

### With /research
```
/research [topic] compliance
→ Gather evidence for policy foundation
→ Identify legal/regulatory requirements
→ Find industry best practices
```

### With /closedown
```
After policy work session:
- Note: Policies created/updated
- Next: Required approvals
- Blockers: Pending legal review
```

### With /security-review
```
For IT/Security policies:
→ Run security-review on procedures
→ Validate against OWASP/NIST
→ Check for hardcoded secrets in examples
```

## Automation Roadmap

### Phase 1 (Manual)
- Use standard templates
- Commit to GitHub manually
- Copy to Notion manually
- Manual drift checks

### Phase 2 (Semi-automated)
- Script: GitHub → Notion sync
- Script: Drift detection
- Automated reminders for review dates

### Phase 3 (Fully automated)
- Bidirectional sync
- Approval workflow integration
- Policy expiration notifications
- Compliance dashboard

──────────

## Output Example

```markdown
# Remote Work Policy — DRAFT

**Category:** HR
**Owner:** People & Culture
**Effective Date:** 2026-03-01
**Review Date:** 2027-03-01
**Version:** 1.0.0

---

## Purpose

Enable employees to work remotely while maintaining productivity, security, and team cohesion.

## Scope

**Applies to:** All full-time and part-time employees
**Does not apply to:** Contractors (covered under contractor agreements)

## Policy Statement

Employees may work remotely up to 3 days per week, subject to role requirements and manager approval.

### Principles

1. Remote work is a privilege, not a right
2. Performance and deliverables remain unchanged
3. Security and confidentiality must be maintained
4. Team collaboration is prioritized

## Procedures

### Requesting Remote Work

**Who:** Employee
**When:** At least 48 hours before remote work day (except emergencies)
**How:**

1. Submit request via [HRIS system]
2. Manager reviews within 24 hours
3. Approval recorded in system
4. Employee confirms receipt

**Expected outcome:** Approved request with confirmed remote work date

### Remote Work Setup

**Who:** Employee + IT
**When:** Before first remote work day
**How:**

1. Complete IT security training
2. Request VPN access via IT portal
3. Test VPN connection and required tools
4. Confirm secure home workspace (private room, locked when away)

**Expected outcome:** Secure, functional remote setup

### Daily Remote Work Requirements

1. **Availability:** Online during core hours (10am-3pm)
2. **Communication:** Respond to messages within 2 hours
3. **Meetings:** Camera on for team meetings
4. **Deliverables:** Maintain normal output quality and deadlines

## Roles & Responsibilities

| Role | Responsibility |
|------|----------------|
| Employee | Follow policy, maintain productivity, ensure security |
| Manager | Approve requests, monitor performance, provide support |
| IT | Provide secure tools, VPN access, technical support |
| HR | Policy compliance, dispute resolution |

## Compliance & Monitoring

**Compliance requirements:**
- Data Protection Act 2020 (NZ)
- Privacy Act 2020 (NZ)
- Employment Relations Act 2000 (NZ)

**Monitoring approach:**
- Manager check-ins (weekly)
- Performance reviews (quarterly)
- IT security audits (annual)

**Non-compliance consequences:**
- First incident: Verbal warning
- Second incident: Written warning, remote work privileges suspended
- Third incident: Disciplinary action per HR policy

## Definitions

- **Remote work:** Working from location other than company office
- **Core hours:** 10am-3pm, Monday-Friday (NZST)
- **Secure workspace:** Private area with locked door, no public visibility of screens

## Related Documents

- [IT Security Policy](./it/security-policy.md)
- [Flexible Working Request Process](./hr/flexible-working.md)
- [Performance Management Policy](./hr/performance-management.md)

## Revision History

| Version | Date | Changes | Approved By |
|---------|------|---------|-------------|
| 1.0.0 | 2026-02-15 | Initial creation | Jane Smith (CPO) |

---

**Next review due:** 2027-03-01
**Questions:** Contact people-culture@company.com
```
