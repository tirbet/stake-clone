import type { SportEventItem } from "@/components/sport/event";
import { useGetSport } from "@/features/sport/api/use-get-sport";
import { useGetGame } from "@/features/sport/api/use-get-game";

export interface WeatherInfo {
  temperature?: string;
  cloudLevel?: string;
  cloudDescription?: string;
  uvIndex?: string;
  windSpeed?: string;
  windDirection?: string;
  windUnit?: string;
  pressure?: {
    value?: string;
    unit?: string;
  };
  humidity?: {
    value?: string;
    unit?: string;
  };
  precipitation?: {
    value?: string;
    unit?: string;
  };
}

export type MarketItem = SportEventItem["markets"][number]["outcomes"][number][number];
export type MarketGroup = SportEventItem["markets"][number];
export type SportEventItem = NonNullable<ReturnType<typeof useGetSport>['data']>[number];
export type Game = NonNullable<ReturnType<typeof useGetGame>['data']>;
export type Team = Game['team'];
export type GameGroup = Game['groups'][0];