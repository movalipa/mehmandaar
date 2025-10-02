import { redirect } from "next/navigation"
import { getCurrentUser, logout } from "@/actions/auth"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <form action={logout}>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome back! 🎉
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">User ID:</span> {user.id}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Name:</span> {user.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Profile
            </h3>
            <p className="text-gray-600 text-sm">
              Manage your account settings
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Security
            </h3>
            <p className="text-gray-600 text-sm">
              Update your security preferences
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Settings
            </h3>
            <p className="text-gray-600 text-sm">
              Configure your app preferences
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
