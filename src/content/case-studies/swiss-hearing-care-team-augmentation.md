---
title: "Clearing technical debt inside a Swiss hearing-care group's engineering teams while the release dates held"
summary: "A Swiss hearing-care group brought cverse engineers into its own teams to add capacity. The engineers worked the way cverse builds everything: through its software factory, with its engineering harness on every change, and with AI-assisted engineering for the mechanical parts of the work. Over the engagement the teams cleared a large amount of long-standing technical debt and kept to the timelines and deadlines they had already committed to."
client: "A Swiss hearing-care group"
industry: "Hearing care and medical devices"
engagement: "Team augmentation"
duration: "Ongoing"
services: ["Team augmentation"]
stack: ["Software factory", "Engineering harness", "AI-assisted engineering"]
outcomes:
  - headline: "Technical debt cleared"
    caption: "Long-deferred debt in the group's codebases was paid down during ordinary delivery work."
  - headline: "Deadlines held"
    caption: "The teams kept to the release timelines and deadlines they had committed to before the work began."
  - headline: "Code in the group's repositories"
    caption: "Everything the cverse engineers produced is ordinary code in the group's own repositories."
publishedAt: 2026-11-25
draft: true
# CONFIRM before go-live. Facts file (local, not committed): case-study-facts/swiss-hearing-care-team-augmentation.md
# Supplied by cverse on 2026-11-25: the client descriptor, and "lots of possible tech debts were cleared while
# still adhering to the timelines and deadlines". Everything else below is inferred and must be confirmed or cut.
# - duration "Ongoing", and the Looking ahead section: is the engagement still running? Since when?
# - services label "Team augmentation" is new; it is not in execServices in src/data/exec.ts. Keep or map?
# - stack entries are methods, not tools. Replace with the actual stack once known.
# - Story at a glance: "to add capacity" is the assumed reason for augmentation. What did the group ask for?
# - About the client: "software built by in-house teams" is assumed.
# - Solution: "engineering harness" is described as the automated checks each change passes before merge.
#   The site elsewhere describes a "test set and scoring harness" for AI builds. Which is it here?
# - Solution: AI-assisted engineering, "for the mechanical parts of the work": which tools, which tasks, what
#   review rules, and whether the group's regulated-software context constrained them.
# - Solution: the link between working this way and having room for debt is inferred, not stated by cverse.
# - Outcome: "a large amount" stands in for a count. Any number with a before and after, with dates?
# - SETBACK WANTED: nothing here went wrong, ran long, or was cut. One sentence from the engineers.
# - No quote. One from the group's side, role only, would carry the page.
# - When draft flips to false: add '/case-studies/swiss-hearing-care-team-augmentation/' to caseStudyPages in
#   tests/pages.ts.
---

## The story at a glance

A Swiss hearing-care group needed more engineering capacity than its own teams had, and brought cverse engineers into those teams to supply it. The engineers came with the way cverse builds everything: a software factory whose output is ordinary code in the group's repositories, an engineering harness that every change passes through, and AI-assisted engineering for the mechanical parts of the work.

The teams delivered the features on the plan. Over the same period they also cleared a large amount of long-standing technical debt, and they did it while keeping to the timelines and deadlines they had committed to before the work began.

## About the client

The group develops and sells hearing-care products and the services around them, and its products depend on software built by in-house teams. Its name is withheld at its request.

## The challenge

Adding engineers to a team under deadline pressure usually buys more of the same work. The debt that has been deferred stays deferred, because the new people are measured against the same dates as everyone else, and nobody is given the room to go back and fix what the last release left behind.

The group wanted the extra capacity, and it wanted the dates kept.

## The solution

cverse engineers joined the group's teams and worked inside them, on the group's codebases and in its repositories.

What they brought was a way of working. The software factory is how cverse builds client work: shared templates and pipelines that every cverse engineer uses, with the output delivered as ordinary code in the group's own repositories. The engineering harness is the set of automated checks a change passes before it is merged, so that each change can be made with confidence that it has not broken something else. AI-assisted engineering covers the mechanical parts of the work, such as scaffolding and test-writing, under review by the engineer responsible for the change.

Working this way, the engineers had room inside each iteration to pay down debt alongside the committed features. Each piece of debt was cleared as part of ordinary delivery, under the same checks as the feature work, rather than in a separate clean-up project that would have had to compete for the calendar.

## The outcome

The group's teams cleared a large amount of long-standing technical debt during the engagement, and the release timelines and deadlines they had committed to were met. Everything the cverse engineers produced is in the group's own repositories, and the harness that gated their changes is there with it.

## Looking ahead

The engagement is ongoing. cverse engineers are still working inside the group's teams, and the debt that remains is being cleared the same way, as part of the delivery work.
