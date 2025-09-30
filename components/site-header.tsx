"use client"

import { Menu } from "lucide-react"

import { SearchForm } from "@/components/search-form"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { ThemeToggle } from "./theme-toggle"
import LocaleSwitcher from "./locale-switcher"
import { cn } from "@/lib/utils"

export function SiteHeader() {


  return (
    <header className={
      cn(
        // positioning and layout
        'sticky top-0 z-[10] flex h-15 shrink-0 items-center justify-between gap-4',

        // background and border
        'bg-background border-b border-sidebar-border/50',

        // backdrop blur and support check
        'backdrop-blur-lg supports-[backdrop-filter]:bg-background/80',

        // padding and transition
        'px-4 transition-all duration-200 ease-in-out',

        // custom group state selector (experimental)
        'group-has-data-[collapsible=icon]/sidebar-wrapper:h-15',

        // responsive padding
        'md:px-4',

        'shadow-[0_4px_6px_-1px_#0003,0_2px_4px_-1px_#0000001f]',

        // additional className prop
      )
    }>
      <div className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4">


        {/* Separator */}
        <Separator orientation="vertical" className="mx-2 h-6 bg-[rgb(56,72,84)]" />

        {/* Language Switcher */}
        <div className="hidden sm:block">
          <LocaleSwitcher />
        </div>

        {/* Search aligned to right */}
        <SearchForm className="ml-auto w-full max-w-xs sm:max-w-md" />
      </div>
    </header>

  )
}
