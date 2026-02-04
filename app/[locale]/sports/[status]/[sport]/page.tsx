
import { EventList, EventListSkeleton } from "@/components/sport/event";
import SportBreadcrumb from "@/components/sport/sport-breadcrumb";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
type Props = {
  params: Promise<{ status: string, sport: string }>;
};

export default async function League({ params }: Readonly<Props>) {
  const t = await getTranslations();
  const { sport, status } = await params;
  return (
    <>
      <SportBreadcrumb
        back={`/sports`}
        items={[
          {
            name: t(`status.${status}`),
            url: `/sports/${status}`,
          },
          {
            name:  t(`sports.${sport}`),
            url: sport,
          }
        ]}
      />
      <Suspense fallback={<EventListSkeleton />}>
        <EventList />
      </Suspense>
    </>);
}



