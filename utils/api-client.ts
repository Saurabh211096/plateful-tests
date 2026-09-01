import { APIRequestContext, expect } from '@playwright/test';
import { env } from './env';
import { accounts, randomPhone, restaurants, testAddress } from './test-data';

export type TestCustomer = { phone: string; name: string; token: string; addressId: number };
export type PlacedOrder = { orderNo: string; total: number; paymentRef?: string };
type MenuItem = { id: number; name: string; price: number; isAvailable: boolean };

/**
 * Talks to the Plateful API directly. Use it to SET UP test data quickly
 * (customers, carts, orders) so that UI tests only check the screen under test.
 */
export class ApiClient {
  private staffTokens: Record<string, string> = {};

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

  /** Places a cash-on-delivery order from Spice Route Kitchen. */
  async placeCodOrder(c: TestCustomer, items: { name: string; qty?: number }[] = [{ name: restaurants.main.items.paneerTikka.name }]): Promise<PlacedOrder> {
    await this.clearCart(c);
    for (const it of items) await this.addToCart(c, it.name, it.qty ?? 1);
    const res = await this.call<{ order: { orderNo: string; bill: { total: number } } }>('POST', '/api/v1/orders', { addressId: c.addressId, paymentMethod: 'cod' }, c.token);
    return { orderNo: res.order.orderNo, total: res.order.bill.total };
  }

  async order(c: TestCustomer, orderNo: string) {
    return this.call('GET', `/api/v1/orders/${orderNo}`, undefined, c.token);
  }

  // ---------- staff ----------
  async staffLogin(role: 'partner' | 'support' | 'admin'): Promise<string> {
    if (!this.staffTokens[role]) {
      const acc = accounts[role];
      const r = await this.call<{ token: string }>('POST', '/api/v1/auth/staff/login', { email: acc.email, password: acc.password });
      this.staffTokens[role] = r.token;
    }
    return this.staffTokens[role];
  }

  async partnerAccept(orderNo: string, prepMinutes = 20) {
    return this.call('POST', `/api/v1/partner/orders/${orderNo}/accept`, { prepMinutes }, await this.staffLogin('partner'));
  }
}
