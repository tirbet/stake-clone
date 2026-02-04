"use client";
import React from "react";
import { ChevronRightIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SportIcon } from "@/components/icon";


import { Link, useRouter } from "@/i18n/navigation";
import { SportStatusSwitcher } from "../sport/sport-status-switcher";
import { useGetSports } from "@/features/sport/api/use-get-game";
import FlagIcon from "@/components/icons/flag";


export default function SportSideBar() {

  const { open } = useSidebar()
  const { data } = useGetSports();
  return (
    <React.Fragment>
      <SportStatusSwitcher open={open} />

      <SidebarGroup className="px-2 py-0 mt-1.5">
        <SidebarMenu>
          {
            data.map((sport, index) => (
              <Collapsible asChild className="group/collapsible" key={index}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={sport.name}
                    >
                      <SportIcon id={sport.id} />
                      <Link
                        href={sport.slug}>
                        <span className="truncate">
                          {sport.name}
                          <span className="text-muted-foreground ml-1" >({sport.gc})</span>
                        </span>
                      </Link>
                      <ChevronRightIcon
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        aria-hidden
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="-ml-5.5 py-1">
                    <SidebarMenuSub>
                      {sport.countries.map((country, index) => (
                        <Collapsible asChild className="group/collapsible" key={index}>
                          <SidebarMenuSubItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuSubButton>
                                <span className="flex gap-2">
                                  <FlagIcon countryCode={country.id} />
                                  {country.name}
                                  <span className="text-muted-foreground ml-1">
                                    ({country.leagues.map(league => league.gc).reduce((a, b) => a + b, 0)})
                                  </span>
                                </span>
                                <ChevronRightIcon
                                  className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                  aria-hidden
                                />
                              </SidebarMenuSubButton>
                            </CollapsibleTrigger>

                            <CollapsibleContent className="-ml-4 py-1">
                              <SidebarMenuSub>
                                {country.leagues.map((league) => (
                                  <SidebarMenuSubItem key={league.id}>
                                    <SidebarMenuSubButton asChild>
                                      <Link
                                        href={league.slug}
                                        className="flex items-center w-full"
                                      >
                                        <span className="flex max-w-40 truncate">
                                          <span className="truncate">{league.name}</span>
                                          <span className="text-muted-foreground ml-1">
                                            ({league.gc})
                                          </span>
                                        </span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuSubItem>
                        </Collapsible>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))
          }
        </SidebarMenu>
      </SidebarGroup>
    </React.Fragment>
  );
}