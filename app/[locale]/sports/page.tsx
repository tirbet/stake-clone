import React from "react";
import Promotion from "@/components/home/Promotion";
import PromotionItem from "@/components/home/PromotionItem";
import { topSports } from "@/lib/sport/top-sports";
import { SportHomeMenu } from "@/components/home/sport/sport-home-menu";
import TopMatchCard, { MatchCardWrapper } from "@/components/home/sport/match-card-wrapper";
import { GameSliderWrapper, SliderItem } from "@/components/home/game-slider-wrapper";
import { apiClient } from "@/lib/api-client";
import GetTopGame from "@/features/sport/components/get-top-game";


export default async function Home() {

  const promotions = await topSports('upcoming');
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
    <React.Fragment>
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
      {/* sports home menu */}
      <SportHomeMenu />
      <GetTopGame status={'live'} />

      <GameSliderWrapper
        headder={{ href: '/sports', icon: 'trending_sport', title: 'Top Sports' }}
        content={sports.map((item, index) => (
          <SliderItem key={index}
            href={item.slug}
            image={`/sports/thum/${item.id}.png`}
            count={item.gc}
          />
        ))}
      />
    </React.Fragment>
  );
}



