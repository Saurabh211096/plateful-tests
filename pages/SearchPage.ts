import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  readonly summary: Locator;
  readonly dishResults: Locator;
  readonly restaurantResults: Locator;

  constructor(page: Page) {
    super(page);
    this.summary = page.getByTestId('search-summary');
    this.dishResults = page.getByTestId('dish-result');
    this.restaurantResults = page.getByTestId('restaurant-card');
  }

  async open(query: string, tab: 'restaurants' | 'dishes' = 'restaurants') {
    await this.page.goto(`/search?q=${encodeURIComponent(query)}${tab === 'dishes' ? '&tab=dishes' : ''}`);
  }

  tab(name: 'Restaurants' | 'Dishes'): Locator {
    return this.page.getByRole('tab', { name: new RegExp(`^${name}`) });
  }

  dish(name: string): Locator {
    return this.dishResults.filter({ has: this.page.getByRole('heading', { name, exact: true }) });
  }
}
