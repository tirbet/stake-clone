import { ErrorMessage } from "@/components/error-message";
import { GameSliderWrapper, SliderItem } from "@/components/home/game-slider-wrapper";
import Promotion from "@/components/home/Promotion";
import PromotionItem from "@/components/home/PromotionItem";
import TopMatchCard, { MatchCardWrapper } from "@/components/home/sport/match-card-wrapper";
import { SportHomeMenu } from "@/components/home/sport/sport-home-menu";
import GetTopGame from "@/features/sport/components/get-top-game";
import { apiClient } from "@/lib/api-client";

import { topSports } from "@/lib/sport/top-sports";
import React from "react";
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
  const sports = await apiClient.GET('/sports/{status}', {
    params: {
      query: {
        locale: 'en'
      },
      path: {
        status: status as 'live' | 'upcoming'
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
      <GetTopGame status={status} />

      <GameSliderWrapper
        headder={{ href: `/sports/${status}`, icon: 'trending_sport', title: 'Top Sports' }}
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



