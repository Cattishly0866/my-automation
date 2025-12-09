import { test, expect } from '@playwright/test';

test('My First Test: ค้นหาบน Google', async ({ page }) => {
  
  // 1. เข้าเว็บ Google
  await page.goto('https://www.google.com/');

  // 2. เช็คว่า Title ต้องมีคำว่า Google (ยืนยันว่าเข้าถูกเว็บ)
  await expect(page).toHaveTitle(/Google/);

  // 3. คลิกช่องค้นหา และพิมพ์คำว่า "Playwright"
  // (เราสั่งให้หาช่องที่มีป้ายชื่อว่า 'ค้นหา' หรือ 'Search')
  await page.locator('textarea[name="q"]').fill('Playwright');

  // 4. กดปุ่ม Enter บนคีย์บอร์ด
  await page.keyboard.press('Enter');

});