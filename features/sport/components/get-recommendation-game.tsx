"use client"
import { MatchCardWrapper, MatchCardWrapperSkeleton } from "@/components/home/sport/match-card-wrapper"
import { useGetRecommendationGame } from "../api/use-get-game"

type Props = {
    status: "live" | "upcoming"
}

export default function GetRecommendationGame({ status }: Readonly<Props>) {
    const { data, isLoading } = useGetRecommendationGame({ status })
    if (isLoading) {
        return (<MatchCardWrapperSkeleton />)
    }
    return (
        <MatchCardWrapper data={data} />
    )
}

