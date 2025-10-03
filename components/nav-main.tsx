"use client"

import { ChevronRight } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "@/i18n/navigation"
import { useState } from "react"
import type { NavItem } from "@/types/navigation"
import { Separator } from "./ui/separator"


export function NavMain({ items, separator }: { items: NavItem[], separator?: boolean }) {
    const [isActive, setIsActive] = useState(false);
    return (
        <SidebarGroup>
            <SidebarMenu>
                {separator && <Separator className="mb-3"/>}
                {items.map((item, index) => (
                    <Collapsible key={index} asChild defaultOpen={isActive} onOpenChange={(open) => setIsActive(open)}>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={item.name}>
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                            {item.items?.length ? (
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                                            <ChevronRight />
                                            <span className="sr-only">Toggle</span>
                                        </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem, index) => (
                                                <SidebarMenuSubItem key={index}>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href={subItem.url}>
                                                            <subItem.icon />
                                                            <span>{subItem.name}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            ) : null}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
