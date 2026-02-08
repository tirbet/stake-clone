"use client"
import { MatchCardWrapper, MatchCardWrapperSkeleton } from "@/components/home/sport/match-card-wrapper"
import { useGetTopGame } from "../api/use-get-game"


type Props = {
    status: "live" | "upcoming"
}

export default function GetTopGame({ status }: Readonly<Props>) {
    const { data, isLoading } = useGetTopGame({ status })

    if(isLoading){
        return(<MatchCardWrapperSkeleton />)
    }
    return (
         <MatchCardWrapper data={data} />
    )
}
