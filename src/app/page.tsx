import { redirect } from "next/navigation"
import { getCurrentUser } from "@/db/actions/auth"

export default async function HomePage() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/dashboard")
  } else {
    redirect("/login")
  }
}
