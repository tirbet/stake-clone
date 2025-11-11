import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import React from "react";

type Props = {
  badgeText: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonHref: string;
};

const PromotionItem = React.memo(function PromotionItem({
  badgeText,
  title,
  description,
  imageUrl,
  buttonText,
  buttonHref,
}: Props) {
  return (
    <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
      <Card
        className={cn(
          "snap-start p-0 m-0 overflow-hidden",
          "[container-type:inline-size] [container-name:card-size]",
          "flex flex-col relative text-white bg-[#213743]",
        )}
      >
        <CardContent className="p-0.5 m-0">
          <Link href={buttonHref} className="block h-full mb-1.5"  aria-label={`Action: ${buttonText} for ${title}`}>
            <div className="grid grid-cols-[45%_55%] relative h-48 overflow-hidden scale-[1]">
              <div className="flex flex-col p-3 z-[1]">
                <div className="flex flex-col h-full gap-y-0.5">
                  <div className="mb-1.5">
                    <Badge variant="white">{badgeText}</Badge>
                  </div>
                  <span className="font-bold leading-[1.2] text-left py-1.5 text-base inline-flex items-center space-x-2 text-white rounded">
                    {title}
                  </span>
                  <div className="text-sm">
                    <span className="font-normal leading-[1.2] inline-flex">
                      {description}
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute flex items-center justify-end h-full w-full">
                  <img
                    className="object-cover w-full h-full md:p-3 max-w-[220px] max-h-[220px] aspect-square"
                    src={imageUrl}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </Link>

          <div className="absolute mt-auto w-fit bg-[#213743] bottom-[12px] left-[12px] md:bottom-[16px] md:left-[16px]">
            <Link
              href={buttonHref}
              className={cn(
                "inline-flex relative items-center gap-2 justify-center",
                "rounded-md",
                "font-semibold whitespace-nowrap",
                "ring-offset-background",
                "transition",
                "disabled:pointer-events-none disabled:opacity-50",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                "active:scale-[0.98]",
                "bg-transparent text-white",
                "hover:bg-gray-400 hover:text-white",
                "border border-solid border-white",
                "text-sm leading-none",
                "py-[0.8125rem] px-[1rem]"
              )}
            >
              {buttonText}
            </Link>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
});

export default PromotionItem;
