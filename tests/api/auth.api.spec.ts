import { test, expect } from '../../fixtures/test';
import { randomPhone } from '../../utils/test-data';

test.describe('API: authentication', () => {
  test('OTP send rejects an invalid phone number', async ({ api }) => {
    const res = await api.raw('POST', '/api/v1/auth/otp/send', { phone: '12345' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('INVALID_PHONE');
  });

  test('a wrong OTP is rejected with 401', async ({ api }) => {
    const phone = randomPhone();
    await api.raw('POST', '/api/v1/auth/otp/send', { phone });
    const res = await api.raw('POST', '/api/v1/auth/otp/verify', { phone, otp: '000000' });
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('OTP_INVALID');
  });

  test('asking for a new OTP within 30 seconds is refused', async ({ api }) => {
    const phone = randomPhone();
    await api.raw('POST', '/api/v1/auth/otp/send', { phone });
    const res = await api.raw('POST', '/api/v1/auth/otp/send', { phone });
    expect(res.status).toBe(429);
    expect(res.body.error.code).toBe('OTP_RESEND_WAIT');
  });

  test('a protected endpoint needs a token', async ({ api }) => {
    const res = await api.raw('GET', '/api/v1/cart');
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  test('the login token works on /me', async ({ api, customer }) => {
    const res = await api.raw('GET', '/api/v1/me', undefined, customer.token);
    expect(res.status).toBe(200);
    expect(res.body.phone).toBe(customer.phone);
  });
});
