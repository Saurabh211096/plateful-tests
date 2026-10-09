import { test, expect } from '../../fixtures/test';

test.describe('Cancel order', () => {
  test('customer can cancel before the restaurant accepts', async ({ loggedInPage, api, customer, orderPage }) => {
    const order = await api.placeCodOrder(customer);
    await orderPage.open(order.orderNo);
    await orderPage.cancel();
    await expect(orderPage.status).toHaveText('Cancelled');
    void loggedInPage;
  });

  test('cancel is not offered after the restaurant accepts', async ({ loggedInPage, api, customer, orderPage }) => {
    const order = await api.placeCodOrder(customer);
    await api.partnerAccept(order.orderNo);
    await orderPage.open(order.orderNo);
    await expect(orderPage.status).toHaveText('Preparing your food');
    await expect(orderPage.cancelButton).toHaveCount(0);
    void loggedInPage;
  });
});
