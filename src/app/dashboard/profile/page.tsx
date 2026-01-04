// app/dashboard/profile/page.tsx
import { requireAuth } from "@/actions/auth"
import { StaffProfileClient } from "@/components/dashboard/profile/staff-profile-client"

export default async function ProfilePage() {
  const staff = await requireAuth()

  return <StaffProfileClient staff={staff} />
}
