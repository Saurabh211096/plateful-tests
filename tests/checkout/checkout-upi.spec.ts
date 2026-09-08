import { test, expect } from '../../fixtures/test';
import { payment, restaurants } from '../../utils/test-data';

test.describe('Checkout with UPI', () => {
  test.beforeEach(async ({ api, customer }) => {
    await api.addToCart(customer, restaurants.main.items.butterChicken.name);
  });

  test('successful UPI payment places the order', async ({ loggedInPage: page, cartPage, paymentPage, orderPage }) => {
    await cartPage.open();
    await cartPage.selectPayment('UPI');
    await cartPage.proceedToPay();
    await expect(paymentPage.amount).toBeVisible();
    await paymentPage.payWithUpi(payment.upi.success);
    await expect(page).toHaveURL(/\/orders\/PF\d+\?payment=success/);
    await expect(orderPage.paymentBanner).toContainText('Payment successful');
    await expect(orderPage.status).toHaveText('Order placed');
  });

  test('failed UPI payment keeps the cart', async ({ loggedInPage: page, api, customer, cartPage, paymentPage, orderPage }) => {
    await cartPage.open();
    await cartPage.selectPayment('UPI');
    await cartPage.proceedToPay();
    await paymentPage.payWithUpi(payment.upi.failure);
    await expect(page).toHaveURL(/payment=failed/);
    await expect(orderPage.paymentBanner).toContainText('Payment failed');
    const cart = await api.cart(customer);
    expect(cart.items).toHaveLength(1);
  });
});
