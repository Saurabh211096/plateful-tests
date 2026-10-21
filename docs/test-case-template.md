# Test case template

Test cases live in the Excel workbook on the shared drive:
`shared-drive/02 Test Cases/Plateful_Test_Cases.xlsx`. One sheet per area of the app. The "Template" sheet shows an empty row and a filled example.

## Columns

| Column | What to write |
|---|---|
| TC ID | Area code + number, for example `CART-014`. Never reuse a deleted number |
| Title | What is checked, in a few words: "Coupon applies at exactly the minimum order" |
| Linked ticket | The Jira ticket, for example `PLAT-24` |
| Preconditions | What must be true before step 1: logged in, cart contents, account used |
| Steps | Numbered, one action per step, using the words on the screen |
| Test data | Exact values: coupon code, amount, phone number, card |
| Expected result | What should happen, specific enough to decide pass or fail |
| Priority | High (must run every release), Medium, Low |
| Type | Functional, Negative, Boundary, UI, Phone, API |
| Screen | Laptop, Phone, or Both |
| Automated | No, or the test file name |
| Author / Last updated | Your name and the date |

## Good test cases

- **One check per test case.** If it can fail in two different ways, it is two test cases.
- **Expected results you can check:** not "works correctly" but "the bill shows Coupon discount − ₹75 and To pay ₹344".
- **Boundaries:** for a rule like "₹10 to ₹200", test 9, 10, 200 and 201, plus 0, a decimal (10.5) and letters.
- **Negative cases:** what the user should *not* be able to do, and the exact error message.
- **Phone:** customer screens get a phone row (Screen = Phone) when the layout matters.

## Running test cases

Results go in the execution workbook for the release, `shared-drive/03 Test Execution/`, not in the test case workbook. For each run record: Pass, Fail, Blocked or Not run; the build; the date; your name; the bug number for a Fail; the reason for a Blocked.

## When a feature changes

Update the test case (and the "Last updated" column) in the same sprint. If a test case no longer applies, mark it **Retired** in the Status column instead of deleting the row.
