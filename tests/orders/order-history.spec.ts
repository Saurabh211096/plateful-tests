import { test, expect } from '../../fixtures/test';

test.describe('My orders', () => {
  test('a placed order appears in My orders', async ({ loggedInPage, api, customer, ordersPage }) => {
    const order = await api.placeCodOrder(customer);
    await ordersPage.open();
    await expect(ordersPage.card(order.orderNo)).toBeVisible();
    await expect(ordersPage.card(order.orderNo)).toContainText('Order placed');
    void loggedInPage;
  });
});
