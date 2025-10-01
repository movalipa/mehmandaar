"use server"

import { desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db, usersTable } from "@/db"
import { UserForm } from "./user-form" // وارد کردن کامپوننت فرم

// ------------------- SERVER ACTION (سازگار با useFormState) -------------------
// اکشن حالا یک پارامتر اول به نام prevState می‌گیرد.
async function addUser(
  _prevState: { success: boolean; message: string } | undefined,
  formData: FormData
) {
  "use server"
  const name = formData.get("name") as string
  const ageString = formData.get("age") as string
  const email = formData.get("email") as string

  if (!name || !ageString || !email) {
    return {
      success: false,
      message: "تمام فیلدها (نام، سن، ایمیل) الزامی هستند.",
    }
  }

  const age = parseInt(ageString, 10)
  if (Number.isNaN(age) || age <= 0) {
    return { success: false, message: "سن وارد شده معتبر نیست." }
  }

  try {
    await db.insert(usersTable).values({ name, age, email })
    revalidatePath("/")
    return { success: true, message: `کاربر "${name}" با موفقیت اضافه شد!` }
    // biome-ignore lint/suspicious/noExplicitAny: NON
  } catch (error: any) {
    if (error.code === "23505") {
      return { success: false, message: "این ایمیل قبلاً ثبت شده است." }
    }
    console.error("Error adding user:", error)
    return { success: false, message: "خطایی در سرور رخ داد." }
  }
}
// -----------------------------------------------------------------------------

// ------------------- REACT SERVER COMPONENT -------------------
export default async function Home() {
  const users = await db.select().from(usersTable).orderBy(desc(usersTable.id))

  return (
    <main className="container mx-auto p-8">
      <div className="text-center mb-8 gap-2 flex flex-col">
        <h1 className="text-4xl font-bold text-gray-100">مدیریت کاربران</h1>
        <p className="text-xl text-gray-500 mt-2">
          مثال Next.js Server Action با useFormState
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* استفاده از کامپوننت فرم کلاینت و پاس دادن Server Action به آن */}
        <UserForm addUserAction={addUser} />

        {/* بخش نمایش لیست کاربران (بدون تغییر) */}
        <div className="p-8 bg-gray-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            لیست کاربران
          </h2>
          <div className="space-y-4">
            {users.length > 0 ? (
              users.map(user => (
                <div
                  key={user.id}
                  className="p-4 bg-white border rounded-md flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-600">
                      سن: {user.age}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">ID: {user.id}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                هنوز کاربری ثبت نشده است.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
