'use client';

import { useFetchApi } from "@/api/use-sport";
import { mapSportItem } from "@/dto/sport-api.response.dto";


type Sport = {
  C: number,
  CC: number,
  E?: string,
  N: string,
  I: number,
  MS?: number,
}

export default function Home() {
  const { data, isLoading, isError, error } = useFetchApi<Sport[]>({ url: 'LiveFeed/GetSportsShortZip?lng=en&gr=526&country=19&partner=152&virtualSports=true&groupChamps=true' });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  const excludedIds = [40,44,68,85,92,220,282,103,82,211, 287,306,292,284,188,167,311,274,258,146,235,153,236,243,268,301,257, 210];
  const sports = data?.filter(item => !("MS" in item) && !excludedIds.includes(item.I)).map(mapSportItem)
  return (
    <div className="">
      <ul>
        home
        {sports?.map((sport, index) => (
          <li key={index}>
            {sport.name} ({sport.count})
          </li>
        ))}
      </ul>
    </div>
  );
}
