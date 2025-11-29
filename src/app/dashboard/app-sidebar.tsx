// components/app-sidebar.tsx
"use client"

import {
  BarChart3,
  BedDouble,
  Calendar,
  DollarSign,
  FileText,
  Home,
  Hotel,
  LogOut,
  MessageSquare,
  Settings,
  UserIcon,
  Users,
  Utensils,
} from "lucide-react"
import Link from "next/link"
import { logout } from "@/actions/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { User } from "@/db"

const menuItems = [
  {
    title: "داشبورد",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "رزرواسیون‌ها",
    url: "/dashboard/reservations",
    icon: Calendar,
  },
  {
    title: "اتاق‌ها",
    url: "/dashboard/rooms",
    icon: BedDouble,
  },
  {
    title: "مهمانان",
    url: "/dashboard/guests",
    icon: Users,
  },
  {
    title: "مالی",
    url: "/dashboard/finance",
    icon: DollarSign,
  },
  {
    title: "رستوران",
    url: "/dashboard/restaurant",
    icon: Utensils,
  },
]

const managementItems = [
  {
    title: "گزارشات",
    url: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "پیام‌ها",
    url: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "اسناد",
    url: "/dashboard/documents",
    icon: FileText,
  },
]

const settingsItems = [
  {
    title: "تنظیمات هتل",
    url: "/dashboard/hotel-settings",
    icon: Hotel,
  },
  {
    title: "پروفایل کاربری",
    url: "/dashboard/profile",
    icon: UserIcon,
  },
  {
    title: "تنظیمات سیستم",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar({ user }: { user: User }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <UserIcon className="h-4 w-4" />
              <span>{user.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>منوی اصلی</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>مدیریت</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>تنظیمات</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={logout}>
              <SidebarMenuButton
                type="submit"
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>خروج از حساب</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
