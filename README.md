# Plateful automated tests

End-to-end and API tests for **Plateful**, the food-delivery app Kestrel Bay Technologies builds for Plateful Foods.
Playwright + TypeScript. Maintained by the Plateful QA team (Priya Deshmukh).

## Quick start

```
npm install
npx playwright install chromium
npm run test:smoke
```

The tests run against the **QA environment** (`http://localhost:4100` by default). To change it, copy `.env.example` to `.env`.
The tests refuse to run against Production.

## Useful commands

| Command | What it does |
|---|---|
| `npm test` | All tests, laptop and phone screen |
| `npm run test:smoke` | Smoke tests only (after a deploy) |
| `npm run test:phone` | Phone-screen tests only (Pixel 7) |
| `npm run test:api` | API tests only |
| `npm run report` | Open the last HTML report |
| `npm run ci` | What CI runs: hygiene check, type check, test list |

## Team wiki

How the team works (environments, test data, Jira, bug reports, releases) is in [`docs/`](docs/README.md).
Start with the [automation guide](docs/automation-guide.md) before changing tests.
