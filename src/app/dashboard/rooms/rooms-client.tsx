"use client"

import { BedDouble, BedSingle, Edit, Plus, Trash2, Users } from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Room } from "@/db/schema"
import { DeleteRoomDialog } from "./delete-room-dialog"
import { RoomDialog } from "./room-dialog"

interface RoomsClientProps {
  rooms: Room[]
  stats: {
    totalRooms: number
    singleBeds: number
    doubleBeds: number
    totalCapacity: number
  }
}

export function RoomsClient({ rooms, stats }: RoomsClientProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const statsConfig = [
    {
      label: "کل اتاق‌ها",
      value: stats.totalRooms.toString(),
      icon: BedDouble,
    },
    {
      label: "تخت یک نفره",
      value: stats.singleBeds.toString(),
      icon: BedSingle,
    },
    {
      label: "تخت دو نفره",
      value: stats.doubleBeds.toString(),
      icon: BedDouble,
    },
    {
      label: "ظرفیت کل",
      value: stats.totalCapacity.toString(),
      icon: Users,
    },
  ]

  const handleEdit = (room: Room) => {
    setSelectedRoom(room)
    setDialogOpen(true)
  }

  const handleDelete = (room: Room) => {
    setSelectedRoom(room)
    setDeleteDialogOpen(true)
  }

  const handleAddNew = () => {
    setSelectedRoom(null)
    setDialogOpen(true)
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">مدیریت اتاق‌ها</h2>
            <p className="text-muted-foreground">
              مشاهده و مدیریت تمام اتاق‌های هتل
            </p>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 ml-2" />
            افزودن اتاق
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
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>لیست اتاق‌ها</CardTitle>
            <CardDescription>
              {rooms.length} اتاق در هتل ثبت شده است
            </CardDescription>
          </CardHeader>
          <CardContent>
            {rooms.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <BedDouble className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  هیچ اتاقی یافت نشد
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  برای شروع، اولین اتاق خود را اضافه کنید
                </p>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 ml-2" />
                  افزودن اولین اتاق
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نام اتاق</TableHead>
                    <TableHead>تخت یک نفره</TableHead>
                    <TableHead>تخت دو نفره</TableHead>
                    <TableHead>ظرفیت کل</TableHead>
                    <TableHead>تاریخ ایجاد</TableHead>
                    <TableHead className="w-0">عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rooms.map(room => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{room.singleBeds}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{room.doubleBeds}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge>
                          {room.singleBeds + room.doubleBeds * 2} نفر
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(room.createdAt).toLocaleDateString("fa-IR")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(room)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(room)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <RoomDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        room={selectedRoom}
      />

      <DeleteRoomDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        room={selectedRoom}
      />
    </>
  )
}
