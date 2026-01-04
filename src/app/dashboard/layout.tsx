import { requireAuth } from "@/actions/auth"
import Clock from "@/components/shared/Clock"
import ThemeButton from "@/components/shared/theme-button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const staff = await requireAuth()

  return (
    <SidebarProvider className="animate-in zoom-in-95 fade-in h-screen">
      <AppSidebar staff={staff} />
      <SidebarInset className="overflow-auto">
        <header className="flex z-50 sticky select-none top-0 bg-background h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">
              <span className="sm:hidden">مهماندار</span>
              <span className="hidden sm:inline">پنل مدیریت مهماندار</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Clock />
            <ThemeButton variant="ghost" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
