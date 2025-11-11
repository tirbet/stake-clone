'use client';

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { ArrowLeftIcon } from "lucide-react";


type Props = {
    back: string;
    items?: {
        name: string;
        url: string;
    }[];
};

export default function SportBreadcrumb({ back, items }: Props) {

    const isMobile = useIsMobile();
    const router = useRouter();

    // If mobile: show only the last item
    const visibleItems = items ? (isMobile ? items?.slice(-1) : items) : items;

    return (
        <div className="flex mb-2">
            <div className="mr-1 bg-sidebar max-h-11 rounded-sm">
                <Link
                    href={'#'}
                    onClick={(e) => {
                        e.preventDefault();
                        router.back();
                    }}
                    className={cn(
                        "inline-flex relative items-center justify-center font-semibold",
                        "whitespace-nowrap ring-offset-background transition disabled:pointer-events-none",
                        "disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2",
                        "active:scale-[0.98] text-white hover:bg-[rgb(7,29,42)] hover:text-white",
                        "focus-visible:outline-white text-sm leading-none py-3.75 px-5 shadow-none"
                    )}
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                </Link>
            </div>
            {visibleItems && (
                <div className="flex items-center justify-center p-1 max-h-11 rounded-sm bg-sidebar">
                    {visibleItems?.map((item, index) => (
                        <React.Fragment key={index}>
                            <Link
                                href={item.url || ''}
                                className={cn(
                                    "inline-flex relative items-center gap-2 justify-center font-semibold",
                                    "whitespace-nowrap ring-offset-background transition disabled:pointer-events-none",
                                    "disabled:opacity-50  focus-visible:outline-2 focus-visible:outline-offset-2",
                                    "active:scale-[0.98]",
                                    "focus-visible:outline-white text-sm leading-none py-3.5 px-5 shadow-none",
                                    index === (visibleItems?.length ?? 0) - 1
                                        ? "text-white md:text-muted-foreground"
                                        : ""
                                )}
                            >
                                {item.name}
                            </Link>
                            {!isMobile && index < (visibleItems?.length ?? 0) - 1 && (
                                <span className="inline-flex w-0.5 h-[3.2em] m-1 bg-[rgb(26,44,56)] skew-x-[-20deg]"></span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}