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
    await page.waitForTimeout(2000);
    expect(await orderPage.status.textContent()).toBe('Preparing your food');
  });

});
});
