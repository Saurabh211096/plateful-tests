import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

type Card = { number: string; expiry: string; cvv: string; name: string };

/** The PayEase gateway page (test mode on QA). */
export class PaymentPage extends BasePage {
  readonly amount: Locator;
  readonly upiInput: Locator;
  readonly payButton: Locator;
  readonly cancelButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.amount = page.getByTestId('pay-amount');
    this.upiInput = page.getByLabel('UPI ID');
    this.payButton = page.getByRole('button', { name: /^Pay ₹/ });
    this.cancelButton = page.getByRole('button', { name: 'Cancel payment' });
    this.error = page.getByRole('alert');
  }

  async payWithUpi(upiId: string) {
    await this.upiInput.fill(upiId);
    await this.payButton.click();
  }

  async payWithCard(card: Card) {
    await this.page.getByLabel('Card number').fill(card.number);
    await this.page.getByLabel('Expiry (MM/YY)').fill(card.expiry);
    await this.page.getByLabel('CVV').fill(card.cvv);
    await this.page.getByLabel('Name on card').fill(card.name);
    await this.payButton.click();
  }
}
