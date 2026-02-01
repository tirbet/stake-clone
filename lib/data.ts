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





export const sports = [
  { id: 1, name: "football" },
  { id: 4, name: "tennis" },
  { id: 3, name: "basketball" },
  { id: 2, name: "ice-hockey" },
  { id: 6, name: "volleyball" },
  { id: 29, name: 'beach-volleyball' },
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
  { id: 287, name: 'crystal' }
] as const;

export const getSportIdByName = (name: string) => sports.find((sport) => sport.name === name)?.id;
