"use client"
import { cn } from "@/lib/utils"
import AppLogo from "@/components/app-logo"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { User } from "@/types/auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { UserMenuContent } from "./user-menu-content"
import { useInitials } from "@/hooks/use-initials"

export function SiteHeader({ user }: { user?: User }) {
  const getInitials = useInitials();
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
          {user && (
            <div className="relative flex items-center justify-center">
              <div className="flex items-center bg-gray-800 p-1 rounded-lg">
                <div className="flex items-center gap-2 text-white">
                  <span className="text-lg sm:text-xl">
                    $504.20
                  </span>
                </div>
                <button
                  onClick={() => { }}
                  className={cn(
                    'ml-2 sm:ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 sm:px-3 rounded-md text-sm sm:text-base')}
                >
                  Wallet
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-1">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="size-10 rounded-full p-1">
                    <Avatar className="size-8 overflow-hidden rounded-full">
                      {user.image && (<AvatarImage src={user.image} alt={user.name} />)}
                      <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <UserMenuContent user={user} showUserInfo={true} />
                </DropdownMenuContent>
              </DropdownMenu>

            ) : (
              <div className='flex flex-row gap-2'>
                <Link href={'/login'}>
                  <Button variant="outline" size="lg" className={''}>
                    Login
                  </Button>
                </Link>
                <Link href={'/register'}>
                  <Button size="lg" className={'bg-blue-400 hover:bg-blue-500 text-white'}>
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

  )
}
