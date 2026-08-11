import { test, expect } from '../../fixtures/test';
import { restaurants } from '../../utils/test-data';

test.describe('Search', () => {
  test('dish search shows Paneer Tikka from Spice Route Kitchen', async ({ searchPage }) => {
    await searchPage.open('paneer tikka', 'dishes');
    const dish = searchPage.dish(restaurants.main.items.paneerTikka.name).filter({ hasText: restaurants.main.name });
    await expect(dish).toBeVisible();
    await expect(dish).toContainText('₹279');
  });

  test('restaurant search by name', async ({ searchPage }) => {
    await searchPage.open('dosa');
    await expect(searchPage.restaurantResults.filter({ hasText: restaurants.second.name })).toBeVisible();
  });

  test('no results message for text that matches nothing', async ({ searchPage, page }) => {
    await searchPage.open('xyzqwe');
    await expect(page.getByText('No restaurants found for "xyzqwe"')).toBeVisible();
  });

});
});
