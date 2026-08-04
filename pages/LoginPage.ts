import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly mobileInput: Locator;
  readonly getOtpButton: Locator;
  readonly otpInput: Locator;
  readonly verifyButton: Locator;
  readonly nameInput: Locator;
  readonly continueButton: Locator;
  readonly error: Locator;
  readonly resendInfo: Locator;

  constructor(page: Page) {
    super(page);
    this.mobileInput = page.getByLabel('Mobile number');
    this.getOtpButton = page.getByRole('button', { name: 'Get OTP' });
    this.otpInput = page.getByLabel('OTP');
    this.verifyButton = page.getByRole('button', { name: 'Verify and continue' });
    this.nameInput = page.getByLabel('Full name');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.error = page.getByTestId('login-error');
    this.resendInfo = page.locator('#resend');
  }

  async open() {
    await this.page.goto('/login');
  }

  async requestOtp(phone: string) {
    await this.mobileInput.fill(phone);
    await this.getOtpButton.click();
  }

  async enterOtp(otp: string) {
    await this.otpInput.fill(otp);
    await this.verifyButton.click();
  }

  /** Full login. For a new number, also fills the name step. */
  async login(phone: string, otp: string, name = 'Auto Test User') {
    await this.requestOtp(phone);
    await this.enterOtp(otp);
    // A new customer gets the name step; an existing one goes straight back to the app
    await expect(this.nameInput.or(this.page.getByTestId('account-link'))).toBeVisible();
    if (await this.nameInput.isVisible()) {
      await this.nameInput.fill(name);
      await this.continueButton.click();
    }
  }
}
