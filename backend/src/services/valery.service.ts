import { Product } from '../types';
import { MOCK_LOW_STOCK_PRODUCTS } from '../data/mock-data';

/**
 * ValeryService connects to the Valery ERP database to fetch
 * products that have reached their minimum stock threshold.
 *
 * TODO: Replace mock implementation with real SQL Server connection
 * using the mssql package and credentials from environment variables.
 */
export class ValeryService {
  async getLowStockProducts(): Promise<Product[]> {
    // TODO: Replace with real DB query
    // const pool = await sql.connect({
    //   server: process.env.VALERY_DB_HOST,
    //   user: process.env.VALERY_DB_USER,
    //   password: process.env.VALERY_DB_PASSWORD,
    //   database: process.env.VALERY_DB_NAME,
    // });
    // const result = await pool.request().query(`
    //   SELECT codigo, nombre, stock_actual, stock_minimo
    //   FROM productos
    //   WHERE stock_actual <= stock_minimo
    // `);
    // return this.mapToProducts(result.recordset);

    await this.simulateDelay(300);
    return MOCK_LOW_STOCK_PRODUCTS;
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
