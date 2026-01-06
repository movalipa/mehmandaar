// app/dashboard/profile/page.tsx

import { StaffProfileClient } from "@/app/dashboard/profile/staff-profile-client"
import { requireAuth } from "@/db/actions/auth"

export default async function ProfilePage() {
  const staff = await requireAuth()

  return <StaffProfileClient staff={staff} />
}
