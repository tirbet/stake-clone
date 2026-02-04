import { GameSliderWrapper, SliderItem } from "@/components/home/game-slider-wrapper";
import HeaderWrapper from "@/components/home/HeaderWrapper";
import AppLayout from "@/components/layouts/app-layout";
import { InstallPrompt, PushNotificationManager } from "@/components/pwa";
import Welcome from "@/components/sidebar/welcome";
import { apiClient } from "@/lib/api-client";

export default async function Home() {

  const sports = await apiClient.GET('/sports/{status}', {
    params: {
      query: {
        locale: 'en'
      },
      path: {
        status: 'upcoming'
      }
    }
  }).then(res => res.data?.data || []);
  return (
    <AppLayout sidebarItem={<Welcome />}>
      <HeaderWrapper />

      <GameSliderWrapper
        headder={{ href: `/sports`, icon: 'trending_sport', title: 'Top Sports' }}
        content={sports.map((item, index) => (
          <SliderItem key={index}
            href={item.slug}
            image={`/sports/thum/${item.id}.png`}
            count={item.gc}
          />
        ))}
      />
      {/* <PushNotificationManager />
      <InstallPrompt /> */}

    </AppLayout>

  );
}



