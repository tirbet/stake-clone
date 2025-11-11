import { API_URL } from "@/lib/config";
import { getLocale } from "next-intl/server";
import slugify from "slugify";

// --- API response types ---
type TopSportItem = {
  SN: string;   // Sport Name
  SE?: string;  // Sport Name (EN)
  SI: number;   // Sport ID
  L: string;    // League Name
  LE?: string;  // League Name (EN)
  LI: number;   // League ID
  O1: string;   // Team 1
  O1E?: string; // Team 1 (EN)
  O2: string;   // Team 2
  O2E?: string; // Team 2 (EN)
  I: number;    // Event ID
  KI: number;   // 1 = live, 0 = upcoming
};

type TopSportsResponse = {
  Value?: TopSportItem[];
};

// --- Normalized output type ---
export type TopSportEvent = {
  badgeText: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonHref: string;
};

// --- Main function ---
export const topSports = async (
  status: "live" | "upcoming"
): Promise<TopSportEvent[]> => {
  const lng = await getLocale();
  const preUrl = `LineFeed/Get1x2_VZip?count=10&lng=${lng}&mode=4&country=19&top=true&partner=152&virtualSports=true`;
  const liveUrl = `LiveFeed/Get1x2_VZip?count=10&lng=${lng}&mode=4&country=19&top=true&partner=152&virtualSports=true&noFilterBlockEvent=true`;

  const url = `${API_URL}/${status === "live" ? liveUrl : preUrl}`;
  const req = await fetch(url, { next: { revalidate: 10 } });
  const data: TopSportsResponse = await req.json();
  const items = data?.Value || [];

  const events: TopSportEvent[] = items.map((item) => ({
    badgeText: item.SN,
    title: item.L,
    description: `${item.O1} vs ${item.O2}`,
    imageUrl: `/sports/${item.SI}.jpg`,
    buttonText: "Bet Now",
    buttonHref: `${item.KI === 1 ? "/sport/live" : "/sport/upcoming"
      }/${slugify(item.SE || item.SN || "", { lower: true, strict: true })}/${item.LI
      }-${slugify(item.LE || item.L || "", { lower: true, strict: true })}/${item.I
      }-${slugify(item.O1E || item.O1 || "", { lower: true, strict: true })}-vs-${slugify(
        item.O2E || item.O2 || "",
        { lower: true, strict: true }
      )}`,
  }));

  return events;
};
