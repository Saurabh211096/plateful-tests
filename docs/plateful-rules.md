# Plateful rules (quick reference)

The rules of the app as agreed with Plateful. The Jira ticket is always the final word; this page is a summary.

## Bill

| Line | Rule |
|---|---|
| Item total | Sum of item price x quantity |
| Delivery fee | ₹30. Free when the item total is ₹499 or more |
| Platform fee | ₹5 per order |
| Packaging | Set by each restaurant (₹0 to ₹30) |
| GST | 5% of (item total − coupon discount + packaging), rounded to the nearest rupee |
| Coupon discount | Taken off the item total only |

## Cart

- Items from one restaurant at a time. Adding from another restaurant asks to clear the cart.
- Up to 10 of the same item.
- Closed restaurants and unavailable items cannot be added.

## Payment

- UPI, credit or debit card (through PayEase), or cash on delivery.
- Cash on delivery is available for orders up to ₹2,000.
- If a payment fails, no money is taken and the cart stays as it was.

## Order statuses

Awaiting payment → Order placed → Preparing your food → Food is ready → On the way → Delivered.
Other endings: Payment failed, Cancelled, Rejected by restaurant.

## Cancellation and refunds

- The customer can cancel only while the status is "Order placed" (before the restaurant accepts). After that, only Support can cancel.
- Prepaid orders are refunded in full to the same UPI or card. Refunds take 3 to 5 working days (on QA they are processed after 5 minutes).
- If the restaurant does not accept an order within 2 hours, Plateful cancels it automatically and refunds it.
- Support can give partial refunds, up to the amount paid.

## Login

- OTP has 6 digits, is valid for 5 minutes, and can be resent after 30 seconds.
- 5 wrong OTPs lock the number for 15 minutes.
