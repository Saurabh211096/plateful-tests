import restaurants from '../test-data/restaurants.json';
import accounts from '../test-data/accounts.json';

export { restaurants, accounts };

/** A random mobile number in the automation range (97xxxxxxxx), so tests never clash with shared accounts. */
export function randomPhone(): string {
  return '97' + String(Math.floor(Math.random() * 1e8)).padStart(8, '0');
}

export const testAddress = {
  label: 'Home',
  line1: 'Flat 7, Automation Heights',
  line2: 'Baner Road',
  landmark: 'Near Balewadi High Street',
  city: 'pune',
  pincode: '411045',
};
