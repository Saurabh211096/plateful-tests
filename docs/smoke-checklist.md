# Smoke checklist (after every deploy to QA)

A **smoke test** is a quick check that the new build is good enough to test. It takes about 15 minutes. If any step fails, stop and tell Amit and Priya in the team channel. Testing on a broken build wastes everyone's time.

Before you start: hard refresh (Ctrl + F5), and note the build number at the bottom of the page.

| # | Check | Pass when |
|---|---|---|
| 1 | Open http://localhost:4100 | Restaurants in Pune are listed; the footer shows the new build |
| 2 | Log in with a new number, OTP 123456 | You are logged in and see your name or "Account" |
| 3 | Search "paneer", open the Dishes tab | Paneer dishes are listed |
| 4 | Open Spice Route Kitchen, add 2 items | The cart count shows 2 |
| 5 | Go to the cart and apply `WELCOME75` | Discount ₹75 shows in the bill (item total must be ₹299+) |
| 6 | Add an address, pay with UPI `success@payease` | The order page says "Payment successful" and "Order placed" |
| 7 | Partner portal: accept the order | The customer's order page changes to "Preparing your food" |
| 8 | Ops admin → QA tools: move the order to Delivered | The order page shows "Delivered" |
| 9 | Test inbox | The order confirmation SMS is there |
| 10 | Repeat steps 1, 4 and 5 in the phone view (F12 → device toolbar → Pixel 7) | Same results, nothing cut off |

The automated smoke tests cover part of this: `npm run test:smoke` in the test project.

## Report it

Post in the team channel:

```
Smoke test on QA build 204: PASS (10/10). OK to start testing.
```

or

```
Smoke test on QA build 204: FAIL at step 6 (UPI payment page shows 500). Stopping. @Amit @Rohan please check.
```
