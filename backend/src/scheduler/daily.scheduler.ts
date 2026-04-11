import cron from 'node-cron';
import { ReportStore } from '../store/report.store';

export function startDailyScheduler(store: ReportStore): void {
  // Runs every day at 6:00 AM
  cron.schedule('0 6 * * *', async () => {
    console.log('[Scheduler] Starting daily price check...');
    await store.refresh();
    console.log('[Scheduler] Daily price check complete.');
  });

  console.log('[Scheduler] Daily job scheduled for 06:00 AM');
}
