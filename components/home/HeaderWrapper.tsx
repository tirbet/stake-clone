"use client";

import { Dice5, Play, Trophy } from "lucide-react";
import Card from "./Card";
import Welcome from "./Welcome";
import AuthenticatedCard from "./AuthenticatedCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search } from "../search";
import { User } from "@/types/auth";
import Image from "next/image";

type Props = {
    user: User | undefined;
};

export default function HeaderWrapper({ user }: Props) {

    const isMobile = useIsMobile();
    return (
        <>
            <div className="relative flex justify-center py-4 md:py-6 w-full min-h-[400px] overflow-hidden pt-15">
                <Image
                    src="/assets/header-bg.png"
                    alt="Casino and Sports background"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />

                <div className="relative mt-16 md:mt-20 max-w-screen-xl mx-auto flex w-full items-center justify-between px-4">
                    <div className="grid w-full gap-8 text-white md:grid-cols-[40%_1fr] items-center">
                        {user ? (
                            <AuthenticatedCard />
                        ) : (
                            <Welcome
                                title="World's Largest Online Casino and Sportsbook"
                                register="Register"
                                orText="Or sign up with"
                                socail={{ facebook: true, google: false, line: false, twitch: true }}
                            />
                        )}

                        {!isMobile && (
                            <div className="flex gap-4 justify-end">
                                <Card
                                    title="Casino"
                                    href="casino"
                                    imageUrl="https://mediumrare.imgix.net/stake-casino-home-18-jul-25-en.png?w=350&h=230&fit=min&auto=format"
                                    viewers={46108}
                                    icon={Dice5}
                                />
                                <Card
                                    title="Sports"
                                    href="sport"
                                    imageUrl="https://mediumrare.imgix.net/stake-sports-home-18-jul-25-en.png?w=350&h=230&fit=min&auto=format"
                                    viewers={21372}
                                    icon={Trophy}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isMobile && (
                <div className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4">
                    <div className="relative w-full max-w-full text-white grid items-center gap-8 grid-cols-1 md:gap-0 md:justify-between md:[grid-template-columns:40%_55%]">
                        <Search />
                        {/* Mobile cards */}
                        <span className="flex items-center gap-1 text-[1.12rem] text-white font-bold">
                            <Play className="bg-white rounded-2xl text-black p-1 h-[1.12rem] w-[1.12rem]" />
                            Start Playing
                        </span>
                        <div className="flex gap-1.5 md:gap-4 xl:gap-2.5 justify-end">
                            <Card
                                title="Casino"
                                href={'casino'}
                                imageUrl="https://mediumrare.imgix.net/stake-casino-home-18-jul-25-en.png?w=350&h=230&fit=min&auto=format"
                                viewers={46108}
                                icon={Dice5}
                            />
                            <Card
                                title="Sports"
                                href={'sport'}
                                imageUrl="https://mediumrare.imgix.net/stake-sports-home-18-jul-25-en.png?w=350&h=230&fit=min&auto=format"
                                viewers={21372}
                                icon={Trophy}
                            />
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}

