import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  /** * ฟังก์ชันสำหรับหยิบของใส่ตะกร้า 
   * รับค่า itemName เพื่อให้เราเลือกหยิบชิ้นไหนก็ได้ ไม่ต้อง Hardcode
   */
  async addItemToCart(itemId: string) {
    // เทคนิค: สร้าง Locator แบบ Dynamic ตามชื่อ ID ที่ส่งมา
    await this.page.locator(`[data-test="add-to-cart-${itemId}"]`).click();
  }
}