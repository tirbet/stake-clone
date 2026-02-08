import { CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";

export const useCarouselNavigation = (emblaApi: CarouselApi | undefined) => {
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

    return { canScrollPrev, canScrollNext };
};
