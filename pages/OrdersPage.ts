import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** My orders: /orders */
export class OrdersPage extends BasePage {
  readonly cards: Locator;

  constructor(page: Page) {
    super(page);
    this.cards = page.getByTestId('order-card');
  }

  async open() {
    await this.page.goto('/orders');
  }

  card(orderNo: string): Locator {
    return this.cards.filter({ hasText: orderNo });
  }
}
