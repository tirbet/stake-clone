import { ErrorMessage } from "@/components/error-message";
import { GameSliderWrapperSkeleton } from "@/components/home/game-slider-wrapper";

import { SportHomeMenu } from "@/components/home/sport/sport-home-menu";
import { GetSportListSlider } from "@/features/sport/components/get-sport-list-slider";
import GetTopGame from "@/features/sport/components/get-top-game";

import React, { Suspense } from "react";
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

  return (
    <React.Fragment>

      {/* sports home menu */}
      <SportHomeMenu />
      <GetTopGame status={status} />

      <Suspense fallback={<GameSliderWrapperSkeleton badge={true} />}>
        <GetSportListSlider status={status} />
      </Suspense>
    </React.Fragment>
  );
}



