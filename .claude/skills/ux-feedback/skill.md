---
name: ux-feedback
description: Review a webpage with screenshots and produce structured UX feedback for a specific audience. Use when asked to audit, review, or assess a website or page for brand consistency, accessibility, mobile responsiveness, conversion optimisation, or copy quality. Gathers scope, audience, output format, and priorities before reviewing.
argument-hint: [url] [optional: page or section description]
---

# UX Feedback

Make design decisions visible. Ground opinions in evidence, not guesses.

```
Gather context → Screenshot page → Analyse dimensions → Format for audience
```

## When to Use

**Trigger signals:**
- "Review/audit/assess this page for UX"
- "Give me feedback on [url]"
- "Check [page] against our brand"
- "What UX issues does [site] have?"
- "We're sharing feedback with [person] on [url]"

**Use for:**
- Preparing feedback for marketing managers, designers, or developers
- Brand consistency checks before or after a campaign
- Pre-launch or post-launch page audits
- Identifying conversion blockers
- Accessibility and mobile usability reviews

## Arguments

```
/ux-feedback [url] [optional: page or section description]
```

──────────

## Phase 1: Gather Context (2 min)

Ask for any of the following not already provided in the initial message:

1. **Scope** — Full site, specific page, or specific section? (e.g., "homepage only", "hero section", "checkout flow")
2. **Audience** — Who receives this feedback? Name and role shape tone and depth. (e.g., "marketing manager Shadoe at Five and Dime", "our dev team", "a client")
3. **Output format** — Choose one:
   - Bullet-pointed list
   - Severity-rated issue log (table)
   - Executive summary + findings
   - Full structured report
4. **Priority aspects** — Rank the dimensions that matter most for this review:
   - Brand consistency
   - Accessibility (WCAG 2.1 AA)
   - Mobile responsiveness
   - Conversion optimisation (CTAs, flow, trust signals)
   - Copy quality (clarity, tone, duplication)
   - General usability (Nielsen's 10 Heuristics)

**Output:**
```
Scope: [page/section]
Audience: [name and role]
Format: [selected format]
Priority aspects: [ordered list]
```

──────────

## Phase 2: Capture the Page (3 min)

Navigate to the URL and take screenshots using the browser tool. Capture:

- **Desktop** (1280px wide): full-page scroll or key sections above and below the fold
- **Mobile** (375px wide): resize viewport and capture key sections
- **Zoomed details** on any elements flagged in scope or by the user

Both viewports are required — issues are often viewport-specific and mobile is frequently missed.

**Output:**
```
Screenshots captured: desktop [sections] | mobile [sections]
```

──────────

## Phase 3: Analyse Against Dimensions (10 min)

Work through priority aspects in the order specified. For each issue found, record:

- **Location** — section name and viewport (desktop / mobile)
- **Severity** — High (breaks brand or blocks user) / Medium (friction) / Low (polish)
- **Issue** — what's wrong, described concretely
- **Recommendation** — what to do about it

### Brand Consistency
- Logo size, placement, and usage correct at each breakpoint?
- Colour palette matches brand guidelines — backgrounds, text, buttons?
- Typography consistent — correct fonts, weights, hierarchy?
- Imagery style and quality matches brand standards?
- Tone and voice consistent with brand personality throughout?

### Accessibility (WCAG 2.1 AA — visual check)
- Text contrast sufficient against backgrounds (especially on coloured sections)?
- Interactive elements visually distinguishable (buttons look like buttons)?
- Font sizes legible at default zoom on both viewports?
- Images that carry meaning — do they likely have alt text?

### Mobile Responsiveness
- Content fits viewport without horizontal overflow or bleed?
- Images scale correctly — no cropping, bleed, or overflow at edges?
- Touch targets prominent and tap-friendly (minimum 44×44px)?
- Typography legible at mobile size?
- CTAs visible and prominent on small screens?

### Conversion Optimisation
- Clear CTA above the fold on both viewports?
- Value proposition communicated in first 3 seconds of viewing?
- Trust signals present (testimonials, social proof, logos, stats)?
- User flow clear — does each section answer "what next"?
- No duplicate content or repeated sections that dilute focus?

### Copy Quality
- Headlines clear, benefit-focused, not generic?
- Tone consistent throughout?
- No duplicate headlines, sections, or calls to action?
- Button labels and microcopy actionable and specific?
- No jargon without explanation?

### General Usability (spot-check against Nielsen)
- System status visible — loading states, progress cues present?
- Real-world language used — no internal jargon visible to users?
- Minimalist design — no irrelevant content competing with key messages?

**Output:**
```
Issues found: [N total]
By dimension: Brand [N] | Accessibility [N] | Mobile [N] | Conversion [N] | Copy [N]
By severity: High [N] | Medium [N] | Low [N]
```

──────────

## Phase 4: Format for Audience (5 min)

Produce feedback in the requested format, calibrated for the audience.

**Bullet-pointed list:** Grouped by priority aspect. Each bullet states issue, location, and recommendation in plain language.

**Severity-rated issue log:** Table — Section | Issue | Severity | Recommendation

**Executive summary + findings:** 2–3 sentence overall assessment, then findings grouped by dimension.

**Full structured report:** Title, scope, audience, methodology, findings by dimension with screenshots referenced, prioritised action plan.

**Tone calibration by audience:**
- Marketing manager: casual and direct — use "remove", "shrink this", "can we try..." rather than "Recommend removing" or "It is advised that...". Skip section headers for bullet lists. Drop hedging and caveats unless genuinely needed. Brand and conversion impact only, no dev jargon.
- Developer: specific and technical, element locations described, implementation effort noted
- Designer: visual language, design system references, alternatives suggested
- Client or agency: high-level, business impact framing, confidence-building tone

Integrate the user's own notes into the analysis — do not append them separately.

**Output:**
```
[Complete feedback document, formatted for the audience]
```

──────────

## Critical Rules

1. **Always take screenshots** — feedback without visual evidence is opinion; screenshots make findings concrete and harder to dispute
2. **Always capture both desktop and mobile** — most sites have divergent issues across breakpoints; reviewing only one misses half the story
3. **Integrate user's notes into the analysis** — if the user provides their own observations, weave them into the structured output rather than listing them separately
4. **Calibrate tone to the audience** — technical language sent to a non-technical audience creates friction instead of action
5. **Every issue needs a recommendation** — say what to do, not just what's wrong

## Quality Checklist

- [ ] Context gathered (scope, audience, format, priority aspects)
- [ ] Screenshots taken — desktop and mobile
- [ ] All priority aspects reviewed in specified order
- [ ] Each issue has location, severity, and recommendation
- [ ] User's own notes incorporated (not appended)
- [ ] Tone calibrated to audience
- [ ] Output matches requested format

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| Desktop-only review | Always resize to mobile — most UX issues are breakpoint-specific |
| Vague findings ("looks off") | Name the element, describe the problem, reference the dimension |
| No recommendations | Every issue needs a "what to do" |
| Over-technical for non-technical audience | Strip jargon, focus on user and brand impact |
| Too formal for marketing audience | Use direct verbs — "remove", "shrink", "can we..." — not "Recommend that..." |
| Appending user notes instead of integrating | Weave observations into the structured analysis |
| Listing every minor issue | Prioritise by severity and business impact — not everything needs fixing |

## Integration

- Related: your own brand guidelines doc, if you have one — point Claude at it before reviewing
- Pairs with: `/research` — to look up brand or accessibility guidelines before reviewing
