// Which environment the tests run against. Default: QA on this laptop.
// Never run tests against Production: they create orders, carts and customers.
try {
  process.loadEnvFile('.env');
} catch {
  // no .env file: use the defaults below
}

export const env = {
  baseURL: (process.env.BASE_URL || 'http://localhost:4100').replace(/\/+$/, ''),
  otp: process.env.TEST_OTP || '123456',
};

if (/:4200\b/.test(env.baseURL) || /prod/i.test(env.baseURL)) {
  throw new Error(`Refusing to run tests against Production (${env.baseURL}). Set BASE_URL to the QA environment.`);
}
