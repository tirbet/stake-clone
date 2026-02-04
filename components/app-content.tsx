"use server";
import { ComponentProps } from 'react';
import { SidebarInset } from '@/components/ui/sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { MobileBottomNav } from './mobile-bottom-nav';
import { getSession } from '@/lib/get-session';



export async function AppContent({ children, ...props }: ComponentProps<'main'>) {
    const { user } = await getSession()
    return (
        <SidebarInset className='md:peer-data-[variant=inset]:m-0 bg-muted' {...props}>
            <AppSidebarHeader user={user} />
            {/* max-w-7xl  */}
            <main className="mx-auto bg-[#1a2c38] flex h-full w-full flex-1 flex-col gap-4 rounded-xl md:pb-0" {...props}>
                {/* Add this wrapper div for mobile content */}
                <div className="flex-1 pb-28 md:pb-0">
                    {children}
                </div>
            </main>
            <MobileBottomNav />
        </SidebarInset>
    );
}