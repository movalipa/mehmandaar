"use client"

import {
  Calendar,
  Edit,
  Phone,
  Plus,
  Search,
  Trash2,
  User,
  Users,
} from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Guest } from "@/db/schema"
import { DeleteGuestDialog } from "./delete-guest-dialog"
import { GuestDialog } from "./guest-dialog"

interface GuestsClientProps {
  guests: Guest[]
  stats: {
    totalGuests: number
    withPhone: number
    withDescription: number
    recentGuests: number
  }
}

export function GuestsClient({ guests, stats }: GuestsClientProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const statsConfig = [
    {
      label: "کل مهمانان",
      value: stats.totalGuests.toString(),
      description: "ثبت شده در سیستم",
      icon: Users,
    },
    {
      label: "دارای شماره تماس",
      value: stats.withPhone.toString(),
      description: `${Math.round((stats.withPhone / stats.totalGuests) * 100)}٪ از کل`,
      icon: Phone,
    },
    {
      label: "دارای توضیحات",
      value: stats.withDescription.toString(),
      description: "اطلاعات تکمیلی",
      icon: User,
    },
    {
      label: "مهمانان جدید",
      value: stats.recentGuests.toString(),
      description: "۳۰ روز اخیر",
      icon: Calendar,
    },
  ]

  const filteredGuests = guests.filter(
    guest =>
      guest.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.phone?.includes(searchQuery)
  )

  const handleEdit = (guest: Guest) => {
    setSelectedGuest(guest)
    setDialogOpen(true)
  }

  const handleDelete = (guest: Guest) => {
    setSelectedGuest(guest)
    setDeleteDialogOpen(true)
  }

  const handleAddNew = () => {
    setSelectedGuest(null)
    setDialogOpen(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              مدیریت مهمانان
            </h2>
            <p className="text-muted-foreground">
              مشاهده و مدیریت اطلاعات مهمانان هتل
            </p>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 ml-2" />
            افزودن مهمان
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
                <CardTitle>لیست مهمانان</CardTitle>
                <CardDescription>
                  {filteredGuests.length} مهمان یافت شد
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو مهمان..."
                  className="pr-8 w-62.5"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredGuests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchQuery ? "هیچ مهمانی یافت نشد" : "هیچ مهمانی ثبت نشده"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery
                    ? "جستجوی خود را تغییر دهید"
                    : "برای شروع، اولین مهمان خود را اضافه کنید"}
                </p>
                {!searchQuery && (
                  <Button onClick={handleAddNew}>
                    <Plus className="h-4 w-4 ml-2" />
                    افزودن اولین مهمان
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGuests.map(guest => (
                  <Card
                    key={guest.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getInitials(guest.fullName)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="space-y-1">
                            <h3 className="font-semibold">{guest.fullName}</h3>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              {guest.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {guest.phone}
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(guest.createdAt).toLocaleDateString(
                                  "fa-IR"
                                )}
                              </div>
                            </div>

                            {guest.description && (
                              <p className="text-sm text-muted-foreground max-w-md">
                                {guest.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(guest)}
                          >
                            <Edit className="h-4 w-4 ml-1" />
                            ویرایش
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(guest)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <GuestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        guest={selectedGuest}
      />

      <DeleteGuestDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        guest={selectedGuest}
      />
    </>
  )
}
