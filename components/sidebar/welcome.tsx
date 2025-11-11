"use client";
import React from "react";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Collapsible } from "@/components/ui/collapsible";
import { welcomeNav } from "@/lib/data";
import { Link } from "@/i18n/navigation";

export default function Welcome() {
    const items = welcomeNav;
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenu>
                {items?.map((item, index) => (
                    <Collapsible key={index} asChild className="group/collapsible">
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton
                                asChild
                                className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                                tooltip={{ children: item.name, side: 'top', }}>
                                <Link href={item.url}>
                                    {item.icon &&  <item.icon /> }{item.name}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}