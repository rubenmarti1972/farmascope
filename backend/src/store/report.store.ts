import { ReportSummary, ProductReport } from '../types';
import { ValeryService } from '../services/valery.service';
import { ComparatorService } from '../services/comparator.service';
import { saveSnapshot } from '../db/price-history.repository';

export class ReportStore {
  private summary: ReportSummary | null = null;
  private isRefreshing = false;

  private readonly valery = new ValeryService();
  private readonly comparator = new ComparatorService();

  async refresh(): Promise<void> {
    if (this.isRefreshing) return;
    this.isRefreshing = true;

    try {
      const products = await this.valery.getLowStockProducts();
      const reports: ProductReport[] = [];

      for (const product of products) {
        const report = await this.comparator.buildReport(product);
        reports.push(report);
        saveSnapshot(product, report.prices).catch((err) =>
          console.warn(`[ReportStore] Could not save snapshot for ${product.name}:`, err)
        );
      }

      const now = new Date();
      const nextRun = new Date(now);
      nextRun.setDate(nextRun.getDate() + 1);
      nextRun.setHours(6, 0, 0, 0);

      this.summary = {
        totalLowStockProducts: products.length,
        productsWithOffers: reports.filter((r) => r.bestOffer !== null).length,
        productsWithoutOffers: reports.filter((r) => r.bestOffer === null).length,
        lastRunAt: now,
        nextRunAt: nextRun,
        reports,
      };
    } finally {
      this.isRefreshing = false;
    }
  }

  getSummary(): ReportSummary | null {
    return this.summary;
  }

  getStatus(): { ready: boolean; isRefreshing: boolean; lastRunAt: Date | null } {
    return {
      ready: this.summary !== null,
      isRefreshing: this.isRefreshing,
      lastRunAt: this.summary?.lastRunAt ?? null,
    };
  }
}
