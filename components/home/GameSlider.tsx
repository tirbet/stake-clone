import { useEffect, useState, KeyboardEvent } from "react";
import { Link } from "@/i18n/navigation";
import { MingcuteBasketballFill } from "@/components/icon";
import { ArrowLeft, ArrowRight, Clock2Icon, Gamepad2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "../ui/carousel";


interface GameItem {
    image: string;
    href: string;
}

type Props = {
    title: string;
    icon: 'continue' | 'games' | 'sports';
    href: string;
    items: GameItem[];
    showNumber: boolean | false;
}

export default function GameSlider({ title, icon, href, items, showNumber }: Props) {
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

    const handleKeyDown = (e: KeyboardEvent<SVGSVGElement>, action: () => void) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            action();
        }
    };

    return (
        <Carousel setApi={setEmblaApi} className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4">
            <div className="flex flex-col w-full overflow-x-hidden">
                <div className="flex items-center justify-between">
                    <span className="content-center">
                        <Link
                            href={href}
                            className="inline-flex relative items-center gap-2 justify-center rounded-md font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-none text-base leading-none [&_svg]:text-gray-200 [&:hover>svg]:text-white"
                        >
                            {icon === 'continue' ?
                                <Clock2Icon className="h-[1.125rem] w-[1.125rem]" />
                                : icon === 'games' ?
                                    <Gamepad2 className="h-[1.125rem] w-[1.125rem]" />
                                    : icon === 'sports' &&
                                    <MingcuteBasketballFill className="h-[1.125rem] w-[1.125rem]" />
                            }

                            {title}
                        </Link>
                    </span>
                    <div className="flex mr-1 gap-0">
                        <ArrowLeft
                            role="button"
                            aria-label="Previous slide"
                            aria-disabled={!canScrollPrev}
                            onClick={() => canScrollPrev && emblaApi?.scrollPrev()}
                            onKeyDown={(e) => canScrollPrev && handleKeyDown(e, () => emblaApi?.scrollPrev())}
                            className={`h-4 w-4 transition-colors cursor-pointer ${canScrollPrev ? "text-gray-400 hover:text-white" : "text-gray-700 cursor-not-allowed"
                                }`}
                        />
                        <ArrowRight
                            role="button"
                            aria-label="Next slide"
                            aria-disabled={!canScrollNext}
                            onClick={() => canScrollNext && emblaApi?.scrollNext()}
                            onKeyDown={(e) => canScrollNext && handleKeyDown(e, () => emblaApi?.scrollNext())}
                            className={`h-4 w-4 transition-colors cursor-pointer ml-2 ${canScrollNext ? "text-gray-400 hover:text-white" : "text-gray-700 cursor-not-allowed"
                                }`}
                        />
                    </div>
                </div>

                <CarouselContent className="-ml-1 mt-2.5 snap-x snap-mandatory">
                    {items.map((item, index) => (
                        <CarouselItem key={index} className="relative basis-1/3 sm:basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 p-1 snap-start">
                            <Link href={item.href} className="relative">
                                <div className="relative [will-change:transform] transition-transform duration-300 ease-linear w-full">
                                    <img className="object-cover w-full h-full rounded-sm" src={item.image} />
                                </div>
                            </Link>
                            {showNumber && (
                                <div className="absolute left-0 top-4 bg-muted text-white px-2 py-1 rounded">
                                    <span className="text-sm font-semibold">{index + 1}</span>
                                </div>
                            )}
                        </CarouselItem>

                    ))}
                </CarouselContent>
            </div>
        </Carousel>
    );
}
