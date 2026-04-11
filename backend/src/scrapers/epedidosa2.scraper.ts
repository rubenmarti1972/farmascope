import { chromium, Browser, Page, BrowserContext } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { DistributorPrice } from '../types';

export interface Epedidosa2Config {
  distributorId: string;
  distributorName: string;
  baseUrl: string; // e.g. https://vaamed.epedidosa2.net
  email: string;
  password: string;
  sessionFile: string; // path to save session cookies
}

/**
 * Base scraper for distributors using the ePedidosa2 platform.
 * All distributors on this platform share the same URL structure and login flow.
 * Simply provide different baseUrl and credentials per distributor.
 */
export class Epedidosa2Scraper {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;

  constructor(private readonly config: Epedidosa2Config) {}

  async initialize(): Promise<void> {
    this.browser = await chromium.launch({ headless: true });
    const sessionExists = fs.existsSync(this.config.sessionFile);

    if (sessionExists) {
      const savedSession = JSON.parse(fs.readFileSync(this.config.sessionFile, 'utf-8'));
      this.context = await this.browser.newContext({ storageState: savedSession });
      console.log(`[${this.config.distributorName}] Session loaded from file.`);
    } else {
      this.context = await this.browser.newContext();
      await this.login();
    }
  }

  private async login(): Promise<void> {
    if (!this.context) throw new Error('Browser context not initialized');

    const page = await this.context.newPage();
    console.log(`[${this.config.distributorName}] Logging in...`);

    await page.goto(`${this.config.baseUrl}/index_desktop.php`);
    await page.fill('#NombreUsuario', this.config.email);
    await page.fill('#ClaveUsuario', this.config.password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle' });

    // Check if login was successful (not redirected back to login)
    if (page.url().includes('index_desktop.php') || page.url().includes('check_usuario.php')) {
      await page.close();
      throw new Error(`[${this.config.distributorName}] Login failed. Check credentials.`);
    }

    // Save session for reuse
    const sessionDir = path.dirname(this.config.sessionFile);
    if (!fs.existsSync(sessionDir)) {
      fs.mkdirSync(sessionDir, { recursive: true });
    }
    await this.context.storageState({ path: this.config.sessionFile });
    console.log(`[${this.config.distributorName}] Login successful. Session saved.`);
    await page.close();
  }

  async searchProduct(productName: string, genericName: string): Promise<{ price: number; available: boolean; productUrl?: string }> {
    if (!this.context) throw new Error('Not initialized. Call initialize() first.');

    const page = await this.context.newPage();

    try {
      // TODO: Update with real catalog/search URL after inspecting post-login pages
      // Common ePedidosa2 patterns to try:
      // /productos_lista.php, /catalogo.php, /buscar.php?q=...
      await page.goto(`${this.config.baseUrl}/productos_lista.php`, { waitUntil: 'networkidle' });

      // Check if session expired — redirect back to login
      if (page.url().includes('index_desktop.php')) {
        console.log(`[${this.config.distributorName}] Session expired, re-logging in...`);
        fs.unlinkSync(this.config.sessionFile);
        await page.close();
        await this.login();
        return this.searchProduct(productName, genericName);
      }

      // TODO: Implement real search logic once catalog URL structure is known.
      // The search will likely involve:
      // 1. Finding a search input on the catalog page
      // 2. Typing the generic name
      // 3. Extracting product rows with price and stock

      console.log(`[${this.config.distributorName}] TODO: implement real product search for "${genericName}"`);
      return { price: 0, available: false };

    } catch (error) {
      console.error(`[${this.config.distributorName}] Error searching for "${productName}":`, error);
      return { price: 0, available: false };
    } finally {
      await page.close();
    }
  }

  async close(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
    this.context = null;
    this.browser = null;
  }
}
