import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createProductsRouter } from './routes/products.route';
import { createReportRouter } from './routes/report.route';
import { createOrdersRouter } from './routes/orders.route';
import { ReportStore } from './store/report.store';
import { OrderStore } from './store/order.store';
import { startDailyScheduler } from './scheduler/daily.scheduler';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(helmet());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

const store = new ReportStore();
const orderStore = new OrderStore();

app.use('/api/products', createProductsRouter(store));
app.use('/api/report', createReportRouter(store));
app.use('/api/orders', createOrdersRouter(orderStore));

app.listen(PORT, async () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
  startDailyScheduler(store);

  console.log('[Server] Loading initial report...');
  await store.refresh();
  console.log('[Server] Initial report ready.');
});
