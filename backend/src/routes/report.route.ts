import { Router, Request, Response } from 'express';
import { ReportStore } from '../store/report.store';
import { ProductReport } from '../types';

export function createReportRouter(store: ReportStore): Router {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    const summary = store.getSummary();
    if (!summary) {
      res.status(503).json({ message: 'Report not ready. Please trigger a refresh.' });
      return;
    }

    const page = Math.max(1, parseInt(req.query['page'] as string) || 1);
    const pageSize = Math.min(100, Math.max(10, parseInt(req.query['pageSize'] as string) || 50));
    const search = ((req.query['search'] as string) || '').toLowerCase().trim();
    const sort = (req.query['sort'] as string) || 'deficit';

    let reports = [...summary.reports];

    // Filter by search term
    if (search) {
      reports = reports.filter((r) =>
        r.product.name.toLowerCase().includes(search) ||
        r.product.genericName.toLowerCase().includes(search) ||
        r.product.code.toLowerCase().includes(search) ||
        r.product.laboratory.toLowerCase().includes(search)
      );
    }

    // Sort
    reports = sortReports(reports, sort);

    const total = reports.length;
    const totalPages = Math.ceil(total / pageSize);
    const offset = (page - 1) * pageSize;
    const paginated = reports.slice(offset, offset + pageSize);

    res.json({
      ...summary,
      reports: paginated,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  });

  router.get('/status', (_req: Request, res: Response) => {
    res.json(store.getStatus());
  });

  router.post('/refresh', async (_req: Request, res: Response) => {
    res.json({ message: 'Refresh triggered' });
    store.refresh().catch(console.error);
  });

  return router;
}

function sortReports(reports: ProductReport[], sort: string): ProductReport[] {
  switch (sort) {
    case 'stock':
      return reports.sort((a, b) => a.product.currentStock - b.product.currentStock);
    case 'name':
      return reports.sort((a, b) => a.product.name.localeCompare(b.product.name));
    case 'deficit':
    default:
      // Sort by deficit percentage (most critical first), zeros first
      return reports.sort((a, b) => {
        const deficitA = a.product.currentStock === 0 ? Infinity : a.product.stockDeficit / a.product.minimumStock;
        const deficitB = b.product.currentStock === 0 ? Infinity : b.product.stockDeficit / b.product.minimumStock;
        return deficitB - deficitA;
      });
  }
}
