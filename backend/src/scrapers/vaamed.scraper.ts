import * as path from 'path';
import { Epedidosa2Scraper, Epedidosa2Config } from './epedidosa2.scraper';
import { DistributorPrice } from '../types';

const SESSIONS_DIR = path.resolve(__dirname, '../../.sessions');

/**
 * Scraper for VAAMED C.A. — Venezuelan pharmaceutical distributor.
 * Uses the ePedidosa2 platform.
 *
 * TODO: Set VAAMED_EMAIL and VAAMED_PASSWORD environment variables.
 */
export class VaamedScraper {
  private readonly scraper: Epedidosa2Scraper;

  constructor() {
    const config: Epedidosa2Config = {
      distributorId: 'vaamed',
      distributorName: 'VAAMED',
      baseUrl: 'https://vaamed.epedidosa2.net',
      email: process.env['VAAMED_EMAIL'] ?? '',
      password: process.env['VAAMED_PASSWORD'] ?? '',
      sessionFile: path.join(SESSIONS_DIR, 'vaamed_session.json'),
    };
    this.scraper = new Epedidosa2Scraper(config);
  }

  async initialize(): Promise<void> {
    if (!process.env['VAAMED_EMAIL'] || !process.env['VAAMED_PASSWORD']) {
      console.warn('[VAAMED] Credentials not set. Skipping initialization.');
      return;
    }
    await this.scraper.initialize();
  }

  async getPrice(productId: string, productName: string, genericName: string): Promise<DistributorPrice> {
    if (!process.env['VAAMED_EMAIL']) {
      return this.unavailablePrice();
    }

    const result = await this.scraper.searchProduct(productName, genericName);

    return {
      distributorId: 'vaamed',
      distributorName: 'VAAMED',
      unitPrice: result.price,
      packPrice: 0,
      packQuantity: 1,
      available: result.available,
      lastUpdated: new Date(),
      url: result.productUrl,
    };
  }

  async close(): Promise<void> {
    await this.scraper.close();
  }

  private unavailablePrice(): DistributorPrice {
    return {
      distributorId: 'vaamed',
      distributorName: 'VAAMED',
      unitPrice: 0,
      packPrice: 0,
      packQuantity: 1,
      available: false,
      lastUpdated: new Date(),
    };
  }
}
