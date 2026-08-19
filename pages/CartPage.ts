import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export type PaymentMethod = 'UPI' | 'Credit or debit card' | 'Cash on delivery';

export class CartPage extends BasePage {
  readonly heading: Locator;
  readonly lines: Locator;
  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;
  readonly couponMessage: Locator;
  readonly couponApplied: Locator;
  readonly itemTotal: Locator;
  readonly deliveryFee: Locator;
  readonly discount: Locator;
  readonly total: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Checkout' });
    this.lines = page.getByTestId('cart-line');
    this.couponInput = page.getByLabel('Coupon code');
    this.applyCouponButton = page.getByRole('button', { name: 'Apply', exact: true });
    this.couponMessage = page.getByTestId('coupon-message');
    this.couponApplied = page.getByTestId('coupon-applied');
    this.itemTotal = page.getByTestId('bill-item-total');
    this.deliveryFee = page.getByTestId('bill-delivery-fee');
    this.discount = page.getByTestId('bill-discount');
    this.total = page.getByTestId('bill-total');
    this.emptyMessage = page.getByRole('heading', { name: 'Your cart is empty' });
  }

  async open() {
    await this.page.goto('/cart');
  }

  async applyCoupon(code: string) {
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
  }

  async removeCoupon() {
    await this.couponApplied.getByRole('button', { name: 'Remove' }).click();
  }

  async selectPayment(method: PaymentMethod) {
    await this.page.getByRole('radio', { name: new RegExp(`^${method}`) }).check();
  }

  async proceedToPay() {
    await this.page.getByRole('button', { name: 'Proceed to pay' }).click();
  }

  /** Reads a bill amount like "₹1,234" as a number. */
  async amount(row: Locator): Promise<number> {
    const text = (await row.locator('span').last().textContent()) ?? '';
    return Number(text.replace(/[^\d]/g, ''));
  }
}
