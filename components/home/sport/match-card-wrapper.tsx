"use client";
import { useMemo, useState } from "react";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CircleDollarSign, ClockIcon, FlameIcon, TvIcon } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormattedStartTime } from "@/hooks/use-formatted-start-time";
import { SportIcon } from "@/components/icon";
import { useLocale, useTranslations } from "next-intl";
import { useCarouselNavigation } from "@/hooks/use-carousel-navigation";
import { SliderArrowButton } from "@/components/sport/slider/slider-arrow-button";
import { useCouponStore } from "@/store/coupon-store";

type Props = {
    data?: {
        title: string;
        data: GetSportsResponse
    };
};

export const MatchCardWrapper = ({ data }: Readonly<Props>) => {
    const [emblaApi, setEmblaApi] = useState<CarouselApi | undefined>(undefined);
    const { canScrollPrev, canScrollNext } = useCarouselNavigation(emblaApi);


    return (
        <Carousel
            setApi={setEmblaApi}
            opts={{
                slidesToScroll: 'auto',
                align: 'start',
            }}
            className="flex flex-col w-full overflow-x-hidden mt-3"
        >
            {/* header */}
            <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2">
                    <CircleDollarSign className="w-5 h-5 text-white" />
                    <h2 className="text-lg font-semibold">{data?.title}</h2>
                </div>
                {/* arrows */}
                <div className="inline-flex gap-1.5 items-center rounded-full border border-[#2f4553] bg-[#1a2c38] backdrop-blur">
                    {/* left */}
                    <SliderArrowButton canScroll={canScrollPrev} direction="prev" onClick={() => emblaApi?.scrollPrev()} />

                    {/* divider */}
                    <div className="h-6 w-px bg-white/10" />

                    {/* right */}
                    <SliderArrowButton canScroll={canScrollNext} direction="next" onClick={() => emblaApi?.scrollNext()} />
                </div>

            </div>
            {/* gallery */}
            <CarouselContent className={cn(
                "grid grid-flow-col mt-2",
                " auto-cols-[100%]",
                "sm:auto-cols-[50%]",
                " lg:auto-cols-[33.33%]",
                "-ml-[4.5px] -mr-[4.5px]",
                "snap-x snap-mandatory scroll-smooth"
            )}>
                {data?.data?.map(item => (<TopMatchCard key={item.id} item={item} />))}

            </CarouselContent>
        </Carousel>
    );
};

type TopMatchCardProps = {
    item?: GetSportsResponse[number];
}

function TopMatchCard({ item }: Readonly<TopMatchCardProps>) {
    const t = useTranslations();
    const { addItem, coupons } = useCouponStore();
    const locale = useLocale();
    const time = useFormattedStartTime(item?.startTime, locale);
    const router = useRouter()
    // Memoize the market lookup
    const market = useMemo(() => {
        return item?.markets?.find(m => m.id === 1 || m.id === 8);
    }, [item?.markets]);

    // Memoize outcomes
    const outcomes = useMemo(() => {
        return market?.outcomes?.flat() || [];
    }, [market]);
    const handleOutcome = (coefficient: number, name: string, Type: number, Param?: number) => {

        addItem({
            GameId: item?.id!,
            Coef: coefficient,
            Kind: item?.status === 'live' ? 1 : 3,
            Type,
            marketId: market?.id,
            team: item?.team,
            marketName: market?.name,
            Param: Param || 0,
            name
        })
    };

    return (
        <CarouselItem className="p-1">
            <div className="w-full flex flex-col rounded-md overflow-hidden min-w-3xs bg-[#213743]">
                <div className="items-center justify-between flex flex-col w-full p-4 border-b border-[#2f4553]">
                    <div className="flex w-full h-5 justify-between items-center">
                        <div className="flex justify-start gap-3">
                            <div className="flex items-center justify-between capitalize">
                                <div className="flex items-center gap-2">
                                    <div className={cn("p-0.5 text-xs rounded",
                                        time === "Live" ? "bg-white/95 text-[#2f4553]" : "bg-[#2f4553] text-[#d5dceb]"
                                    )}>{time === "Live" ? t('status.live') : time}</div>
                                    <span onClick={() => router.push(`${item?.sport.slug}`)} >
                                        <SportIcon id={item?.sport.id || 1} className="w-4 h-4 text-white/95 mr-1 inline-flex cursor-pointer" />
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center flex-row justify-between gap-3">
                                <div className="inline-flex cursor-pointer">
                                    {/* <ChartBarIcon className="w-4 h-4 text-white/95 mr-1" /> */}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center-safe gap-1">
                            {item?.status === 'upcoming' ? <ClockIcon className="w-4 h-4 text-white/95" /> : <TvIcon className="w-4 h-4 text-green-500 animate-pulse" />}

                            <span className="text-sm text-white/95" suppressHydrationWarning>{item?.scoreContext?.stageLiveStatus || t('status.upcoming')}</span>
                        </div>
                    </div>
                    <Team data={item?.team} gameUrl={item?.slug} />
                </div>
                <div className="w-full shrink-0 pt-px mt-4 shadow-md bg-grey-500 flex flex-col gap-2 p-4">
                    <div className="flex justify-start items-center gap-1">
                        <div className="flex">
                            <FlameIcon className="w-4 h-4 text-yellow-500 inline-block shrink-0" />
                            <FlameIcon className="w-4 h-4 text-yellow-500" />
                        </div>
                        <span className="truncate">
                            <span className="text-sm text-white/30">Hot Match</span>
                        </span>
                    </div>
                    {/* outcomes */}

                    <OutcomesCard key={`match-card-wrapper-${item?.id}-${item?.league.id}`} 
                        gameId={item?.id} 
                        marketId={market?.id} 
                        periodName={item?.periodName}
                        outcomes={outcomes} 
                        onOutcomeClick={handleOutcome} />


                </div>
            </div>
        </CarouselItem>
    );
}

