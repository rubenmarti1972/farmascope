import { DistributorPrice, ProductReport, Product } from '../types';
import { ScraperService } from './scraper.service';

export class ComparatorService {
  private readonly scraper = new ScraperService();

  async buildReport(product: Product): Promise<ProductReport> {
    const prices = await this.scraper.getPricesForProduct(product.id, product.name, product.genericName);
    const availablePrices = prices.filter((p) => p.available);

    const bestOffer = availablePrices.length > 0
      ? availablePrices.reduce((best, current) =>
          current.unitPrice < best.unitPrice ? current : best
        )
      : null;

    return {
      product,
      prices,
      bestOffer,
      checkedAt: new Date(),
    };
  }
}
