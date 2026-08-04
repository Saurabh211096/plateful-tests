import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RestaurantPage extends BasePage {
  readonly name: Locator;
  readonly menuItems: Locator;
  readonly vegOnly: Locator;
  readonly closedMessage: Locator;
  readonly cartSummary: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.name = page.getByTestId('restaurant-name');
    this.menuItems = page.getByTestId('menu-item');
    this.vegOnly = page.getByLabel('Veg only');
    this.closedMessage = page.getByTestId('restaurant-closed');
    this.cartSummary = page.getByTestId('cart-summary');
    this.checkoutButton = this.cartSummary.getByRole('link', { name: 'Checkout' });
  }

  async open(slug: string) {
    await this.page.goto(`/restaurant/${slug}`);
  }

  item(name: string): Locator {
    return this.menuItems.filter({ has: this.page.getByRole('heading', { name, exact: true }) });
  }

  async add(name: string) {
    await this.page.getByRole('button', { name: `Add ${name}`, exact: true }).click();
  }

  async increase(name: string) {
    await this.page.getByRole('button', { name: `Increase quantity of ${name}` }).first().click();
  }

  async decrease(name: string) {
    await this.page.getByRole('button', { name: `Decrease quantity of ${name}` }).first().click();
  }

  qty(name: string): Locator {
    return this.item(name).getByTestId('item-qty');
  }
}
