import { test, expect } from '../../fixtures/test';
import { SupportOrderPage } from '../../pages/support/SupportOrderPage';
import { accounts } from '../../utils/test-data';

test.describe('Support refunds', () => {
  test('support agent gives a partial refund', async ({ page, api, customer }) => {
    const order = await api.placePaidOrder(customer);
    const support = new SupportOrderPage(page);
    await support.login(accounts.support.email, accounts.support.password);
    await support.open(order.orderNo);
    await support.refund(50, 'Item missing: raita');
    await expect(support.toast('Refund initiated')).toBeVisible();
    await expect(support.refundedAmount).toHaveText('₹50');
  });

  test('a refund larger than the amount paid is rejected', async ({ api, customer }) => {
    const order = await api.placePaidOrder(customer);
    const token = await api.staffLogin('support');
    const res = await api.raw('POST', `/api/v1/support/orders/${order.orderNo}/refund`, { amount: order.total + 1, reason: 'Testing the limit' }, token);
    expect(res.status).toBe(422);
    expect(res.body.error.code).toBe('REFUND_EXCEEDS');
  });
});
