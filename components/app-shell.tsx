import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

interface AppShellProps {
    children: React.ReactNode;
}

export async function AppShell({ children }: AppShellProps) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            {children}
        </SidebarProvider>
    );
}