import React, { Suspense } from "react";
import { ErrorMessage } from "@/components/error-message";
import { EventListSkeleton, LeagueList } from "@/components/sport/event";
import { apiClient } from "@/lib/api-client";
import { getLocale } from "next-intl/server";
import { BreadcrumbSkeleton } from "@/components/skeleton/BreadcrumbSkeleton";


type Props = {
  params: Promise<{
    status: string,
    sport: string,
    league: string
  }>;
};
type Locale = "en" | "bn" | "hi";
type Status = "live" | "upcoming";
export default async function League({ params }: Readonly<Props>) {

  const { status, sport, league } = await params;
  const locale = await getLocale() as Locale;
  const { data, error } = await apiClient.GET('/sports/{status}/{sport}/{league}', {
    params: {
      path: { status: status as Status, sport, league },
      query: { locale }
    },
    next: { revalidate: status === "live" ? 10 : 60 }
  })
  if (error) {
    return (<ErrorMessage title={error.error} message='' />)
  }

  return (

    <Suspense fallback={
      <React.Fragment>
        <BreadcrumbSkeleton count={4}/>
        <EventListSkeleton />
      </React.Fragment>}>
      <LeagueList iniData={data.data} />
    </Suspense>
  );
}



