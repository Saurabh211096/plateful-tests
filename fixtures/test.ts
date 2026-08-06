import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { RestaurantPage } from '../pages/RestaurantPage';

type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  restaurantPage: RestaurantPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  restaurantPage: async ({ page }, use) => use(new RestaurantPage(page)),
});

export { expect };
