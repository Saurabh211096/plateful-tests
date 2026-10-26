import { test, expect } from '../../fixtures/test';
import { restaurants } from '../../utils/test-data';

const items = restaurants.main.items;

test.describe('Coupons', () => {
  test('WELCOME75 gives ₹75 off on ₹299 and above', async ({ loggedInPage, api, customer, cartPage }) => {
    await api.addToCart(customer, items.butterChicken.name); // 349
    await cartPage.open();
    await cartPage.applyCoupon('WELCOME75');
    await expect(cartPage.couponApplied).toContainText('WELCOME75 applied');
    await expect(cartPage.discount).toContainText('₹75');
    void loggedInPage;
  });

  test('an expired coupon is rejected', async ({ loggedInPage, api, customer, cartPage }) => {
    await api.addToCart(customer, items.butterChicken.name, 2);
    await cartPage.open();
    await cartPage.applyCoupon('DUSSEHRA100');
    await expect(cartPage.couponMessage).toHaveText('This coupon has expired');
    void loggedInPage;
  });

  test('TREAT40 below the minimum order tells how much more to add', async ({ loggedInPage, api, customer, cartPage }) => {
    await api.addToCart(customer, items.gulabJamun.name); // 99, minimum is 199
    await cartPage.open();
    await cartPage.applyCoupon('TREAT40');
    await expect(cartPage.couponMessage).toHaveText('Add items worth ₹100 more to use this coupon');
    void loggedInPage;
  });

  // Boundary: the minimum order value itself must be accepted
  test('TREAT40 applies when the item total is exactly ₹199', async ({ loggedInPage, api, customer, cartPage }) => {
    await api.addToCart(customer, items.vegPulao.name); // exactly 199
    await cartPage.open();
    await cartPage.applyCoupon('TREAT40');
    await expect(cartPage.couponApplied).toContainText('TREAT40 applied');
    void loggedInPage;
  });
});
