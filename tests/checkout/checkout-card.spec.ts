import { test, expect } from '../../fixtures/test';
import { payment, restaurants } from '../../utils/test-data';

test.describe('Checkout with card', () => {
  test.beforeEach(async ({ api, customer }) => {
    await api.addToCart(customer, restaurants.main.items.dalMakhani.name, 2);
  });

  test('test Visa card payment places the order', async ({ loggedInPage: page, cartPage, paymentPage, orderPage }) => {
    await cartPage.open();
    await cartPage.selectPayment('Credit or debit card');
    await cartPage.proceedToPay();
    await paymentPage.payWithCard(payment.cards.visaSuccess);
    await expect(page).toHaveURL(/payment=success/);
    await expect(orderPage.status).toHaveText('Order placed');
  });

  test('a declined card shows the reason', async ({ loggedInPage: page, cartPage, paymentPage, orderPage }) => {
    await cartPage.open();
    await cartPage.selectPayment('Credit or debit card');
    await cartPage.proceedToPay();
    await paymentPage.payWithCard(payment.cards.declined);
    await expect(page).toHaveURL(/payment=failed/);
    await expect(orderPage.paymentBanner).toContainText('Card declined by the issuing bank');
  });
});
