# Bug report template

A good bug report lets a developer reproduce the bug **without asking you anything**. Good example in Jira: **PLAT-16** (coupon applied twice), written by Priya.

## Summary (title)

`[Area] What goes wrong + where/when`. Short and specific.

- Good: `Coupon: WELCOME75 discount applied twice when Apply is double-clicked`
- Bad: `Coupon not working`

Phone-only bug: start with `[Phone]` and give the device and size in the description.

## Description (copy this into Jira)

```
*Severity:* S2 (Major)
*Environment:* QA, build 1.1.0 (203), Chrome on Windows 11, laptop 1366x768
*Test account:* 9000000005

h3. Steps to reproduce
# Log in as 9000000005 (OTP 123456)
# Open Spice Route Kitchen and add Butter Chicken x1 (₹349)
# Go to the cart and enter WELCOME75
# Double-click Apply

h3. Expected result
Discount of ₹75 applied once. To pay: ₹344.

h3. Actual result
Bill shows two discount lines (− ₹75 twice). To pay: ₹269.

h3. Evidence
Screenshot: PLAT-16_bill_two_discounts.png (attached)
Video or console error, if any

h3. Notes
Happens every time (5 of 5). Single click works correctly.
```

## Checklist before you press Create

- [ ] Can someone follow the steps without guessing (exact data, exact clicks)?
- [ ] Build number and environment are there.
- [ ] Expected result comes from the ticket or the [Plateful rules](plateful-rules.md), not from memory.
- [ ] Evidence is attached, with customer data masked ([Privacy](privacy-and-test-data.md)).
- [ ] How often it happens (every time, 2 out of 5, once).
- [ ] [Severity and priority](severity-and-priority.md) are set. Priority is the Jira Priority field; severity goes in the first line of the description.
- [ ] Linked to the story it belongs to; labels set.
- [ ] Searched Jira first: is it already reported?

## From the browser's developer tools (when it helps)

For errors from the server, add: the request (method and URL), the status code, the response body, and the console error. Right-click the request in the Network tab → Copy → Copy as cURL, and paste it in the Notes.
