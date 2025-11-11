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


import { useGetSports } from "@/features/sport/api/use-get-sports";
import { Link } from "@/i18n/navigation";
import slugify from "slugify";
import { SportStatusSwitcher } from "../sport/sport-status-switcher";


type SportSideBarProps = {
  type: "live" | "upcoming";

};

export default function SportSideBar({ type }: SportSideBarProps) {

  const { open } = useSidebar()
  const { data, isError, isLoading, isPending } = useGetSports({ type });

  return (
    <React.Fragment>
      <SportStatusSwitcher open={open} type={type} />

      <SidebarGroup className="px-2 py-0 mt-1.5">
        <SidebarMenu>
          {isLoading || isPending ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Loading sports...
            </div>
          ) : isError ? (
            <div className="p-4 text-center text-sm text-red-500">
              Failed to load sports.
            </div>
          ) : (
            <>
              {
                data.map((sport, index) => (
                  <Collapsible asChild className="group/collapsible" key={index}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild onChange={() => { console.log(sport.id) }}>
                        <SidebarMenuButton
                          tooltip={sport.name}
                        >
                          <SportIcon id={sport.id} />
                          <Link
                            href={`/sport/${type}/${slugify(sport.nameEn || '', { lower: true, strict: true })}`}>
                            {sport.name}
                            <span className="text-muted-foreground ml-1">
                              ({sport.gc})
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
                                    <span className="flex">
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
                                            href={`/sport/${type}/${slugify(sport.nameEn || '', { lower: true, strict: true })}/${league.id}-${slugify(league.nameEn || '', { lower: true, strict: true })}`}
                                            className="flex items-center w-full"
                                          >
                                            <span className="flex max-w-[160px] truncate">
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
            </>
          )
          }
        </SidebarMenu>
      </SidebarGroup>
    </React.Fragment>
  );
}