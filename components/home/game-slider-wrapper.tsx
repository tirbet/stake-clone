"use client";
import { useEffect, useState, KeyboardEvent } from "react";
import { Link } from "@/i18n/navigation";
import { MingcuteBasketballFill, SportIcon } from "@/components/icon";
import { ArrowLeftIcon, ArrowRightIcon, Clock2Icon, Gamepad2Icon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "../ui/carousel";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";


type Props = {
    headder: {
        title: string;
        icon: 'continue' | 'trending_game' | 'trending_sport';
        href: string;
    },
    content?: React.ReactNode;

}

export const GameSliderWrapper = ({ headder, content }: Readonly<Props>) => {
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
            className="max-w-7xl mx-auto mt-3.5 flex w-full items-center justify-between"
        >

            <div className="flex flex-col w-full overflow-x-hidden">
                <div className="flex items-center justify-between">
                    <span className="content-center">
                        <Link
                            href={headder.href}
                            className="inline-flex relative items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-none text-[1.25rem] leading-none [&_svg]:text-gray-200 [&:hover>svg]:text-white"
                        >
                            {headder.icon === 'continue' ?
                                <Clock2Icon className="h-5 w-5" />
                                : headder.icon === 'trending_sport' ?
                                    <SportIcon id={4} className="h-5 w-5" />
                                    : headder.icon === 'trending_game' &&
                                    <MingcuteBasketballFill className="h-5 w-5" />
                            }

                            {headder.title}
                        </Link>
                    </span>
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

                <CarouselContent className="-ml-2 mt-3  flex snap-x snap-mandatory">
                    {content}
                </CarouselContent>
            </div>
        </Carousel>
    );
}



type SliderItemProps = {
    href: string;
    image: string;
    title?: string;
    players?: number;
    count?: number;

}

export const SliderItem = ({ href, image, title, count, players }: Readonly<SliderItemProps>) => {
    return (
        <CarouselItem
            className={cn("basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8 shrink-0")}
        >
            <Link href={href} className="relative block w-full">

                {/* IMAGE */}
                <div className="relative aspect-134/182 overflow-hidden rounded-lg">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {count && (
                    <div className="absolute left-0 top-4  bg-[#2f4553] text-white px-2 py-1 rounded-r-md">
                        <span className="text-sm font-semibold" suppressHydrationWarning>{count}</span>
                    </div>
                )}

                {/* META */}
                {title || players ? (
                    <div className="mt-2">
                        {title && (
                            <p className="text-sm font-semibold text-white truncate">
                                {title}
                            </p>
                        )}
                        {players && (
                            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                {players} playing
                            </div>
                        )}
                    </div>
                ) : null}

            </Link>
        </CarouselItem>
    );
}

export const GameSliderWrapperSkeleton = ({ badge }: { badge: boolean }) => {
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

                <div className="-ml-2 mt-3  flex snap-x snap-mandatory">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <SliderItemSkeleton key={index} badge={badge} />

                    ))}
                </div>
            </div>
        </div>
    )
}

export const SliderItemSkeleton = ({ badge }: { badge: boolean }) => {
    return (
        <div className="basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8 shrink-0 px-2">
            <div className="relative block w-full pointer-events-none animate-pulse">
                {/* IMAGE */}
                <div className="relative aspect-134/182 overflow-hidden rounded-lg bg-white/10" />

                {/* COUNT BADGE */}
                {badge && (
                    <div className="absolute left-0 top-4 bg-white/20 px-2 py-1 rounded">
                        <div className="h-4 w-6 bg-white/30 rounded" />
                    </div>
                )}
            </div>
        </div>
    );
};
