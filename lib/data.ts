import { AffiliateIcon, BlogIcon, ChatIcon, CouponIcon, GiftIcon, MoreIcon, RaceIcon, SecurityIcon, SupportIcon, TrophyIcon } from "@/components/icons";
import { NavItem } from "@/types/navigation";

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
