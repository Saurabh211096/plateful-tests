import { test, expect } from '../../fixtures/test';
import { restaurants } from '../../utils/test-data';

test.describe('API: cart', () => {
  test('quantity above 10 is rejected', async ({ api, customer }) => {
    const itemId = await api.itemId(restaurants.main.slug, restaurants.main.items.butterNaan.name);
    const res = await api.raw('POST', '/api/v1/cart/items', { itemId, qty: 11 }, customer.token);
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('QTY_LIMIT');
  });

  test('bill adds packaging, platform fee and GST', async ({ api, customer }) => {
    const cart = await api.addToCart(customer, restaurants.main.items.paneerTikka.name, 1);
    const b = cart.bill;
    expect(b.itemTotal).toBe(279);
    expect(b.packagingFee).toBe(restaurants.main.packagingFee);
    expect(b.platformFee).toBe(5);
    expect(b.gst).toBe(Math.round((279 + 20) * 0.05));
    expect(b.total).toBe(b.itemTotal + b.packagingFee + b.deliveryFee + b.platformFee + b.gst - b.discount + (b.tip ?? 0));
  });

  test('coupon below minimum order returns COUPON_MIN_ORDER', async ({ api, customer }) => {
    await api.addToCart(customer, restaurants.main.items.masalaChaas.name, 1); // 69
    const res = await api.raw('POST', '/api/v1/cart/coupon', { code: 'WELCOME75' }, customer.token);
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('COUPON_MIN_ORDER');
  });
});
