import Promotion from "@/components/home/Promotion";
import PromotionItem from "@/components/home/PromotionItem";
import { topSports } from "@/lib/sport/top-sports";
import AppLayout from '@/components/layouts/app-layout';
import SportSideBar from '@/components/sidebar/sport-sidebar';


export default async function Home() {

  const promotions = await topSports('upcoming');


  return (
    <AppLayout sidebarItem={<SportSideBar type="upcoming" />}>

      <div className="max-w-7xl mx-auto flex w-full items-center justify-between px-2">
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


      </div>
    </AppLayout>
  );
}