type TeamProps = {
    data?: GetSportsResponse[number]['team'];
    gameUrl?: string;
}

function Team({ data, gameUrl }: Readonly<TeamProps>) {
    return (
        <Link href={`${gameUrl}`} className="w-full mt-4">
            <div className="flex justify-between w-full max-w-full">
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center shrink-0 rounded-full w-5 h-5 border">
                        <img className="rounded-full object-contain size-full" alt={data?.home.name || 'Home'} src={`https://v3.traincdn.com/resized/size16/sfiles/logo_teams/${data?.home.logo}`} loading="lazy" />
                    </div>
                </div>
                <div className="flex flex-col max-w-[70%] items-center">
                    <span className="text-neutral-50 truncate max-w-full">{data?.home.name}</span>
                    <span className="text-neutral-50 truncate max-w-full">{data?.away.name}</span>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center shrink-0 rounded-full w-5 h-5 border">
                        <img className="rounded-full object-contain size-full" alt={data?.away.name || 'Away'} src={`https://v3.traincdn.com/resized/size16/sfiles/logo_teams/${data?.away.logo}`} loading="lazy" />
                    </div>
                </div>
            </div>

        </Link>
    )
}

type OutcomesCardProps = {
    outcomes: {
        id: number;
        name: string;
        coefficient: number;
        suspended?: boolean | undefined;
        point?: number | undefined;
        pl?: {
            I: number;
            N: string;
        } | undefined;
    }[];
    gameId?: number | null;
    marketId?: number
    periodName?: string;
    onOutcomeClick: (coefficient: number, name: string, Type: number, Param?: number) => void;
}

function OutcomesCard({ outcomes, gameId, marketId, periodName, onOutcomeClick }: Readonly<OutcomesCardProps>) {
    if (!gameId) return;
    const selectedSet = useCouponStore(s => s.selectedSet);
    // Memoize the grid columns calculation
    const cols = useMemo(() => {
        return Math.min(outcomes.length, 3);
    }, [outcomes.length]);
    return (
        <div
            className={cn(
                "grid gap-2 w-full",
                cols === 2 && "grid-cols-2",
                cols === 3 && "grid-cols-3"
            )}
        >
            {outcomes.map((outcome) => {
                const selectedKey = `${gameId}-${periodName}-${marketId ?? 0}-${outcome.id ?? 0}-${outcome.point ?? 0}`
                const isSelected = selectedSet.has(selectedKey)

                return (
                    <button
                        key={outcome.id}
                        type="button"
                        onClick={() => {
                            onOutcomeClick(
                                outcome.coefficient,
                                outcome.name,
                                outcome.id,
                                outcome.point
                            );
                        }}
                        aria-label={`Bet on ${outcome.name} with odds ${outcome.coefficient}`}
                        className={cn(
                            "cursor-pointer rounded-md flex flex-col items-center justify-center p-2 transition",

                            // default
                            "bg-[#071824] text-white/95 hover:bg-[#082f5a]",

                            // selected ⭐
                            isSelected &&
                            "bg-[#0b3b6f] ring-2 ring-[#4391e7] text-white"
                        )}
                    >
                        <span className="text-sm font-medium">{outcome.name}</span>
                        <span className="text-xs text-[#4391e7] mt-1" suppressHydrationWarning>
                            {outcome.coefficient}
                        </span>
                    </button>
                )
            })}
        </div >
    );
}


