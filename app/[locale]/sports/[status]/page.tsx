import { ErrorMessage } from "@/components/error-message";
import Promotion from "@/components/home/Promotion";
import PromotionItem from "@/components/home/PromotionItem";

import { topSports } from "@/lib/sport/top-sports";
type Props = {
  params: Promise<{ status: string }>;
};

export default async function Sport({ params }: Readonly<Props>) {

  const { status } = await params;


  if (status !== "live" && status !== "upcoming") {
    return (
      <ErrorMessage
        title="Invalid Status"
        message={`"${status}" is not a valid status. Please use "live" or "upcoming".`}
      />
    );
  }
  const promotions = await topSports(status);
  return (
    <Promotion>
      {promotions.map((event, index) => (
        <PromotionItem
          key={index}
          badgeText={event.badgeText}
          title={event.title}
          description={event.description}
          imageUrl={event.imageUrl}
          buttonText={event.buttonText}
          buttonHref={event.buttonHref}
        />
      ))}
    </Promotion>

  );
}



