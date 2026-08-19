import { test, expect } from '../../fixtures/test';
import { restaurants } from '../../utils/test-data';

test.describe('Restaurant menu', () => {
  test('Veg only hides non-veg items', async ({ restaurantPage }) => {
    await restaurantPage.open(restaurants.main.slug);
    await expect(restaurantPage.item(restaurants.main.items.butterChicken.name)).toBeVisible();
    await restaurantPage.vegOnly.check();
    await expect(restaurantPage.item(restaurants.main.items.butterChicken.name)).toHaveCount(0);
    await expect(restaurantPage.item(restaurants.main.items.paneerTikka.name)).toBeVisible();
  });

  test('an unavailable item cannot be added', async ({ restaurantPage }) => {
    await restaurantPage.open(restaurants.withUnavailableItem.slug);
    const item = restaurantPage.item(restaurants.withUnavailableItem.item);
    await expect(item).toContainText('Currently unavailable');
    await expect(item.getByRole('button', { name: /^Add/ })).toHaveCount(0);
  });

  test('a closed restaurant shows when it opens', async ({ restaurantPage }) => {
    await restaurantPage.open(restaurants.closed.slug);
    await expect(restaurantPage.closedMessage).toContainText('closed right now');
  });
});
