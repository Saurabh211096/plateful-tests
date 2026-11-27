# Checking through the API (Postman)

The screens of Plateful do not hold the data. They ask the **API** for it: the app sends a **request** to the server, and the server sends back a **response**. With Postman you send the same requests yourself and read the answer directly. This finds bugs that a screen hides, and shows exactly what went wrong when a screen only says "Something went wrong".

All requests on QA start with `http://localhost:4100`. The list of requests is on the [API docs page](http://localhost:4100/api-docs). Never send requests to Production.

## A request has four parts

| Part | Example |
|---|---|
| **Method** | `GET` reads something. `POST` creates or does something. `PATCH` and `PUT` change something. `DELETE` removes it |
| **URL** | `http://localhost:4100/api/v1/search?city=pune&q=paneer` (after the `?` come the **parameters**) |
| **Headers** | Extra lines such as the login token |
| **Body** | The data you send with POST, PATCH or PUT, written as JSON: `{ "phone": "9876543210" }` |

## A response has two parts you always read

1. The **status code**, a number:

| Code | Meaning |
|---|---|
| 200, 201 | It worked (201 = something was created) |
| 400 | The request is wrong (a missing or bad value) |
| 401 | Not logged in: the token is missing or old |
| 404 | No such thing (wrong URL, or it does not exist) |
| 422 | The request is fine, but a rule of Plateful says no (for example: the cart is below the coupon's minimum) |
| 500 | The server crashed. **Always a bug**, whatever was sent |

2. The **body**, as JSON: names and values, for example `"suggestion": "paneer"`. An error has `"code"` and `"message"`.

## Logging in as a customer

1. `POST /api/v1/auth/otp/send` with the body `{ "phone": "<your test number>" }`.
2. `POST /api/v1/auth/otp/verify` with the body `{ "phone": "<your test number>", "otp": "123456" }`. The response has a **token**: a long text that proves who you are.
3. For every request that needs a login: Authorization tab, type **Bearer Token**, paste the token.

Staff (partner, support, admin): `POST /api/v1/auth/staff/login` with `{ "email": "...", "password": "..." }` from [Test accounts](test-accounts-and-data.md). The response has a token, used the same way.

A token is like a password for one login. Do not paste it into tickets, chats or the AI seat.

## In a bug report

Add the request (method and URL), the body you sent, the status code, and the response body. If the request came from the browser: Network tab, right-click the request, Copy, **Copy as cURL**, and in Postman: Import, paste.

## Times in responses

Times end with `Z`: that is UTC. India time is 5 hours 30 minutes later. `2026-12-04T00:30:00.000Z` is 6:00 am in India.
