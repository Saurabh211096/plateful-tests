# Severity and priority

Two different questions:

- **Severity** = how bad is the effect? (the tester decides, from the facts)
- **Priority** = how soon must it be fixed? (Priya and Ananya decide; the tester suggests)

A typo on the payment page is low severity but may get high priority before a release. A crash in a screen nobody uses yet is high severity but may get lower priority.

## Severity (first line of the bug description)

| Severity | Meaning | Plateful examples |
|---|---|---|
| **S1 Critical** | Main flow blocked or money is wrong for many users, no workaround | Nobody can place an order; customers charged twice |
| **S2 Major** | A feature does not work as agreed, or money is wrong in some cases | Coupon gives the wrong discount; refund amount wrong |
| **S3 Minor** | Works, but wrong in a small way, or a workaround exists | Wrong error message; layout broken on one screen size |
| **S4 Trivial** | Cosmetic | Spelling, alignment, colour |

Money is never trivial: anything that changes what a customer pays or gets back is at least S2.

## Priority (the Jira Priority field)

| Jira priority | When |
|---|---|
| Highest | Fix now; blocks testing or the release |
| High | Fix in this sprint, before the release |
| Medium | Fix in this or the next sprint |
| Low | Fix when there is time |
| Lowest | Nice to have |

## If someone disagrees

Give the facts (how many users, how much money, is there a workaround) and let Priya decide. Severity is not a fight; it is information.
