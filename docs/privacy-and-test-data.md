# Privacy and test data

Plateful's customers trust us with their names, phone numbers and addresses. Kestrel Bay's contract with Plateful says we protect that data. Breaking these rules is serious.

## Customer data

- Data from Production, support tickets or client emails is **real customer data**, even when it looks like test data.
- Before you put a screenshot in Jira, an email or a chat: **mask** phone numbers, email addresses, home addresses and payment details. Example: `98XXXXXX21`.
- Never copy customer data into your own notes, personal email, or any AI tool (see the [AI usage policy](ai-usage-policy.md)).
- To reproduce a customer's bug, make your own test account with similar data on QA. Do not use the customer's details.

## Test data

- Create test data **only on QA**.
- Use the test accounts in [Test accounts and test data](test-accounts-and-data.md), or a new number of your own.
- Shared accounts: leave them as you found them (empty cart, default address).
- Do not change shared settings (feature flags, coupons, restaurant menus, open/closed) without telling the team in the channel. If you change one for a test, change it back.
- **Reset QA data** in Ops admin deletes everyone's data. Never use it without Priya's OK.

## Evidence files

Save screenshots and videos in `shared-drive/06 Evidence/` with the ticket number at the start of the file name, for example `PLAT-24_step4_phone.png`.
