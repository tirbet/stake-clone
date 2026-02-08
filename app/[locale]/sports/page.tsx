import React, { Suspense } from "react";

import { SportHomeMenu } from "@/components/home/sport/sport-home-menu";

import GetTopGame from "@/features/sport/components/get-top-game";
import GetRecommendationGame from "@/features/sport/components/get-recommendation-game";
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

      <GetTopGame status={'live'} />

      <Suspense fallback={<GameSliderWrapperSkeleton badge={true} />}>
        <GetSportListSlider status="upcoming" />
      </Suspense>

      <GetRecommendationGame status={'upcoming'} />

      
    </React.Fragment>
  );
}



