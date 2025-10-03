"use client"
import { sideberInfo, welcomeNav as welcomeItems } from "@/lib/data"
import { NavMain } from "./nav-main";


export const WelcomeNav = () => {
  return <NavMain items={welcomeItems} />;
}

export const SidebarInfo = () => {
  return <NavMain items={sideberInfo} separator={true} />;
}
