import { test, expect } from '../../fixtures/test';

test.describe('Cancel order', () => {
  test('customer can cancel before the restaurant accepts', async ({ loggedInPage, api, customer, orderPage }) => {
    const order = await api.placeCodOrder(customer);
    await orderPage.open(order.orderNo);
    await orderPage.cancel('Ordered by mistake');
    await expect(orderPage.status).toHaveText('Cancelled');
    void loggedInPage;
  });

  test('a prepaid order is refunded in full when cancelled', async ({ loggedInPage, api, customer, orderPage }) => {
    const order = await api.placePaidOrder(customer);
    await orderPage.open(order.orderNo);
    await orderPage.cancel('Delivery time is too long');
    await expect(orderPage.status).toHaveText('Cancelled');
    await expect(orderPage.refundRows.first()).toContainText(`₹${order.total.toLocaleString('en-IN')}`);
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
