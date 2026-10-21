# Environments

An **environment** is one running copy of Plateful with its own data. We have two on our side.

| Environment | Address | What it is | What you may do |
|---|---|---|---|
| **QA** | http://localhost:4100 | The build we are testing now. Amit deploys new builds here | Anything: test data, test orders, test payments |
| **Production** | http://localhost:4200 | What real customers, restaurants and delivery partners use | **Look only.** No logins, no orders, no test data. Ever |
| Staging | http://localhost:4300 | Used by Plateful's team for UAT (user acceptance testing) | Ask Ananya's team before using it |

The QA site shows a yellow strip at the top: "QA environment · build ...". Production has no strip. If you do not see the strip, stop and check where you are.

## Which build am I testing?

Before you test, check the build (developers fix things in a specific build):

- The bottom of every page shows the version and build, for example `v1.1.0 (build 203)`.
- Or open http://localhost:4100/api/v1/health and read `buildId`.

Write the build number in every bug report and every test result.

## After a deploy

- Amit posts in the team channel when a new build is on QA.
- Do a **hard refresh** (Ctrl + F5) before testing a fix. The browser keeps old scripts and styles for up to 30 minutes, so without a hard refresh you may still be testing the old screen.
- Then run the [smoke checklist](smoke-checklist.md).

## When QA is down

- A page saying "under maintenance" (503) means a deploy is in progress. Wait 15 minutes, then try again.
- Nothing loads at all: check the team channel first, then ask Amit.

## Useful QA pages

| Page | Address |
|---|---|
| Customer app | http://localhost:4100 |
| Restaurant partner portal | http://localhost:4100/partner |
| Delivery partner app | http://localhost:4100/rider |
| Support console | http://localhost:4100/support |
| Ops admin (QA tools inside) | http://localhost:4100/admin |
| Test inbox (SMS and email sent from QA) | http://localhost:4100/qa/inbox |
| API documentation | http://localhost:4100/api-docs |
