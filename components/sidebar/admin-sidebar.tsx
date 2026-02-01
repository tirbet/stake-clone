"use client";
import { ChevronRightIcon } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { iconMap, IconName } from '@/lib/icons';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useGetConfig } from "@/features/config/api/use-get-config";
import { useTranslations } from "next-intl";

export default function AdminSideBar() {
  const pathname = usePathname();
  const { data, isLoading } = useGetConfig();
  const t = useTranslations();

  const adminSidebarItems = data?.navigation.admin || [];
  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarMenu>
        {adminSidebarItems.map((item, index) => {

          const isParentActive = pathname.startsWith(item.url);
          const IconComponent = iconMap[item.icon as IconName];
          return (
            <Collapsible
              key={index}
              asChild
              defaultOpen={isParentActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>

                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={`${t.rich(item.name)}`}
                    isActive={isParentActive}   // 🔥 FIXED
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    <Link href={`${item.url}`} className="flex gap-1 items-center justify-center">

                      <span>{`${t.rich(item.name)}`}</span>
                    </Link>

                    {item.items?.length ? (
                      <ChevronRightIcon
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
                    ) : null}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem, index) => {
                        const isChildActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem key={index}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isChildActive}
                            >
                              <Link href={`${subItem.url}`} className="flex items-center gap-2">
                                <span>{`${t.rich(subItem.name)}`}</span>
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
  );
}
