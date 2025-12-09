import { test, expect, _electron as electron } from '@playwright/test';

test('เปิดแอป Samsung และกด PIN', async () => {
  // 1. สั่งเปิดโปรแกรม .exe (เปลี่ยน path นี้เป็นของเครื่องคุณนะครับ)
  // หมายเหตุ: path ใน Windows ต้องใช้ \\ (Backslash 2 ตัว) คั่นเสมอ
  const app = await electron.launch({
    executablePath: 'C:\\Users\\touchchai11.ponnumpa\\AppData\\Local\\Programs\\SAPs\\SamsungConnect_UAT.exe',
  });

  // 2. รอให้หน้าต่างแรก (First Window) เด้งขึ้นมา
  const window = await app.firstWindow();
  
  // รอให้หน้าจอโหลดเสร็จ (สังเกตจากในรูปมีคำว่า "กรุณาระบุ PIN")
  // เราจะรอจนกว่าข้อความนี้จะโผล่มา เพื่อความชัวร์
  await expect(window.getByText('กรุณาระบุ PIN')).toBeVisible({ timeout: 10000 });

  // 3. ปริ้นท์ Title ออกมาดูหน่อยว่าใช่แอปที่ต้องการไหม
  console.log(await window.title());

  // 4. ลองกด PIN (สมมติรหัสคือ 0-0-0-0-0-0)
  // ใช้ getByRole จะแม่นยำที่สุดสำหรับ Ionic App ครับ
  await window.getByRole('button', { name: '0' }).click();
  await window.getByRole('button', { name: '0' }).click();
  await window.getByRole('button', { name: '0' }).click();
  await window.getByRole('button', { name: '0' }).click();
  await window.getByRole('button', { name: '0' }).click();
  await window.getByRole('button', { name: '0' }).click();

  // 5. หยุดดูผลงานสัก 3 วินาที (เฉพาะช่วงเขียนโค้ด)
  await window.waitForTimeout(3000);

  // 6. ปิดโปรแกรม
  await app.close();
});