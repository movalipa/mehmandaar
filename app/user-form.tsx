"use client" // این کامپوننت را به یک کامپوننت کلاینت تبدیل می‌کند

import { useFormState, useFormStatus } from "react-dom"

// تعریف تایپ برای اکشن که state قبلی و formData را می‌پذیرد
type AddUserAction = (
  prevState: { success: boolean; message: string } | undefined,
  formData: FormData
) => Promise<{ success: boolean; message: string }>

// کامپوننت دکمه Submit برای نمایش وضعیت pending
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {pending ? "در حال افزودن..." : "افزودن کاربر"}
    </button>
  )
}

interface Prop {
  addUserAction: AddUserAction
}

// کامپوننت اصلی فرم
export function UserForm({ addUserAction }: Prop) {
  const initialState = undefined // یا { success: false, message: '' }

  // useFormState هوک اصلی است
  // state: نتیجه بازگشتی از آخرین اجرای اکشن
  // formAction: یک نسخه جدید از اکشن که به فرم متصل می‌شود
  const [state, formAction] = useFormState(addUserAction, initialState)

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        افزودن کاربر جدید
      </h2>

      <form action={formAction} className="space-y-6">
        {/* فیلد نام */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            نام
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="مثلا: علی محمدی"
          />
        </div>

        {/* فیلد سن */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            سن
          </label>
          <input
            type="number"
            id="age"
            name="age"
            required
            className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="مثلا: 30"
          />
        </div>

        {/* فیلد ایمیل */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="ali@example.com"
          />
        </div>

        <SubmitButton />

        {/* نمایش پیام بازگشتی از سرور */}
        {state?.message && (
          <p
            className={`mt-4 text-sm ${state.success ? "text-green-600" : "text-red-600"}`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  )
}
