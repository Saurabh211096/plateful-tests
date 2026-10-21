# Automation guide

Our automated tests use **Playwright** with **TypeScript**. They run against QA (never Production).

## Run the tests

```
npm install                 (first time only)
npx playwright install chromium   (first time only)
npm run test:smoke          quick smoke tests (about 30 seconds)
npm test                    everything: laptop and phone (about 2 minutes)
npm run test:phone          only the phone tests
npx playwright test tests/cart/coupons.spec.ts     one file
npm run report              open the HTML report of the last run
```

The report shows each failure with a screenshot and a trace (a step-by-step recording). Open a trace with the command printed under the failure.

## How the project is organised

| Folder | What is in it |
|---|---|
| `tests/` | The tests, one folder per area of the app |
| `pages/` | **Page objects**: one class per screen, holding its locators and actions. Tests call `cartPage.applyCoupon('WELCOME75')` instead of repeating locators |
| `fixtures/test.ts` | **Fixtures**: ready-made things a test asks for, like `customer` (a fresh test customer made through the API) or `loggedInPage` |
| `utils/` | The API client used to set up data fast, environment settings, test data helpers |
| `test-data/` | Fixed test data: the automation restaurant, payment test values, staff accounts |
| `docs/` | This wiki |

## Phone screens

`playwright.config.ts` has two projects: `desktop` (1366x768) runs every test, and `phone` (Pixel 7, 412x915) runs the tests tagged `@phone`.

## Our style

- Find elements the way a user does: `getByRole`, `getByLabel`, `getByText`. Use `getByTestId` when there is no good visible name.
- Set up data through the API (fixtures, `api.addToCart`), test the screen through the UI.
- Use web-first assertions that wait on their own: `await expect(locator).toHaveText('...')`. **No fixed waits** (`waitForTimeout`).
- One behaviour per test. Test names say what should happen.
- Each test makes its own customer, so tests do not depend on each other.
- Tags in the test name: `@smoke`, `@phone`, `@regression`.
- Never commit `test.only`. CI fails on it.

## Adding a test

Copy the closest existing test, change it, run it at least three times, then raise a pull request.

## Pull requests

1. Make a branch: `test/PLAT-24-coupon-boundaries` or `fix/checkout-button-text`.
2. Commit with a clear message: `Add boundary tests for PLAT-24 coupons`.
3. Run the tests you changed locally, and `npm run ci`.
4. Push and open a pull request. Describe: what changed, why, the Jira ticket, how you tested it (and if the AI seat helped).
5. Priya reviews. Answer every comment (fix it, or explain why not), then she merges.

CI (GitHub Actions) checks every pull request: test hygiene, type check, and that all tests load.
