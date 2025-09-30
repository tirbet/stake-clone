"use client"
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavMain } from "./nav-main"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar()
  return (
    <Sidebar {...props}>
      <SidebarHeader className={
        cn(
          'bg-sidebar border-b border-sidebar-border/50 h-15',
          "backdrop-blur-lg supports-[backdrop-filter]:bg-sidebar/80",
          'group-has-data-[collapsible=icon]/sidebar-wrapper:h-15'
        )
      }>
        <Button
          className="h-9 w-9 rounded-md hover:bg-[rgb(38,57,72)]"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5 text-white" />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
