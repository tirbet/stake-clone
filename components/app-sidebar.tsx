"use client";
import React from 'react';
import { cn } from '@/lib/utils';

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar';
import { useSidebar } from "@/components/ui/sidebar"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@/i18n/navigation';




interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    children: React.ReactNode;
    show?: boolean;
}

export function AppSidebar({ children, show = true, ...props }: AppSidebarProps) {
    const { open } = useSidebar();
    return (
        <Sidebar {...props}>
            <SidebarHeader className={cn('')}>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-0 h-full">
                            <SidebarTrigger className="w-10 h-10" />
                            {open && show && (
                                <div className="flex items-center gap-1 h-full">
                                    <Link
                                        href={'/sport'}
                                        className={cn(
                                            "inline-flex items-center justify-center",
                                            "bg-transparent text-sidebar-foreground",
                                            "border border-sidebar-border",
                                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                            "active:bg-sidebar-primary active:text-sidebar-primary-foreground",
                                            "w-22 h-10 text-sm font-medium",
                                            "rounded-[var(--radius-sm)]",
                                            "transition-colors",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                                        )}
                                    >
                                        Sport
                                    </Link>
                                    <Link
                                        href={'/casino'}
                                        className={cn(
                                            "inline-flex items-center justify-center",
                                            "bg-transparent text-sidebar-foreground",
                                            "border border-sidebar-border",
                                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                            "active:bg-sidebar-primary active:text-sidebar-primary-foreground",
                                            "w-24 h-10 text-sm font-medium",
                                            "rounded-[var(--radius-sm)]",
                                            "transition-colors",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                                        )}
                                    >
                                        Casino
                                    </Link>
                                </div>
                            )}
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className={cn(open ? 'bg-muted' : 'bg-sidebar')}>
                <ScrollArea className="h-full w-full">
                    {children}
                </ScrollArea>
            </SidebarContent>
        </Sidebar>
    );
}