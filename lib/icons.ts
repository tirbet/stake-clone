import { SecurityIcon } from "@/components/icons";
import { BellIcon, HelpCircleIcon, LayoutDashboardIcon, SettingsIcon, TrophyIcon, UsersIcon, WalletIcon } from "lucide-react";

export const iconMap = {
  dashboard: LayoutDashboardIcon,
  settings: SettingsIcon,
  security: SecurityIcon,
  users: UsersIcon,
  wallet: WalletIcon,
  trophy: TrophyIcon,
  bell: BellIcon,
  help: HelpCircleIcon,
} as const;

export type IconName = keyof typeof iconMap;