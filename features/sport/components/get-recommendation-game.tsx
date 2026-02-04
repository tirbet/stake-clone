"use client"
import TopMatchCard, { MatchCardWrapper, TopMatchCardSkeleton } from "@/components/home/sport/match-card-wrapper"
import { useGetRecommendationGame } from "../api/use-get-game"

type Props = {
    status: "live" | "upcoming"
}

export default function GetRecommendationGame({ status }: Readonly<Props>) {
    const { data } = useGetRecommendationGame({ status })
    return (
        <MatchCardWrapper
            title="Recommendation Matches"
            content={data.map((item, index) => (
                <TopMatchCard key={index} item={item} />
            ))} />
    )
}

export const GetRecommendationGameSkeleton = () => {
    return (
        <MatchCardWrapper
            title="Recommendation Matches"
            content={Array.from({ length: 5 }).map((_, index) => (
                <TopMatchCardSkeleton key={index} />
            ))} />
    )
}