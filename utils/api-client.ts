import { APIRequestContext, expect } from '@playwright/test';
import { env } from './env';
import { randomPhone, restaurants, testAddress } from './test-data';

export type TestCustomer = { phone: string; name: string; token: string; addressId: number };
type MenuItem = { id: number; name: string; price: number; isAvailable: boolean };

/**
 * Talks to the Plateful API directly. Use it to SET UP test data quickly
 * (customers, carts, orders) so that UI tests only check the screen under test.
 */
export class ApiClient {
  constructor(private request: APIRequestContext) {}

  private async call<T = any>(method: string, path: string, body?: unknown, token?: string): Promise<T> {
    const res = await this.request.fetch(`${env.baseURL}${path}`, {
      method,
      data: body,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const json = await res.json().catch(() => null);
    if (!res.ok()) {
      throw new Error(`${method} ${path} -> ${res.status()} ${JSON.stringify(json)}`);
    }
    return json as T;
  }

  /** Raw call that does not throw: for API tests that check error responses. */
  async raw(method: string, path: string, body?: unknown, token?: string) {
    const res = await this.request.fetch(`${env.baseURL}${path}`, { method, data: body, headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return { status: res.status(), body: await res.json().catch(() => null) };
  }

  // ---------- customers ----------
  async login(phone: string): Promise<{ token: string; isNewUser: boolean }> {
    await this.call('POST', '/api/v1/auth/otp/send', { phone });
    return this.call('POST', '/api/v1/auth/otp/verify', { phone, otp: env.otp });
  }

  /** Creates a brand-new customer with a Pune address and an empty cart. */
  async createCustomer(name = 'Auto Test User'): Promise<TestCustomer> {
    const phone = randomPhone();
    const { token } = await this.login(phone);
    await this.call('PATCH', '/api/v1/me', { name }, token);
    const address = await this.call<{ id: number }>('POST', '/api/v1/addresses', testAddress, token);
    return { phone, name, token, addressId: address.id };
  }

  async menu(slug: string): Promise<MenuItem[]> {
    const r = await this.call<{ menu: { items: MenuItem[] }[] }>('GET', `/api/v1/restaurants/${slug}`);
    return r.menu.flatMap((c) => c.items);
  }

  async itemId(slug: string, name: string): Promise<number> {
    const item = (await this.menu(slug)).find((i) => i.name === name);
    expect(item, `menu item "${name}" in ${slug}`).toBeTruthy();
    return item!.id;
  }

  async addToCart(c: TestCustomer, itemName: string, qty = 1, slug = restaurants.main.slug) {
    const itemId = await this.itemId(slug, itemName);
    return this.call('POST', '/api/v1/cart/items', { itemId, qty }, c.token);
  }

  async clearCart(c: TestCustomer) {
    return this.call('DELETE', '/api/v1/cart', undefined, c.token);
  }

  async cart(c: TestCustomer) {
    return this.call('GET', '/api/v1/cart', undefined, c.token);
  }
}
