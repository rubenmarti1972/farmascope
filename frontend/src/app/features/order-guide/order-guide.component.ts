import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SelectedProduct, OrderGuide, PreOrder, PreOrderItem } from '../../core/models/product.model';
import { InventoryService } from '../../core/services/inventory.service';

@Component({
  selector: 'app-order-guide',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './order-guide.component.html',
  styleUrl: './order-guide.component.scss',
})
export class OrderGuideComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly inventoryService = inject(InventoryService);
  private readonly snackBar = inject(MatSnackBar);

  readonly guides = signal<OrderGuide[]>([]);
  readonly generating = signal(false);
  readonly confirmedGuides = signal<Set<string>>(new Set());

  private selectedProducts: SelectedProduct[] = [];

  readonly displayedColumns = ['product', 'presentation', 'quantity', 'unitPrice', 'total'];

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state as
      | { selectedProducts: SelectedProduct[] }
      | undefined;
    this.selectedProducts = state?.selectedProducts ?? (history.state?.selectedProducts ?? []);

    if (this.selectedProducts.length === 0) {
      this.router.navigate(['/']);
      return;
    }

    this.generateGuides();
  }

  generateGuides(): void {
    this.generating.set(true);

    const items: PreOrderItem[] = this.selectedProducts.map((s) => {
      const price = s.report.prices.find((p) => p.distributorId === s.selectedDistributorId);
      return {
        productId: s.report.product.id,
        productCode: s.report.product.code,
        productName: s.report.product.name,
        genericName: s.report.product.genericName,
        presentation: s.report.product.presentation,
        quantityToOrder: s.quantityToOrder,
        unitPrice: price?.unitPrice ?? 0,
        totalPrice: (price?.unitPrice ?? 0) * s.quantityToOrder,
        distributorId: s.selectedDistributorId,
        distributorName: price?.distributorName ?? '',
      };
    });

    this.inventoryService.createOrderGuide(items).subscribe({
      next: (guides) => {
        this.guides.set(guides);
        this.generating.set(false);
      },
      error: () => {
        this.generating.set(false);
        this.snackBar.open('Error generando las guías', 'Cerrar', { duration: 3000 });
      },
    });
  }

  confirmGuide(guide: OrderGuide): void {
    const order = guide.orders[0];
    if (!order) return;

    this.inventoryService.confirmOrder(guide.guideId, order.id).subscribe({
      next: () => {
        const current = new Set(this.confirmedGuides());
        current.add(guide.guideId);
        this.confirmedGuides.set(current);
        this.snackBar.open(`Guía ${guide.orders[0].distributorName} confirmada`, '', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Error al confirmar', 'Cerrar', { duration: 3000 });
      },
    });
  }

  isConfirmed(guideId: string): boolean {
    return this.confirmedGuides().has(guideId);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(value);
  }

  printGuide(guide: OrderGuide): void {
    window.print();
  }

  get totalGrand(): number {
    return this.guides().reduce((sum, g) => sum + g.grandTotal, 0);
  }
}
