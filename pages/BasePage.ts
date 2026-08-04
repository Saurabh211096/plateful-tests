import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly cartCount: Locator;
  readonly envStrip: Locator;
  readonly appVersion: Locator;

  constructor(protected readonly page: Page) {
    this.cartCount = page.locator('.cart-count');
    this.envStrip = page.getByTestId('env-strip');
    this.appVersion = page.getByTestId('app-version');
  }

  toast(text: string | RegExp): Locator {
    return this.page.locator('.toast', { hasText: text });
  }

  modalButton(name: string | RegExp): Locator {
    return this.page.getByRole('dialog').getByRole('button', { name });
  }
}