function TopMatchCardSkeleton() {
    return (
        <div className="p-1">
            <div className="w-full flex flex-col rounded-md overflow-hidden min-w-3xs bg-[#213743]">
                <div className="items-center justify-between flex flex-col w-full p-4 border-b border-[#2f4553]">
                    <div className="flex w-full h-5 justify-between items-center">
                        <div className="flex justify-start gap-3">
                            <div className="flex items-center justify-between capitalize">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 p-0.5 rounded bg-[#2f4553]" />
                                </div>
                            </div>
                            <div className="flex items-center flex-row justify-between gap-3">
                                <div className="inline-flex cursor-pointer">
                                    <Skeleton className="h-4 w-4 mr-1  bg-[#2f4553]" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center-safe gap-1">
                            <Skeleton className="h-4 w-4 bg-[#2f4553]" />
                            <Skeleton className="h-4 w-8 bg-[#2f4553]" />
                        </div>
                    </div>
                    <TeamSkeleton />
                </div>
                <div className="w-full shrink-0 pt-px mt-4 shadow-md bg-grey-500 flex flex-col gap-2 p-4">
                    <div className="flex justify-start items-center gap-1">
                        <div className="flex gap-1">
                            <Skeleton className="h-4 w-4 bg-[#2f4553] inline-block shrink-0" />
                            <Skeleton className="h-4 w-4 bg-[#2f4553]" />
                        </div>
                        <span className="truncate">
                            <Skeleton className="h-4 w-30 bg-[#2f4553]" />
                        </span>
                    </div>
                    {/* outcomes */}

                    <div className="grid grid-cols-3 gap-2 w-full">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} className="h-15 h-ful bg-[#2f4553] rounded-md flex flex-col items-center justify-center p-2" />

                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
}


function TeamSkeleton() {
    return (
        <Link href={''} className="w-full mt-4">
            <div className="flex justify-between w-full max-w-full">
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center shrink-0 rounded-full w-5 h-5 border">
                        <Skeleton className="rounded-full object-contain size-full bg-[#2f4553]" />
                    </div>
                </div>
                <div className="flex flex-col max-w-[70%] items-center">
                    <Skeleton className="h-4 w-32 bg-[#2f4553]" />
                    <Skeleton className="h-4 w-28 bg-[#2f4553] mt-2" />
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center shrink-0 rounded-full w-5 h-5 border">
                        <Skeleton className="rounded-full object-contain size-full bg-[#2f4553]" />
                    </div>
                </div>
            </div>

        </Link>
    )
}

export function MatchCardWrapperSkeleton() {
    return (
        <div className="max-w-7xl mx-auto mt-3.5 flex w-full items-center justify-between">
            <div className="flex flex-col w-full overflow-x-hidden">
                <div className="flex items-center justify-between">
                    <span className="content-center">
                        <Link
                            href=""
                            className="inline-flex relative items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-none text-[1.25rem] leading-none [&_svg]:text-gray-200 [&:hover>svg]:text-white"
                        >
                            <Skeleton className="w-6 h-6 rounded-full bg-white" />

                            <Skeleton className="w-25 sm:w-35 h-6  bg-white" />
                        </Link>
                    </span>
                    {/* arrows */}
                    <Skeleton className="inline-flex w-24 h-10 rounded-full border border-[#2f4553] bg-[#1a2c38]" />

                </div>

                <div className={cn(
                    "grid grid-flow-col mt-2",
                    " auto-cols-[100%]",
                    "sm:auto-cols-[50%]",
                    " lg:auto-cols-[33.33%]",
                    "-ml-[4.5px] -mr-[4.5px]",
                    "snap-x snap-mandatory scroll-smooth"
                )}>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <TopMatchCardSkeleton key={index} />

                    ))}
                </div>
            </div>
        </div>
    )
}

