import { test, expect } from '../../fixtures/test';
import { restaurants } from '../../utils/test-data';

test.describe('Checkout with cash on delivery', () => {
  test('COD order is placed without the payment page @phone', async ({ loggedInPage: page, api, customer, cartPage, orderPage }) => {
    await api.addToCart(customer, restaurants.main.items.paneerTikka.name);
    await cartPage.open();
    await cartPage.selectPayment('Cash on delivery');
    await cartPage.proceedToPay();
    await expect(page).toHaveURL(/\/orders\/PF\d+\?placed=1/);
    await expect(orderPage.status).toHaveText('Order placed');
  });
});
