import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/** Support console order page: /support/orders/{orderNo} */
export class SupportOrderPage extends BasePage {
  readonly refundButton: Locator;
  readonly refundedAmount: Locator;
  readonly refundableAmount: Locator;

  constructor(page: Page) {
    super(page);
    this.refundButton = page.getByRole('button', { name: 'Refund', exact: true });
    this.refundedAmount = page.getByTestId('refunded-amount');
    this.refundableAmount = page.getByTestId('refundable-amount');
  }

  async login(email: string, password: string) {
    await this.page.goto('/support');
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async open(orderNo: string) {
    await this.page.goto(`/support/orders/${orderNo}`);
  }

  async refund(amount: number, reason: string) {
    await this.refundButton.click();
    const dialog = this.page.getByRole('dialog');
    await dialog.getByLabel('Amount (₹)').fill(String(amount));
    await dialog.getByLabel('Reason').fill(reason);
    await dialog.getByRole('button', { name: 'Refund' }).click();
  }
}
