import { test, expect } from '../../fixtures/test';
import { restaurants } from '../../utils/test-data';

test.describe('API: restaurants', () => {
  test('Pune list includes the automation restaurant', async ({ api }) => {
    const res = await api.raw('GET', '/api/v1/restaurants?city=pune');
    expect(res.status).toBe(200);
    expect(res.body.restaurants.map((r: { name: string }) => r.name)).toContain(restaurants.main.name);
  });

  test('veg filter returns only pure veg restaurants', async ({ api }) => {
    const res = await api.raw('GET', '/api/v1/restaurants?city=pune&veg=true');
    expect(res.status).toBe(200);
    expect(res.body.count).toBeGreaterThan(0);
    for (const r of res.body.restaurants) expect(r.isPureVeg).toBe(true);
  });

  test('unknown restaurant returns 404', async ({ api }) => {
    const res = await api.raw('GET', '/api/v1/restaurants/no-such-place');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('RESTAURANT_NOT_FOUND');
  });
});
