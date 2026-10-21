# Test accounts and test data (QA only)

None of this works in Production, and none of it is real customer data.

## Logging in as a customer

- On QA the **OTP is always `123456`**. The SMS also appears in the [test inbox](http://localhost:4100/qa/inbox).
- Any new 10-digit number starting with 6, 7, 8 or 9 creates a new customer. This is the easiest way to get a clean account.
- Five wrong OTPs in a row lock the number for 15 minutes. To unlock: Ops admin → Customers → search the number → Unlock.

**Shared customer accounts** (they have order history):

| Number | Name | Notes |
|---|---|---|
| 9000000001 | QA Shared One | **Developers use this one. Do not use it** |
| 9000000002 | Priya Test | Priya's account |
| 9000000003 | Kunal Test | Kunal's account |
| 9000000004 to 9000000008 | QA Shared Four to Eight | Free to use. Leave them as you found them |
| 9000000009 | QA Bengaluru | Address in Bengaluru |

## Staff logins

| Portal | Login | Password |
|---|---|---|
| Restaurant partner (Spice Route Kitchen) | partner.spiceroute@plateful.test | Partner@123 |
| Restaurant partner (Dosa Corner) | partner.dosacorner@plateful.test | Partner@123 |
| Support console (for manual testing) | support.qa1@plateful.test | Support@123 |
| Support console (automation only) | support.qa2@plateful.test | Support@123 |
| Ops admin (shared, changes affect everyone) | admin.qa@plateful.test | Admin@123 |
| Delivery partner (Pune) | 9100000001 (Ravi Pawar) or 9100000002 (Sameer Shaikh), OTP 123456 | |

## Payments (PayEase test mode)

| To test | Use |
|---|---|
| UPI success | `success@payease` |
| UPI failure | `failure@payease` |
| UPI pending (fails after 3 minutes) | `pending@payease` |
| Card success | `4111 1111 1111 1111` or `5555 5555 5555 4444` |
| Card declined | `4000 0000 0000 0002` |
| Insufficient funds | `4000 0000 0000 9995` |

For cards, use any future expiry (for example 12/30), any 3-digit CVV and any name.

## Coupons on QA

`WELCOME75` (flat ₹75 off on ₹299+), `TREAT40` (flat ₹40 off on ₹199+, 3 uses), `DUSSEHRA100` (expired, for negative tests).

## The automation restaurant

**Spice Route Kitchen (Baner, Pune)** is used by the automated tests. Do not change its menu, prices or open/closed status. If you must, change it back and tell the team.
