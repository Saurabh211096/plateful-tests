import { test, expect } from '../../fixtures/test';
import { PartnerOrdersPage } from '../../pages/partner/PartnerOrdersPage';
import { accounts } from '../../utils/test-data';

test.describe('Restaurant partner portal', () => {
  test('partner sees a new order and accepts it', async ({ page, api, customer }) => {
    const order = await api.placeCodOrder(customer);
    const partner = new PartnerOrdersPage(page);
    await partner.login(accounts.partner.email, accounts.partner.password);
    await expect(partner.order(order.orderNo)).toBeVisible();
    await partner.accept(order.orderNo);
    await partner.openTab('preparing');
    await expect(partner.order(order.orderNo)).toContainText('Preparing your food');
  });

  test('partner marks food ready', async ({ page, api, customer }) => {
    const order = await api.placeCodOrder(customer);
    await api.partnerAccept(order.orderNo);
    const partner = new PartnerOrdersPage(page);
    await partner.login(accounts.partner.email, accounts.partner.password);
    await partner.openTab('preparing');
    await partner.markReady(order.orderNo);
    await partner.openTab('ready');
    await expect(partner.order(order.orderNo)).toBeVisible();
  });
});
