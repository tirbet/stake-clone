import React, { Suspense } from "react";

import { SportHomeMenu } from "@/components/home/sport/sport-home-menu";

import GetTopGame, { GetTopGameSkeleton } from "@/features/sport/components/get-top-game";
import GetRecommendationGame, { GetRecommendationGameSkeleton } from "@/features/sport/components/get-recommendation-game";
import { GetSportListSlider } from "@/features/sport/components/get-sport-list-slider";
import { GameSliderWrapperSkeleton } from "@/components/home/game-slider-wrapper";


export default function Home() {



  return (
    <React.Fragment>
      {/* <Promotion>
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
      </Promotion> */}
      {/* sports home menu */}
      <SportHomeMenu />
      {/* top matches */}
      <Suspense fallback={<GetTopGameSkeleton />}>
        <GetTopGame status={'live'} />
      </Suspense>

      <Suspense fallback={<GameSliderWrapperSkeleton badge={true} />}>
        <GetSportListSlider status="upcoming" />
      </Suspense>

      <Suspense fallback={<GetRecommendationGameSkeleton />}>
        <GetRecommendationGame status={'upcoming'} />
      </Suspense>

      {/* <GameSliderWrapper
        headder={{ href: '/sports', icon: 'trending_sport', title: 'Top Sports' }}
        content={sports.map((item, index) => (
          <SliderItem key={index}
            href={item.slug}
            image={`/sports/thum/${item.id}.png`}
            count={item.gc}
          />
        ))}
      /> */}
    </React.Fragment>
  );
}



