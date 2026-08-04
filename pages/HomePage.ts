import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly restaurantCards: Locator;
  readonly restaurantCount: Locator;
  readonly sortSelect: Locator;
  readonly searchBox: Locator;
  readonly citySelect: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByTestId('restaurants-heading');
    this.restaurantCards = page.getByTestId('restaurant-card');
    this.restaurantCount = page.getByTestId('restaurant-count');
    this.sortSelect = page.getByLabel('Sort by');
    this.searchBox = page.getByRole('searchbox', { name: 'Search for restaurants and dishes' });
    this.citySelect = page.getByLabel('City');
  }

  async open() {
    await this.page.goto('/');
  }

  filter(name: string): Locator {
    return this.page.getByRole('group', { name: 'Filters' }).getByRole('button', { name });
  }

  card(name: string): Locator {
    return this.restaurantCards.filter({ hasText: name });
  }

  async openRestaurant(name: string) {
    await this.card(name).click();
  }

  async search(text: string) {
    await this.searchBox.fill(text);
    await this.searchBox.press('Enter');
  }
}
