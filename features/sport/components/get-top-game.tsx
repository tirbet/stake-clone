"use client"
import TopMatchCard, { MatchCardWrapper } from "@/components/home/sport/match-card-wrapper"
import { useGetTopGame } from "../api/use-get-game"

type Props = {
    status: "live" | "upcoming"
}

export default function GetTopGame({ status }: Readonly<Props>) {
    const { data } = useGetTopGame({ status })
    return (
        <MatchCardWrapper
            title="Top Matches"
            content={data.map((item, index) => (
                <TopMatchCard key={index} item={item} />
            ))} />
    )
}