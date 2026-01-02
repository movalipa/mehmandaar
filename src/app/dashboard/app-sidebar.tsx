"use client"

import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  BedDouble,
  Calendar,
  Home,
  Hotel,
  LogOut,
  UserIcon,
  UserStar,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
import type { Staff } from "@/db/schema"

interface MenuItem {
  title: string
  url: string
  icon: LucideIcon
}

interface MenuSection {
  label: string
  items: MenuItem[]
}

const menuSections: MenuSection[] = [
  {
    label: "منوی اصلی",
    items: [
      { title: "داشبورد", url: "/dashboard", icon: Home },
      { title: "رزرواسیون‌ها", url: "/dashboard/reservations", icon: Calendar },
      { title: "اتاق‌ها", url: "/dashboard/rooms", icon: BedDouble },
      { title: "مهمانان", url: "/dashboard/guests", icon: Users },
    ],
  },
  {
    label: "مدیریت",
    items: [
      { title: "گزارشات", url: "/dashboard/reports", icon: BarChart3 },
      { title: "کارمندان", url: "/dashboard/staff", icon: UserStar },
    ],
  },
  {
    label: "تنظیمات",
    items: [
      { title: "تنظیمات هتل", url: "/dashboard/hotel-settings", icon: Hotel },
      { title: "پروفایل کاربری", url: "/dashboard/profile", icon: UserIcon },
    ],
  },
]

interface SidebarMenuItemLinkProps {
  item: MenuItem
  currentPath: string
}

function SidebarMenuItemLink({ item, currentPath }: SidebarMenuItemLinkProps) {
  const isActive = currentPath === item.url

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={item.url}>
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

interface SidebarMenuSectionProps {
  section: MenuSection
  currentPath: string
}

function SidebarMenuSection({ section, currentPath }: SidebarMenuSectionProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map(item => (
            <SidebarMenuItemLink
              key={item.title}
              item={item}
              currentPath={currentPath}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar({ staff }: { staff: Staff }) {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <UserIcon className="h-4 w-4" />
              <span>{staff.firstName}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menuSections.map(section => (
          <SidebarMenuSection
            key={section.label}
            section={section}
            currentPath={pathname}
          />
        ))}
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
