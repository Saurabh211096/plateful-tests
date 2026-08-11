import { test, expect } from '../../fixtures/test';

test.describe('Restaurant filters and sorting', () => {
  test('Pure Veg filter shows only pure veg restaurants', async ({ homePage }) => {
    await homePage.open();
    await homePage.filter('Pure Veg').click();
    await expect(homePage.filter('Pure Veg')).toHaveAttribute('aria-pressed', 'true');
    await expect(homePage.restaurantCount).toContainText('restaurant');
    const cards = homePage.restaurantCards;
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i)).toContainText('Pure Veg');
    }
  });

  test('sort by rating shows the highest rated restaurant first', async ({ homePage, page }) => {
    await homePage.open();
    await homePage.sortSelect.selectOption('rating');
    await expect(homePage.restaurantCards.first()).toBeVisible();
    await page.waitForLoadState('networkidle');
    const ratings = await homePage.restaurantCards.locator('.rating').allTextContents();
    const values = ratings.map((r) => Number(r.replace(/[^\d.]/g, '')));
    expect(values).toEqual([...values].sort((a, b) => b - a));
  });
});
