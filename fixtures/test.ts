import { test as base, expect, Page } from '@playwright/test';
import { ApiClient, TestCustomer } from '../utils/api-client';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { RestaurantPage } from '../pages/RestaurantPage';
import { CartPage } from '../pages/CartPage';
import { PaymentPage } from '../pages/PaymentPage';
import { OrderPage } from '../pages/OrderPage';
import { OrdersPage } from '../pages/OrdersPage';

type Fixtures = {
  api: ApiClient;
  /** A fresh customer created through the API (new phone number, Pune address, empty cart). */
  customer: TestCustomer;
  /** The browser page, already logged in as `customer`. */
  loggedInPage: Page;
  loginPage: LoginPage;
  homePage: HomePage;
  searchPage: SearchPage;
  restaurantPage: RestaurantPage;
  cartPage: CartPage;
  paymentPage: PaymentPage;
  orderPage: OrderPage;
  ordersPage: OrdersPage;
};

export const test = base.extend<Fixtures>({
  api: async ({ request }, use) => {
    await use(new ApiClient(request));
  },
  customer: async ({ api }, use) => {
    await use(await api.createCustomer());
  },
  loggedInPage: async ({ page, customer }, use) => {
    await page.addInitScript((token) => window.localStorage.setItem('pf_token', token), customer.token);
    await use(page);
  },
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  searchPage: async ({ page }, use) => use(new SearchPage(page)),
  restaurantPage: async ({ page }, use) => use(new RestaurantPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  paymentPage: async ({ page }, use) => use(new PaymentPage(page)),
  orderPage: async ({ page }, use) => use(new OrderPage(page)),
  ordersPage: async ({ page }, use) => use(new OrdersPage(page)),
});

export { expect };
