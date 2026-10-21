# Definition of Done (DoD)

A ticket is **Done** only when all of these are true. If one is missing, it is not done yet, even if "it works".

## Story

- [ ] All acceptance criteria are met on the QA environment, on the build named in the ticket.
- [ ] Test cases are written in the team workbook and linked to the ticket (ticket number in the "Linked ticket" column).
- [ ] Test cases are run and the results (Pass, Fail, Blocked) are recorded with the build number.
- [ ] Customer screens are checked on a laptop screen and on a phone screen (phone view in the browser).
- [ ] Every bug found is raised in Jira and linked. No open bug with severity S1 or S2 remains.
- [ ] Areas around the change are checked (for example, a coupon change: also check the bill and the payment amount).
- [ ] Time is logged on the ticket.
- [ ] A short comment says what was tested, on which build, and where the results are.

## Bug

- [ ] The fix is checked on the build named by the developer, following the original steps.
- [ ] The areas around the fix are checked.
- [ ] Screens are checked on a laptop and a phone if the bug is on a customer screen.
- [ ] A comment says: build, what was checked, result.
- [ ] If the bug reached Production or the client, a regression test case is added to the workbook.

## Release

See [Release process](release-process.md).
