import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ReportSummary, ProductReport, SelectedProduct } from '../../core/models/product.model';
import { InventoryService } from '../../core/services/inventory.service';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    ProductTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly inventoryService = inject(InventoryService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  readonly report = signal<ReportSummary | null>(null);
  readonly loading = signal(true);
  readonly refreshing = signal(false);
  readonly selectedProducts = signal<SelectedProduct[]>([]);

  // Pagination & filter state
  currentPage = 1;
  pageSize = 50;
  searchTerm = '';
  sortBy = 'deficit';

  private readonly searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((term) => {
      this.searchTerm = term;
      this.currentPage = 1;
      this.loadReport();
    });
    this.loadReport();
  }

  loadReport(): void {
    this.loading.set(true);
    this.inventoryService
      .getReport({ page: this.currentPage, pageSize: this.pageSize, search: this.searchTerm, sort: this.sortBy })
      .subscribe({
        next: (data) => {
          this.report.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.snackBar.open('Error cargando el reporte', 'Cerrar', { duration: 3000 });
        },
      });
  }

  onSearch(term: string): void {
    this.searchSubject.next(term);
  }

  onSortChange(): void {
    this.currentPage = 1;
    this.loadReport();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadReport();
  }

  triggerRefresh(): void {
    this.refreshing.set(true);
    this.inventoryService.triggerRefresh().subscribe({
      next: () => {
        this.snackBar.open('Actualizando precios... esto puede tomar unos segundos', '', { duration: 3000 });
        setTimeout(() => {
          this.loadReport();
          this.refreshing.set(false);
        }, 6000);
      },
      error: () => {
        this.refreshing.set(false);
        this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 });
      },
    });
  }

  onProductSelected(selected: SelectedProduct | null, report: ProductReport): void {
    const current = this.selectedProducts();
    if (selected === null) {
      this.selectedProducts.set(current.filter((s) => s.report.product.id !== report.product.id));
    } else {
      const exists = current.find((s) => s.report.product.id === report.product.id);
      if (exists) {
        this.selectedProducts.set(current.map((s) => s.report.product.id === report.product.id ? selected : s));
      } else {
        this.selectedProducts.set([...current, selected]);
      }
    }
  }

  navigateToGuide(): void {
    this.router.navigate(['/guia-pedido'], {
      state: { selectedProducts: this.selectedProducts() },
    });
  }
}
