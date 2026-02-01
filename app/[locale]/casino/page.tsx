import Promotion from "@/components/home/Promotion";
import PromotionItem from "@/components/home/PromotionItem";

export default async function Casino() {

  const promotions = [
    {
      badgeText: 'VIP Only',
      title: 'Stake Mission Royale',
      description: '$100K prize for the grand winner',
      imageUrl: '/promotions/1.png',
      buttonText: 'Learn More',
      buttonHref: '#',
    },
 {
      badgeText: 'Promotion',
      title: 'Daily Races',
      description: 'Play in our $100,000 Daily Race',
      imageUrl: '/promotions/2.png',
      buttonText: 'Race Now',
      buttonHref: '#',
    },
    {
      badgeText: 'Promotion',
      title: 'Weekly Raffle',
      description: 'Share in $75,000 each week',
      imageUrl: '/promotions/3.png',
      buttonText: 'Learn More',
      buttonHref: '#',
    },
    {
      badgeText: 'Promotion',
      title: 'All in or Fold Jackpot',
      description: '$500,000 In Prizes!',
      imageUrl: '/promotions/4.png',
      buttonText: 'Learn More',
      buttonHref: '#',
    }
  ];
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



