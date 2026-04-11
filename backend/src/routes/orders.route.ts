import { Router, Request, Response } from 'express';
import { OrderStore } from '../store/order.store';

export function createOrdersRouter(store: OrderStore): Router {
  const router = Router();

  router.get('/', async (_req: Request, res: Response) => {
    const guides = await store.getAllGuides();
    res.json(guides);
  });

  router.post('/guide', (req: Request, res: Response) => {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: 'Se requiere al menos un producto.' });
      return;
    }
    const guides = store.createGuides({ items });
    res.status(201).json(guides);
  });

  router.get('/guide/:id', (req: Request, res: Response) => {
    const guide = store.getGuide(req.params['id'] as string);
    if (!guide) {
      res.status(404).json({ message: 'Guía no encontrada.' });
      return;
    }
    res.json(guide);
  });

  router.post('/guide/:guideId/confirm/:orderId', (req: Request, res: Response) => {
    const order = store.confirmOrder(
      req.params['guideId'] as string,
      req.params['orderId'] as string
    );
    if (!order) {
      res.status(404).json({ message: 'Orden no encontrada.' });
      return;
    }
    res.json(order);
  });

  return router;
}
