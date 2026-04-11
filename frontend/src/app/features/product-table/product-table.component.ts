import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProductReport, SelectedProduct } from '../../core/models/product.model';
import { PriceComparisonComponent } from '../price-comparison/price-comparison.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    PriceComparisonComponent,
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {
  readonly reports = input.required<ProductReport[]>();
  readonly selectedProducts = input<SelectedProduct[]>([]);
  readonly productSelectionChange = output<{ selected: SelectedProduct | null; report: ProductReport }>();

  readonly expandedReport = signal<ProductReport | null>(null);

  toggleExpand(report: ProductReport): void {
    this.expandedReport.set(this.expandedReport() === report ? null : report);
  }

  isSelected(report: ProductReport): boolean {
    return this.selectedProducts().some((s) => s.report.product.id === report.product.id);
  }

  getSelectedEntry(report: ProductReport): SelectedProduct | undefined {
    return this.selectedProducts().find((s) => s.report.product.id === report.product.id);
  }

  onCheckboxChange(checked: boolean, report: ProductReport): void {
    if (checked) {
      const bestDistributor = report.bestOffer;
      const selected: SelectedProduct = {
        report,
        selectedDistributorId: bestDistributor?.distributorId ?? report.prices[0]?.distributorId ?? '',
        quantityToOrder: report.product.stockDeficit,
      };
      this.productSelectionChange.emit({ selected, report });
    } else {
      this.productSelectionChange.emit({ selected: null, report });
    }
  }

  onDistributorChange(distributorId: string, report: ProductReport): void {
    const entry = this.getSelectedEntry(report);
    if (!entry) return;
    this.productSelectionChange.emit({
      selected: { ...entry, selectedDistributorId: distributorId },
      report,
    });
  }

  onQuantityChange(quantity: number, report: ProductReport): void {
    const entry = this.getSelectedEntry(report);
    if (!entry) return;
    this.productSelectionChange.emit({
      selected: { ...entry, quantityToOrder: quantity },
      report,
    });
  }

  getStockClass(report: ProductReport): string {
    const { currentStock, minimumStock } = report.product;
    if (currentStock === 0) return 'stock-empty';
    if (currentStock <= minimumStock * 0.5) return 'stock-critical';
    return 'stock-low';
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
  }

  getAvailablePrices(report: ProductReport) {
    return report.prices.filter((p) => p.available);
  }
}
