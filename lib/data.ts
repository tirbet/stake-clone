import { AffiliateIcon, BlogIcon, ChatIcon, CouponIcon, GiftIcon, MoreIcon, RaceIcon, SecurityIcon, SupportIcon, TrophyIcon } from "@/components/icons";
import { NavItem } from "@/types/navigation";
import {
  Activity, BarChart3, CreditCard, Currency, FileText, Gamepad2, Gift, LayoutDashboard, LifeBuoy, Mail, Plug, RollerCoaster, Settings2, Shield, Users, Wallet, Wrench,
  Bookmark,
  MessageCircle,
  Vault,
  Crown,
  Share2Icon,
  ChartSpline,
  WalletCards,
  Settings,
  LucideIcon,
  User,
  Gamepad,
  DollarSign,
  Menu,
  SlidersHorizontal,
  Trophy,
  TrendingUp,
  History,
  Bell,
  Search,
  Lock,
  Cog,
  Phone,
  Contact,
  MessageCircleCodeIcon,
  MessageSquare,
  AtSign,
  Map,
  FormInput,
  List,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Ban,
  CheckCircle,
  Star,
  Percent
} from "lucide-react";

export const welcomeNav: NavItem[] = [
  {
    name: "Promotions",
    icon: GiftIcon,
    url: "#",
    items: [
      {
        name: "$75k Weekly Raffle",
        icon: CouponIcon,
        url: "#",
      },
      {
        name: "$100k Race",
        icon: RaceIcon,
        url: "#",
      },
      {
        name: "View All",
        icon: MoreIcon,
        url: "#",
      }
    ]
  },
  {
    name: 'Affiliate',
    icon: AffiliateIcon,
    url: "#"
  },
  {
    name: "VIP Club",
    icon: TrophyIcon,
    url: "#"
  },
  {
    name: "Blog",
    icon: BlogIcon,
    isExternal: true,
    url: "#"
  },
  {
    name: "Forum",
    icon: ChatIcon,
    isExternal: true,
    url: "#"
  }
] as const;

export const sideberInfo: NavItem[] = [
  {
    name: "Responsible Gambling",
    icon: SecurityIcon,
    url: "#"
  },
  {
    name: "Live Support",
    icon: SupportIcon,
    url: "#"
  },
] as const;



export const adminSidebarItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    name: "Configuration",
    icon: Settings2,
    url: "#",
    items: [
      { name: "Game Settings", icon: Gamepad2, url: "/dashboard/configuration/games" },
      { name: "Role Settings", resource: 'Role', icon: RollerCoaster, url: "/dashboard/configuration/role" },
      { name: "Betting Settings", icon: Activity, url: "/dashboard/configuration/betting" },
      { name: "Currency Settings", icon: Currency, url: "/dashboard/configuration/currency" },
      { name: "Payment Settings", icon: CreditCard, url: "/dashboard/configuration/payment" },
      { name: "Bonus & Promotions", icon: Gift, url: "/dashboard/configuration/promotions" },
      { name: "Affiliate Settings", icon: Users, url: "/dashboard/configuration/affiliate" },
      { name: "Security Settings", icon: Shield, url: "/dashboard/configuration/security" },
    ],
  },
  {
    name: "User Management",
    icon: Users,
    url: "#",
    items: [
      { name: "Users", icon: Users, url: "/dashboard/users" },
      { name: "KYC / Verification", icon: FileText, url: "/dashboard/users/kyc" },
    ],
  },
  {
    name: "Finance",
    icon: Wallet,
    url: "#",
    items: [
      { name: "Wallets", icon: Wallet, url: "/dashboard/finance/wallets" },
      { name: "Deposits", icon: CreditCard, url: "/dashboard/finance/deposits" },
      { name: "Withdrawals", icon: CreditCard, url: "/dashboard/finance/withdrawals" },
      { name: "Transactions", icon: Activity, url: "/dashboard/finance/transactions" },
      { name: "Payment Providers", icon: Plug, url: "/dashboard/finance/providers" },
    ],
  },
  {
    name: "Games & Bets",
    icon: Gamepad2,
    url: "#",
    items: [
      { name: "Betting History", icon: Activity, url: "/dashboard/bets/history" },
      { name: "Sportsbook", icon: Gamepad2, url: "/dashboard/bets/sportsbook" },
      { name: "Casino Games", icon: Gamepad2, url: "/dashboard/bets/casino" },
      { name: "Game Providers", icon: Plug, url: "/dashboard/bets/providers" },
      { name: "Risk Management", icon: Shield, url: "/dashboard/bets/risk" },
    ],
  },
  {
    name: "Reports & Analytics",
    icon: BarChart3,
    url: "#",
    items: [
      { name: "Revenue Reports", icon: BarChart3, url: "/dashboard/reports/revenue" },
      { name: "User Activity", icon: Users, url: "/dashboard/reports/users" },
      { name: "Affiliate Reports", icon: Users, url: "/dashboard/reports/affiliates" },
      { name: "Game Performance", icon: Activity, url: "/dashboard/reports/games" },
    ],
  },
  {
    name: "Communication",
    icon: Mail,
    url: "#",
    items: [
      { name: "Announcements", icon: Mail, url: "/dashboard/communication/announcements" },
      { name: "Support Tickets", icon: LifeBuoy, url: "/dashboard/communication/tickets" },
      { name: "Email / SMS Templates", icon: Mail, url: "/dashboard/communication/templates" },
    ],
  },
  {
    name: "System",
    icon: Wrench,
    url: "#",
    items: [
      { name: "Logs", icon: FileText, url: "/dashboard/system/logs" },
      { name: "Integrations", icon: Plug, url: "/dashboard/system/integrations" },
      { name: "Maintenance Mode", icon: Shield, url: "/dashboard/system/maintenance" },
    ],
  },
] as const



