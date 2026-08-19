import { test, expect } from '../../fixtures/test';
import { restaurants } from '../../utils/test-data';

const items = restaurants.main.items;

test.describe('Cart', () => {
  test('quantity can be increased and decreased', async ({ loggedInPage, restaurantPage }) => {
    await restaurantPage.open(restaurants.main.slug);
    await restaurantPage.add(items.paneerTikka.name);
    await restaurantPage.increase(items.paneerTikka.name);
    await expect(restaurantPage.qty(items.paneerTikka.name)).toHaveText('2');
    await restaurantPage.decrease(items.paneerTikka.name);
    await expect(restaurantPage.qty(items.paneerTikka.name)).toHaveText('1');
    void loggedInPage;
  });

  test('adding from another restaurant asks to replace the cart', async ({ loggedInPage: page, api, customer, restaurantPage }) => {
    await api.addToCart(customer, items.dalMakhani.name);
    await restaurantPage.open(restaurants.second.slug);
    await restaurantPage.add(restaurants.second.item);
    const dialog = page.getByRole('dialog', { name: 'Replace cart items?' });
    await expect(dialog).toContainText(restaurants.main.name);
    await dialog.getByRole('button', { name: 'Yes, start afresh' }).click();
    await expect(restaurantPage.cartSummary).toContainText(restaurants.second.name);
  });

  test('delivery is free when the item total is ₹499 or more', async ({ loggedInPage, api, customer, cartPage }) => {
    await api.addToCart(customer, items.butterChicken.name, 1); // 349
    await cartPage.open();
    await expect(cartPage.deliveryFee).toContainText('₹30');
    await api.addToCart(customer, items.paneerTikka.name, 1); // 349 + 279 = 628
    await cartPage.open();
    await expect(cartPage.deliveryFee).toContainText('FREE');
    void loggedInPage;
  });
});
