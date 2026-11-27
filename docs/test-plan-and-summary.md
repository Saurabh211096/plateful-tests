# Short test plan and test summary (for one story)

A release has a full test plan and a test summary report (shared drive, 04 Test Plans and Reports). A single story needs much less: **two short comments on the story's ticket**, one before testing and one after. Anyone who opens the ticket then sees what QA planned and what QA found.

## Test plan (before testing starts)

```
*Test plan*
Scope: what I will test, from the acceptance criteria
Not in scope: what I will not test, and why
Test cases: the IDs in Plateful_Test_Cases.xlsx
Where: QA, from build NNN. Laptop / phone sizes
Test data: accounts, restaurants, special values
Risks: what could go wrong or cannot be tested on QA
Estimate: my testing time, in days or hours
```

## Test summary (when testing is done)

```
*Test summary*
Build: the last build tested
Test cases: N run: N Pass, N Fail, N Blocked. Results: the execution workbook
Bugs: the keys, with their status. Open bugs with their severity
Not tested: what was left out, and why
Result: Done / Not done, in one line
```

## Rules

- Short lines. Facts and numbers, no opinions.
- The estimate is your honest guess. If it changes, add a comment with the new estimate and the reason, before the time is up.
- "Not tested" is never empty by default: if you tested everything in scope, write "Nothing left out".
- The summary is the last comment before the ticket goes to Done.
