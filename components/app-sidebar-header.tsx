
import { cn } from '@/lib/utils';
import AppLogo from './app-logo';

import { Button } from './ui/button';
import { User } from '@/types/auth';
import { Link } from '@/i18n/navigation';



interface AppSidebarHeaderProps {
    user?: User
    className?: string;
    showSearch?: boolean;
    showUserNav?: boolean;
}

export function AppSidebarHeader({
    className,
    user,
}: AppSidebarHeaderProps) {



    return (
        <header
            className={cn(
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
                className
            )}
        >
            <div className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4">
                <div className="relative flex items-center justify-between w-full max-h-15">
                    <div className="flex items-center">
                        <AppLogo />
                    </div>

                    {user && (
                        <div className="relative flex items-center justify-center">
                            <div className="flex items-center bg-gray-800 p-1 rounded-lg">
                                <div className="flex items-center gap-2 text-white">
                                    {/* Text size adjusts based on screen size */}
                                    <span className="text-lg sm:text-xl">
                                        $ 23,450.00
                                    </span>
                                </div>
                                {/* Smaller button on mobile */}
                                <button
                                    onClick={() => { }}
                                    className={cn(
                                        'ml-2 sm:ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 sm:px-3 rounded-md text-sm sm:text-base')}
                                >
                                    wallet
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center space-x-1">
                        {user ? (<>
                            <>User Icone</>
                        </>) : (
                            <div className='flex flex-row gap-2'>
                                <Link href={'login'}>
                                    <Button variant="login" size="lg" className={''}>
                                        Login
                                    </Button>
                                </Link>
                                <Link href={'register'}>
                                    <Button variant="register" size="lg" className={''}>
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </header>
    );
}