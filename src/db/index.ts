import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
// 1. تمام اکسپورت‌های فایل schema را به عنوان یک آبجکت ایمپورت کنید
import * as schema from "@/db/schema"
import { env } from "~/env"

// 2. ایجاد یک Connection Pool (برای مدیریت بهتر اتصالات در Next.js ضروری است)
const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

// 3. پاس دادن schema به عنوان کانفیگ به drizzle
export const db = drizzle(pool, { schema })
