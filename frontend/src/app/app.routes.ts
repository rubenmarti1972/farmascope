import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'guia-pedido',
    loadComponent: () =>
      import('./features/order-guide/order-guide.component').then((m) => m.OrderGuideComponent),
  },
  { path: '**', redirectTo: '' },
];
