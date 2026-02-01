import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    sidebarItem: ReactNode;
}

export default ({ children, sidebarItem }: AppLayoutProps) => {
    return (
        <AppShell>
            <AppSidebar
                collapsible='icon'
                variant='inset'
                side='left'
                >
                {sidebarItem}
            </AppSidebar>
            <AppContent>
                {children}
            </AppContent>          
        </AppShell>
    )
};