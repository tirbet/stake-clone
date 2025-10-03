"use client"

import { cn } from "@/lib/utils"
import AppLogo from "./app-logo"
import { Link } from "@/i18n/navigation"
import { Button } from "./ui/button"

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
        <div className="relative flex items-center justify-between w-full max-h-15">
          <div className="flex items-center">
            <AppLogo isAdmin={false} />
          </div>
          <div className="flex items-center space-x-1">
            <div className='flex flex-row gap-2'>
                <Link href={'/login'}>
                  <Button variant="outline" size="lg" className={''}>
                   Login
                  </Button>
                </Link>
                <Link href={'/register'}>
                  <Button  size="lg" className={'bg-blue-400 hover:bg-blue-500 text-white'}>
                    Register
                  </Button>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </header>

  )
}
