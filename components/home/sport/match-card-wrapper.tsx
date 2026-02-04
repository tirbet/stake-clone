"use client";
import { KeyboardEvent, useEffect, useState } from "react";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeftIcon, ArrowRightIcon, ChartBarIcon, CircleDollarSign, ClockIcon, FlameIcon, TvIcon, UserPlusIcon } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormattedStartTime } from "@/hooks/use-formatted-start-time";
import { SportIcon } from "@/components/icon";
import { useLocale, useTranslations } from "next-intl";

type Props = {
    title: string;
    content?: React.ReactNode;
};

export const MatchCardWrapper = ({ title, content }: Readonly<Props>) => {
    const [emblaApi, setEmblaApi] = useState<CarouselApi | undefined>(undefined);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCanScrollPrev(emblaApi.canScrollPrev());
            setCanScrollNext(emblaApi.canScrollNext());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            action();
        }
    };
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
                    <h2 className="text-lg font-semibold">{title}</h2>
                </div>
                {/* arrows */}
                <div className="inline-flex gap-1.5 items-center rounded-full border border-[#2f4553] bg-[#1a2c38] backdrop-blur">
                    {/* left */}
                    <button
                        className={cn("flex items-center justify-center w-10 h-10 rounded-l-full transition", {
                            "cursor-pointer  hover:bg-white/5": canScrollPrev,
                            "cursor-auto": !canScrollPrev,
                        })}
                        aria-label="Previous"
                        aria-disabled={!canScrollPrev}
                        onClick={() => canScrollPrev && emblaApi?.scrollPrev()}
                        onKeyDown={(e) => canScrollPrev && handleKeyDown(e, () => emblaApi?.scrollPrev())}
                    >
                        <ArrowLeftIcon className={cn("h-4 w-4", {
                            "text-white/70": canScrollPrev,
                            "text-white/30": !canScrollPrev,
                        })} />
                    </button>

                    {/* divider */}
                    <div className="h-6 w-px bg-white/10" />

                    {/* right */}
                    <button
                        className={cn("flex items-center justify-center w-10 h-10 rounded-r-full transition", {
                            "cursor-pointer hover:bg-white/5": canScrollNext,
                            "cursor-auto": !canScrollNext,
                        })}
                        aria-label="Next"
                        aria-disabled={!canScrollNext}
                        onClick={() => canScrollNext && emblaApi?.scrollNext()}
                        onKeyDown={(e) => canScrollNext && handleKeyDown(e, () => emblaApi?.scrollNext())}
                    >
                        <ArrowRightIcon className={cn("h-4 w-4", {
                            "text-white/70": canScrollNext,
                            "text-white/30": !canScrollNext,
                        })} />
                    </button>
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
                {content}
            </CarouselContent>
        </Carousel>
    );
};

type TopMatchCardProps = {
    item?: GetSportsResponse[number];
}

export default function TopMatchCard({ item }: Readonly<TopMatchCardProps>) {
    const t = useTranslations();
    const locale = useLocale();
    const time = useFormattedStartTime(item?.startTime, locale);
    const router = useRouter()
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

                            <span className="text-sm text-white/95">{item?.scoreContext?.stageLiveStatus || t('status.upcoming')}</span>
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

                    <OutcomesCard key={`match-card-wrapper-${item?.id}-${item?.league.id}`} markets={item?.markets} />


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
    markets: GetSportsResponse[number]['markets'];
}

function OutcomesCard({ markets }: Readonly<OutcomesCardProps>) {
    const market = markets?.find(
        (m) => m.id === 1 || m.id === 8
    );

    if (!market) return null;

    const outcomes = market.outcomes.flat();
    const cols = Math.min(outcomes.length, 3);

    return (
        <div
            className={cn(
                "grid gap-2 w-full",
                cols === 2 && "grid-cols-2",
                cols === 3 && "grid-cols-3"
            )}
        >
            {outcomes.map((outcome) => (
                <button
                    key={outcome.id}
                    type="button"
                    className="bg-[#071824] cursor-pointer text-white/95 rounded-md flex flex-col items-center justify-center p-2 hover:bg-[#082f5a] transition"
                >
                    <span className="text-sm font-medium">{outcome.name}</span>
                    <span className="text-xs text-[#4391e7] mt-1">
                        {outcome.coefficient}
                    </span>
                </button>
            ))}
        </div>
    );
}


export function TopMatchCardSkeleton() {
    return (
        <CarouselItem className="p-1">
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
        </CarouselItem>
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

