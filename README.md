# sheet-selector

ตัวอย่างโปรเจค: Next.js (frontend) + Express (backend) + MongoDB + Docker Compose
ดึงข้อมูลจาก Google Sheets (export CSV) แล้วให้ UI เลือกรายการเพื่อเก็บลง MongoDB

โครงสร้าง:
- frontend/   (Next.js)
- backend/    (Express + Mongoose)
- docker-compose.yml
- .env.example

วิธีใช้งานสั้น ๆ:
1. คัดลอก `.env.example` เป็น `.env` แล้วแก้ค่า (ใส่ SHEET_ID, GID ตามลิงก์ที่ให้)
2. รัน:
   docker-compose up --build
3. เปิดเว็บ:
   - Frontend: http://localhost:3000
   - Backend (API): http://localhost:4000/api

หมายเหตุ:
- วิธีดึงข้อมูล: ใช้ CSV export ของ Google Sheets (ต้องแชร์เป็น "Anyone with the link")
- ถ้าต้องการใช้ Google Sheets API ที่ต้องมี API key / OAuth ให��บอก ผมจะเพิ่มตัวอย่างการใช้ API
