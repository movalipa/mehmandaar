// components/dashboard/staff/staff-client.tsx
"use client"

import type { UUID } from "node:crypto"
import {
  Edit,
  Plus,
  Search,
  Shield,
  Trash2,
  User,
  UserCog,
  Users,
} from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DeleteStaffDialog } from "./delete-staff-dialog"
import { StaffDialog } from "./staff-dialog"

type StaffRole = "owner" | "manager" | "receptionist" | "staff"

interface StaffMember {
  id: UUID
  firstName: string
  lastName: string
  phone: string
  role: StaffRole
  createdAt: Date
}

interface StaffClientProps {
  staffList: StaffMember[]
  stats: {
    total: number
    owner: number
    manager: number
    receptionist: number
    staff: number
  }
  hotelId: UUID
  currentUserRole: StaffRole
}

export function StaffClient({
  staffList,
  stats,
  hotelId,
  currentUserRole,
}: StaffClientProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const getRoleConfig = (role: StaffRole) => {
    const configs = {
      owner: {
        label: "مالک",
        variant: "default" as const,
        icon: Shield,
        color: "text-purple-600",
      },
      manager: {
        label: "مدیر",
        variant: "secondary" as const,
        icon: UserCog,
        color: "text-blue-600",
      },
      receptionist: {
        label: "پذیرش",
        variant: "outline" as const,
        icon: Users,
        color: "text-green-600",
      },
      staff: {
        label: "کارمند",
        variant: "outline" as const,
        icon: User,
        color: "text-gray-600",
      },
    }
    return configs[role]
  }

  const statsConfig = [
    {
      label: "کل کارکنان",
      value: stats.total.toString(),
      description: "تعداد کل",
      icon: Users,
    },
    {
      label: "مالک",
      value: stats.owner.toString(),
      description: "دسترسی کامل",
      icon: Shield,
    },
    {
      label: "مدیر",
      value: stats.manager.toString(),
      description: "مدیریت",
      icon: UserCog,
    },
    {
      label: "پذیرش و کارمند",
      value: (stats.receptionist + stats.staff).toString(),
      description: "کارکنان عملیاتی",
      icon: User,
    },
  ]

  const filteredStaff = staffList.filter(member => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery)

    return matchesSearch
  })

  const handleEdit = (member: StaffMember) => {
    setSelectedStaff(member)
    setDialogOpen(true)
  }

  const handleDelete = (member: StaffMember) => {
    setSelectedStaff(member)
    setDeleteDialogOpen(true)
  }

  const handleAddNew = () => {
    setSelectedStaff(null)
    setDialogOpen(true)
  }

  const canEditStaff = (targetRole: StaffRole) => {
    if (targetRole === "owner") return false
    if (currentUserRole === "owner") return true
    if (currentUserRole === "manager") return true
    return false
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              مدیریت کارکنان
            </h2>
            <p className="text-muted-foreground">مشاهده و مدیریت کارکنان هتل</p>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4" />
            کارمند جدید
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {statsConfig.map(stat => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>لیست کارکنان</CardTitle>
                <CardDescription>
                  {filteredStaff.length} کارمند یافت شد
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو..."
                  className="pr-8 w-62.5"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredStaff.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchQuery
                    ? "هیچ کارمندی یافت نشد"
                    : "هیچ کارمندی ثبت نشده"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery
                    ? "جستجوی خود را تغییر دهید"
                    : "برای شروع، اولین کارمند را اضافه کنید"}
                </p>
                {!searchQuery && (
                  <Button onClick={handleAddNew}>
                    <Plus className="h-4 w-4" />
                    افزودن اولین کارمند
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-md border" dir="rtl">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm border-b bg-muted/50">
                  <div>نام و نام خانوادگی</div>
                  <div>شماره تماس</div>
                  <div>نقش</div>
                  <div>تاریخ عضویت</div>
                  <div className="text-left">عملیات</div>
                </div>
                {filteredStaff.map(member => {
                  const roleConfig = getRoleConfig(member.role)
                  const RoleIcon = roleConfig.icon
                  const canEdit = canEditStaff(member.role)

                  return (
                    <div
                      key={member.id}
                      className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-muted/50 transition-colors border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">
                          {member.firstName} {member.lastName}
                        </p>
                      </div>
                      <div className="text-sm">{member.phone}</div>
                      <div>
                        <Badge
                          variant={roleConfig.variant}
                          className="flex items-center gap-1 w-fit"
                        >
                          <RoleIcon className="h-3 w-3" />
                          {roleConfig.label}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        {new Date(member.createdAt).toLocaleDateString("fa-IR")}
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        {canEdit && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(member)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(member)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <StaffDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        staff={selectedStaff}
        hotelId={hotelId}
        currentUserRole={currentUserRole}
      />

      <DeleteStaffDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        staff={selectedStaff}
      />
    </>
  )
}
