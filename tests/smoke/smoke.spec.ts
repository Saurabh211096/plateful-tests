import { test, expect } from '../../fixtures/test';
import { env } from '../../utils/env';
import { randomPhone, restaurants } from '../../utils/test-data';

// Quick checks after every deploy. Keep this file fast (under 1 minute).
test.describe('Smoke', () => {
  test('QA health check shows the environment and build @smoke', async ({ request }) => {
    const res = await request.get('/api/v1/health');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(body.env).toBe('qa');
    expect(body.build).toBeGreaterThan(0);
  });

  test('home page lists restaurants in Pune @smoke @phone', async ({ homePage }) => {
    await homePage.open();
    await expect(homePage.heading).toHaveText('Restaurants in Pune');
    await expect(homePage.restaurantCards.first()).toBeVisible();
    await expect(homePage.card(restaurants.main.name)).toBeVisible();
  });

  test('customer can log in with OTP @smoke @phone', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(randomPhone(), env.otp, 'Smoke Test User');
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('account-link')).toContainText('Smoke');
  });

  test('search finds a dish @smoke', async ({ searchPage }) => {
    await searchPage.open('paneer', 'dishes');
    await expect(searchPage.dish(restaurants.main.items.paneerTikka.name).first()).toBeVisible();
  });

  test('adding an item updates the cart count @smoke @phone', async ({ loggedInPage, restaurantPage }) => {
    await restaurantPage.open(restaurants.main.slug);
    await restaurantPage.add(restaurants.main.items.paneerTikka.name);
    await expect(restaurantPage.cartCount).toHaveText('1');
    void loggedInPage;
  });
});
