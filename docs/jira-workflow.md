# Jira workflow

Our Jira space is **Plateful (PLAT)**. Jira calls tickets "work items" and projects "spaces"; we still say ticket and project.

## Board columns

| Column | Meaning | Who moves the ticket here |
|---|---|---|
| To Do | Planned for this sprint, not started | Priya or the developer, at planning |
| In Progress | A developer is building or fixing it | The developer |
| Ready for QA | Built and deployed to QA, with the build number in a comment | The developer, after Amit's deploy |
| In QA | A tester is testing it now | **You**, when you start testing |
| Done | Tested and meets the [Definition of Done](definition-of-done.md) | **You**, when testing passes |

## Your part

1. When you start testing a ticket: move it to **In QA** and assign it to yourself.
2. Check the build on QA matches the build in the developer's comment.
3. If testing **passes**: add a comment (build, what you checked, link to results), log your time, move it to **Done**.
4. If testing **fails**: for a story, raise a bug and link it to the story; the story waits in In QA. For a bug fix that did not work, **reopen** it: move it back to **To Do** with a comment saying why, the build, and the evidence.

## Bugs

- Use the [bug report template](bug-report-template.md).
- Link the bug to the story it belongs to ("relates to").
- Labels: the area (`search`, `cart`, `coupons`, `checkout`, `orders`, `partner`, `rider`, `support`) and `phone` if it only happens on phone screens.

## Logging time (this is your timesheet)

Log your hours on the tickets you worked on, every day before you log off: open the ticket → ••• → **Log work**. Use hours and minutes (for example `1h 30m`). Meetings and stand-ups go on the sprint's "Meetings" task.

## Comments

Start with what happened, then the evidence. Mention people with @ only when they need to act.
