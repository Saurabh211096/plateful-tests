import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

/** Restaurant partner portal: /partner */
export class PartnerOrdersPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    await this.page.goto('/partner');
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async openTab(tab: 'new' | 'preparing' | 'ready' | 'completed') {
    await this.page.goto(`/partner?tab=${tab}`);
  }

  order(orderNo: string): Locator {
    return this.page.locator(`[data-testid="partner-order"][data-order-no="${orderNo}"]`);
  }

  async accept(orderNo: string) {
    await this.order(orderNo).getByRole('button', { name: 'Accept' }).click();
  }

  async markReady(orderNo: string) {
    await this.order(orderNo).getByRole('button', { name: 'Mark food ready' }).click();
  }
}
