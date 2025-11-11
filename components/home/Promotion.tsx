import React from "react";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Props = {
    children: React.ReactNode;
};

export default function Promotion({children}: Props) {
    return (
        <Carousel className="w-full overflow-hidden md:overflow-visible sm:overflow-visible mt-2">
            <CarouselContent className="-ml-1">{children}</CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}