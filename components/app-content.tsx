import { SidebarInset } from '@/components/ui/sidebar';
import * as React from 'react';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { User } from '@/types/auth';
import { MobileBottomNav } from './mobile-bottom-nav';

interface AppContentProps extends React.ComponentProps<'main'>{
    user?: User;
}

export function AppContent({user, children, ...props }: AppContentProps) {
    return (
        <SidebarInset className='md:peer-data-[variant=inset]:m-0 bg-muted' {...props}>
            <AppSidebarHeader user={user}/>
            {/* max-w-7xl  */}
            <main className="mx-auto flex h-full  w-full flex-1 flex-col gap-4 rounded-xl" {...props}>
                {children}
            </main>
            <MobileBottomNav />
        </SidebarInset>
    );
}