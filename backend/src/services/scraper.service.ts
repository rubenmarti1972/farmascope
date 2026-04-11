import { DistributorPrice } from '../types';
import { generateMockPrices } from '../data/mock-data';
import { VaamedScraper } from '../scrapers/vaamed.scraper';

/**
 * ScraperService orchestrates all distributor scrapers.
 * Uses real scrapers when credentials are configured,
 * falls back to mock data otherwise.
 */
export class ScraperService {
  private readonly vaamedScraper = new VaamedScraper();
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    await this.vaamedScraper.initialize();
    this.initialized = true;
  }

  async getPricesForProduct(productId: string, productName: string, genericName: string): Promise<DistributorPrice[]> {
    if (!this.initialized) {
      await this.initialize();
    }

    const hasRealCredentials = !!process.env['VAAMED_EMAIL'];

    if (hasRealCredentials) {
      console.log(`[Scraper] Fetching real prices for: ${productName}`);
      const vaamedPrice = await this.vaamedScraper.getPrice(productId, productName, genericName);
      // TODO: Add more distributor scrapers here as they become available
      // const behrensPrice = await this.behrensScraper.getPrice(...);
      return [vaamedPrice];
    }

    // Fall back to mock data when no credentials are configured
    await this.simulateDelay(800);
    console.log(`[Scraper] Using mock prices for: ${productName}`);
    return generateMockPrices(productId);
  }

  async close(): Promise<void> {
    await this.vaamedScraper.close();
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
