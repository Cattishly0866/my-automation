import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Flow ซื้อของแบบมืออาชีพ (Full POM)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. ตรวจสอบว่าเข้าหน้าสินค้าแล้ว
  await expect(inventoryPage.pageTitle).toHaveText('Products');

  // 3. สั่งหยิบกระเป๋า (ส่ง ID ของสินค้าไป)
  // ข้อดี: วันหลังอยากหยิบเสื้อ ก็แค่เปลี่ยน string ตรงนี้ ไม่ต้องแก้ Locator
  await inventoryPage.addItemToCart('sauce-labs-backpack');

  // 4. ตรวจสอบตะกร้า
  await expect(inventoryPage.cartBadge).toHaveText('1');
});