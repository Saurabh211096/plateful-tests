import { test, expect } from '../../fixtures/test';

test.describe('Order tracking', () => {
  test('timeline shows when the order was placed', async ({ loggedInPage, api, customer, orderPage }) => {
    const order = await api.placeCodOrder(customer);
    await orderPage.open(order.orderNo);
    await expect(orderPage.timeline).toContainText('Order placed');
    void loggedInPage;
  });

  test('status changes to Preparing when the restaurant accepts', async ({ loggedInPage: page, api, customer, orderPage }) => {
    const order = await api.placeCodOrder(customer);
    await orderPage.open(order.orderNo);
    await expect(orderPage.status).toHaveText('Order placed');
    await api.partnerAccept(order.orderNo);
    // the tracking page refreshes on its own, so give it time
    // (was 2000, increased to 2600 because it failed sometimes on the nightly run)
    await page.waitForTimeout(2600);
    expect(await orderPage.status.textContent()).toBe('Preparing your food');
  });

  test('delivered order shows Delivered', async ({ loggedInPage, api, customer, orderPage }) => {
    const order = await api.placeCodOrder(customer);
    for (let i = 0; i < 4; i++) await api.advanceOrder(order.orderNo);
    await orderPage.open(order.orderNo);
    await expect(orderPage.status).toHaveText('Delivered');
    void loggedInPage;
  });
});
