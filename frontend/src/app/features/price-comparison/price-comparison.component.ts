import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductReport, DistributorPrice } from '../../core/models/product.model';

@Component({
  selector: 'app-price-comparison',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule, MatButtonModule, MatTooltipModule],
  templateUrl: './price-comparison.component.html',
  styleUrl: './price-comparison.component.scss',
})
export class PriceComparisonComponent {
  readonly report = input.required<ProductReport>();

  isBestOffer(price: DistributorPrice): boolean {
    return this.report().bestOffer?.distributorId === price.distributorId;
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
  }

  openUrl(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
