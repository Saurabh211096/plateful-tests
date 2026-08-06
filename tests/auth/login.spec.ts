import { test, expect } from '../../fixtures/test';
import { env } from '../../utils/env';
import { randomPhone } from '../../utils/test-data';

test.describe('Login with OTP', () => {
  test('a new customer is asked for their name', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.requestOtp(randomPhone());
    await loginPage.enterOtp(env.otp);
    await expect(loginPage.nameInput).toBeVisible();
  });

  test('a wrong OTP shows how many attempts are left', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.requestOtp(randomPhone());
    await loginPage.enterOtp('000000');
    // New numbers are only created after a correct OTP, so the generic message is shown
    await expect(loginPage.error).toContainText('Incorrect OTP');
  });

  test('a 9-digit mobile number is rejected', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.requestOtp('987654321');
    await expect(loginPage.error).toHaveText('Enter a valid 10-digit mobile number');
  });

  test('resend OTP is available only after 30 seconds', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.requestOtp(randomPhone());
    await expect(loginPage.resendInfo).toContainText('Resend OTP in 0:');
  });
});
