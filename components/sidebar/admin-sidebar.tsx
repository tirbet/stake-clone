"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { getIconComponent, IconName } from '@/lib/data';

import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RenderIcon } from "../icon";
import { AdminNavigationSubItem } from "@/types/website-settings";

export default function AdminSideBar() {
  const { config } = usePage<SharedData>().props;
  const { url } = usePage();
  const { navigation } = config;
  const { admin_navigation } = navigation;
  const currentPath = new URL(url, window.location.origin).pathname;

  const isActive = (href: string, subItems: AdminNavigationSubItem[] | null) => {
    const itemPath = new URL(href, window.location.origin).pathname;

    if (subItems?.some(sub => currentPath.startsWith(new URL(sub.href, window.location.origin).pathname))) {
      return true;
    }

    return currentPath.startsWith(itemPath);
  };
  // usePoll(5000)
  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarMenu>
        {admin_navigation?.map((item) => {
          const active = isActive(item.href, item.subItems);
          return (
            <Collapsible key={item.key} asChild defaultOpen={active} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.name} isActive={active}
                  >
                    <RenderIcon item={item.icon} />
                    <Link href={item.href} preserveScroll preserveState>
                      <span>{item.name}</span>
                    </Link>
                    {item.subItems?.length ? (
                      <ChevronRight
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        aria-hidden
                      />
                    ) : null}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item.subItems?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => {
                        const subActive = currentPath.startsWith(new URL(subItem.href, window.location.origin).pathname);
                        return (
                          <SidebarMenuSubItem key={subItem.key}>
                            <SidebarMenuSubButton asChild isActive={subActive}>
                              <Link href={subItem.href} preserveScroll preserveState className="flex items-center gap-2">
                                <RenderIcon item={subItem.icon} />
                                <span>{subItem.name}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
