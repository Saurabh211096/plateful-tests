# Release process

A release takes a tested build from QA to Production. We release at the end of every sprint, plus small **hotfix** releases when a serious bug reaches Production.

## Timeline (two-week sprint)

| When | What | Who |
|---|---|---|
| Day 8 | Last stories reach QA | Developers |
| Day 9 morning | **Code freeze**: only fixes for release bugs go into the build after this | Amit, developers |
| Day 9 | **Release candidate (RC)** build deployed to QA; smoke test | Amit, QA |
| Day 9 | **Regression run**: the release's test cases plus the regression set | QA |
| Day 9 to 10 | UAT by Plateful (Ananya's team) | Plateful |
| Day 10 morning | **Go/no-go meeting** | Vikram, Priya, Ananya, Amit |
| Day 10 evening | Deploy to Production | Amit |
| Right after | **Production checks** (read-only) and QA sign-off mail | QA |

## Go/no-go: what QA brings

- Test results: how many test cases passed, failed, blocked, not run.
- Open bugs by severity, with what each one means for customers.
- **Risks**: what was not tested and why.
- A recommendation: "Go", "Go with known issues" (list them), or "No-go" (why).

Saying "not yet" is part of the job when the facts say so.

## Production checks (after the deploy)

Production is real. **Look, don't touch.** No logins, no orders, no test data.

1. The footer shows the new version and build.
2. The home page lists restaurants; a restaurant page opens.
3. Search works.
4. New features are visible where they should be without logging in.
5. Feature flags: some features are switched off in Production on purpose (check the release notes before reporting).

Then Priya sends the QA sign-off mail.

## Hotfix

A hotfix is a small release with only the fix. QA retests the fix, checks the areas around it, runs the smoke checklist, and adds a regression test case for the bug.
