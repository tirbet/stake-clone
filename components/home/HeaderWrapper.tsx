"use client";

import { Dice5, Play, Trophy } from "lucide-react";
import Card from "./Card";
import Welcome from "./Welcome";
import AuthenticatedCard from "./AuthenticatedCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search } from "../search";
import Image from "next/image";
import { useUserStore } from "@/store/user-store";



export default function HeaderWrapper() {
    const { user } = useUserStore()
    const isMobile = useIsMobile();
    return (
        <div
            className="w-full bg-cover bg-center bg-no-repeat py-8"
            style={{
                backgroundImage: `
      -webkit-image-set(
        url("/assets/header-bg.png?auto=format&q=70&w=1680&dpr=1") 1x,
        url("/assets/header-bg.png?auto=format&q=70&w=1680&dpr=2") 2x
      ),
      image-set(
        url("/assets/header-bg.png?auto=format&q=70&w=1680&dpr=1") 1x,
        url("/assets/header-bg.png?auto=format&q=70&w=1680&dpr=2") 2x
      )
    `,
            }}
        >
            <div className="mx-auto max-w-7xl px-4 flex items-center">
                <div className="grid w-full gap-8 text-white grid-cols-1 md:grid-cols-[40%_60%] items-center">

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

                    <div className="flex gap-4 justify-start md:justify-end">
                        <Card
                            title="Casino"
                            href="casino"
                            imageUrl="https://mediumrare.imgix.net/stake-casino-home-18-jul-25-en.png?w=350&h=230&fit=min&auto=format"
                            viewers={46108}
                            icon={Dice5}
                        />
                        <Card
                            title="Sports"
                            href="sports"
                            imageUrl="https://mediumrare.imgix.net/stake-sports-home-18-jul-25-en.png?w=350&h=230&fit=min&auto=format"
                            viewers={21372}
                            icon={Trophy}
                        />
                    </div>

                </div>
            </div>
        </div>

    )
}

