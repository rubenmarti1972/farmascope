import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportSummary, ReportStatus, PreOrderItem, OrderGuide, PreOrder } from '../models/product.model';

const API_BASE = 'https://farmascope-production.up.railway.app/api';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly http = inject(HttpClient);

  getReport(params?: { page?: number; pageSize?: number; search?: string; sort?: string }): Observable<ReportSummary> {
    let queryParams = '';
    if (params) {
      const parts: string[] = [];
      if (params.page) parts.push(`page=${params.page}`);
      if (params.pageSize) parts.push(`pageSize=${params.pageSize}`);
      if (params.search) parts.push(`search=${encodeURIComponent(params.search)}`);
      if (params.sort) parts.push(`sort=${params.sort}`);
      if (parts.length) queryParams = '?' + parts.join('&');
    }
    return this.http.get<ReportSummary>(`${API_BASE}/report${queryParams}`);
  }

  getStatus(): Observable<ReportStatus> {
    return this.http.get<ReportStatus>(`${API_BASE}/report/status`);
  }

  triggerRefresh(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_BASE}/report/refresh`, {});
  }

  createOrderGuide(items: PreOrderItem[]): Observable<OrderGuide[]> {
    return this.http.post<OrderGuide[]>(`${API_BASE}/orders/guide`, { items });
  }

  getOrderGuides(): Observable<OrderGuide[]> {
    return this.http.get<OrderGuide[]>(`${API_BASE}/orders`);
  }

  confirmOrder(guideId: string, orderId: string): Observable<PreOrder> {
    return this.http.post<PreOrder>(`${API_BASE}/orders/guide/${guideId}/confirm/${orderId}`, {});
  }
}
