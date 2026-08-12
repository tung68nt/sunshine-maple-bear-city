import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const out='/Users/tungnguyen/Code/smb_sunshinecity/tmp/ioc_screens'; await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true}); const page=await browser.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1});
await page.goto('http://localhost:3000/ioc-demo',{waitUntil:'networkidle'});
const labels=['Tổng quan điều hành','Quản trị GRDP','Kinh tế - xã hội','Nhiệm vụ tỉnh','Quản lý kết nối dữ liệu','Khai phá dữ liệu','Lưu trữ dữ liệu đã xử lý','Dịch vụ chia sẻ dữ liệu'];
for(let i=0;i<labels.length;i++){await page.getByRole('button',{name:labels[i],exact:true}).click(); await page.waitForTimeout(250); await page.screenshot({path:`${out}/screen-${String(i+1).padStart(2,'0')}.png`,fullPage:true});}
await browser.close();
