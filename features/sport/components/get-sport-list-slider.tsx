"use client";

import { useSportStatus } from "@/store/sport-status";
import { useEffect } from "react";
import { useGetSports } from "../api/use-get-game";
import { GameSliderWrapper, SliderItem } from "@/components/home/game-slider-wrapper";
import { useTranslations } from "next-intl";

type Props = {
    status: "live" | "upcoming"
}
export const GetSportListSlider = ({ status }: Readonly<Props>) => {
    const { setStatus, status: storStatus } = useSportStatus()
    const { data: sports } = useGetSports();
    useEffect(() => {
        setStatus(status)
    }, [status])
    const t = useTranslations();
    return (
        <GameSliderWrapper
            headder={{ href: `/sports/${status}`, icon: 'trending_sport', title: `${t(`status.${storStatus}`)} ${t(`sports.name`)}` }}
            content={sports.map((item, index) => (
                <SliderItem key={index}
                    href={item.slug}
                    image={`/sports/thum/${item.id}.png`}
                    count={item.gc}
                />
            ))}
        />
    );
}