import { Router, Request, Response } from 'express';
import { ReportStore } from '../store/report.store';

export function createProductsRouter(store: ReportStore): Router {
  const router = Router();

  router.get('/low-stock', (_req: Request, res: Response) => {
    const summary = store.getSummary();
    if (!summary) {
      res.status(503).json({ message: 'Report not ready. Please trigger a refresh.' });
      return;
    }
    res.json(summary.reports.map((r) => r.product));
  });

  return router;
}
