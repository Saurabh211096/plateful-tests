import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Order details and tracking page: /orders/{orderNo} */
export class OrderPage extends BasePage {
  readonly status: Locator;
  readonly eta: Locator;
  readonly paymentBanner: Locator;
  readonly timeline: Locator;
  readonly cancelButton: Locator;
  readonly getHelpButton: Locator;
  readonly refundRows: Locator;
  readonly paymentStatus: Locator;

  constructor(page: Page) {
    super(page);
    this.status = page.getByTestId('order-status');
    this.eta = page.getByTestId('order-eta');
    this.paymentBanner = page.getByTestId('payment-banner');
    this.timeline = page.getByTestId('order-timeline');
    this.cancelButton = page.getByRole('button', { name: 'Cancel order' });
    this.getHelpButton = page.getByRole('button', { name: 'Get help' });
    this.refundRows = page.getByTestId('refund-row');
    this.paymentStatus = page.getByTestId('payment-status');
  }

  async open(orderNo: string) {
    await this.page.goto(`/orders/${orderNo}`);
  }

  async cancel() {
    await this.cancelButton.click();
    await this.page.getByRole('dialog').getByRole('button', { name: 'Yes, cancel order' }).click();
  }
}
