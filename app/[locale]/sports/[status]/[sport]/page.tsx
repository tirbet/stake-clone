import { ErrorMessage } from "@/components/error-message";
import { EventList } from "@/components/sport/event";
import { apiClient } from "@/lib/api-client";
import { getSportIdByName } from "@/lib/data";
import { getLocale } from "next-intl/server";

type Props = {
  params: Promise<{ status: string, sport: string }>;
};
type Locale = "en" | "bn" | "hi";
type Status = "live" | "upcoming";
export default async function League({ params }: Readonly<Props>) {
  const { status, sport } = await params;
  const locale = await getLocale() as Locale;
  const { data, error } = await apiClient.GET('/sports/{status}/{sport}', {
    params: {
      path: { status: status as Status, sport },
      query: { locale }
    },
    next: { revalidate: status === "live" ? 10 : 60 }
  })
  if (error) {
    return (<ErrorMessage title={error.error} message='' />)
  }
  return (<EventList iniData={data.data} />);
}



