export interface Product {
  id: string;
  code: string;
  name: string;
  genericName: string;
  laboratory: string;
  presentation: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  stockDeficit: number;
}

export interface DistributorPrice {
  distributorId: string;
  distributorName: string;
  unitPrice: number;
  packPrice: number;
  packQuantity: number;
  available: boolean;
  lastUpdated: Date;
  url?: string;
}

export interface ProductReport {
  product: Product;
  prices: DistributorPrice[];
  bestOffer: DistributorPrice | null;
  checkedAt: Date;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ReportSummary {
  totalLowStockProducts: number;
  productsWithOffers: number;
  productsWithoutOffers: number;
  lastRunAt: Date;
  nextRunAt: Date;
  reports: ProductReport[];
  pagination?: Pagination;
}

export interface PreOrderItem {
  productId: string;
  productCode: string;
  productName: string;
  genericName: string;
  presentation: string;
  quantityToOrder: number;
  unitPrice: number;
  totalPrice: number;
  distributorId: string;
  distributorName: string;
}

export interface PreOrder {
  id: string;
  distributorName: string;
  distributorId: string;
  items: PreOrderItem[];
  subtotal: number;
  createdAt: Date;
  status: 'pending' | 'confirmed';
}

export interface OrderGuide {
  guideId: string;
  generatedAt: Date;
  orders: PreOrder[];
  grandTotal: number;
}
