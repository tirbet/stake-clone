import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { User } from '@/types/auth';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    sidebarItem: ReactNode;
    user?: User;
}

export default ({ user, children, sidebarItem }: AppLayoutProps) => {
    return (
        <AppShell>
            <AppSidebar
                collapsible='icon'
                variant='inset'
                side='left'
                >
                {sidebarItem}
            </AppSidebar>
            <AppContent user={user}>
                {children}
            </AppContent>          
        </AppShell>
    )
};