const iconMap = {
  Gift,
  Users,
  Bookmark,
  FileText,
  MessageCircle,
  User,
  Wallet,
  Crown,
  Vault,
  Share2Icon,
  ChartSpline,
  WalletCards,
  Settings,
  Gamepad,
  Shield,
  Menu,
  DollarSign,
  SlidersHorizontal,
  Trophy,
  TrendingUp,
  History,
  Bell,
  Search,
  Lock,
  Wrench,
  Cog,
  Phone,
  Mail,
  Contact,
  MessageCircleCodeIcon,
  MessageSquare,
  AtSign,
  Map,
  FormInput,
  List,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Ban,
  CheckCircle,
  Star,
  Percent
};

export type IconName = keyof typeof iconMap;

export const getIconComponent = (name: IconName): LucideIcon => {
  return iconMap[name];
};


const sports = [
  { id: 1, name: "football" },
  { id: 4, name: "tennis" },
  { id: 3, name: "basketball" },
  { id: 2, name: "ice-hockey" },
  { id: 6, name: "volleyball" },
  { id: 29, name: 'beach-volleyball'},
  { id: 10, name: "table-tennis" },
  { id: 66, name: "cricket" },
  { id: 13, name: "american-football" },
  { id: 40, name: "esports" },
  { id: 28, name: "australian-rules" },
  { id: 16, name: "badminton" },
  { id: 278, name: "bare-knuckle-boxing" },
  { id: 5, name: "baseball" },
  { id: 25, name: "beach-soccer" },
  { id: 36, name: "bicycle-racing" },
  { id: 9, name: "boxing" },
  { id: 21, name: "darts" },
  { id: 308, name: "disc-golf" },
  { id: 216, name: "eurovision" },
  { id: 67, name: "floorball" },
  { id: 26, name: "formula-1" },
  { id: 14, name: "futsal" },
  { id: 80, name: "gaelic-football" },
  { id: 41, name: "golf" },
  { id: 68, name: "greyhound-racing" },
  { id: 151, name: "greyhound-racing-antepost" },
  { id: 8, name: "handball" },
  { id: 44, name: "horse-racing" },
  { id: 132, name: "horse-racing-antepost" },
  { id: 126, name: "hurling" },
  { id: 48, name: "lacrosse" },
  { id: 82, name: "lottery" },
  { id: 56, name: "martial-arts" },
  { id: 31, name: "motorbikes" },
  { id: 18, name: "motorsport" },
  { id: 49, name: "netball" },
  { id: 202, name: "politics" },
  { id: 314, name: "polybet" },
  { id: 307, name: "pro-wrestling" },
  { id: 281, name: "rink-hockey" },
  { id: 7, name: "rugby" },
  { id: 30, name: "snooker" },
  { id: 87, name: "special-bets" },
  { id: 102, name: "speedway" },
  { id: 69, name: "toto" },
  { id: 92, name: "trotting" },
  { id: 133, name: "trotting-antepost" },
  { id: 20, name: "tv-games" },
  { id: 189, name: "ufc" },
  { id: 17, name: "water-polo" },
  { id: 22, name: "alpine-skiing" },
  { id: 19, name: "biathlon" },
  { id: 23, name: "ski-jumping" },
  { id: 24, name: "skiing" },
  { id: 138, name: "surfing" },
  { id: 180, name: "kabaddi" },
  { id: 287, name: 'crystal'}
] as const;

export const getSportIdByName = (name: string) => sports.find((sport) => sport.name === name)?.id;
