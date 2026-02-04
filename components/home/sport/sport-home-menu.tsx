"use client";
import { SportIcon } from "@/components/icon";
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { ClockIcon, LucideTv } from "lucide-react";
const pillBase = "inline-flex relative items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ring-offset-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]";

export const SportHomeMenu = () => {
    const pathname = usePathname();
    return (
        <div className="mt-6 flex overflow-x-auto overflow-y-hidden transform-gpu thin-scrollbar">
            <div className="flex bg-sidebar rounded-[3rem] p-1.5 shrink-0">
                <div className="flex gap-1">
                    <Link href="/sports" className={cn(
                        pillBase,
                        pathname === "/sports" ? "bg-[#213743] text-white" : "text-gray-300 hover:bg-gray-700"
                    )}>
                        {/* logo */}
                        <SportIcon id={4} className="w-4 h-4" />
                        Lobby
                    </Link>
                    <Link href="/sports/live" className={cn(
                        pillBase,
                        pathname === "/sports/live" ? "bg-[#213743] text-white" : "text-gray-300 hover:bg-gray-700"
                    )}>
                        <LucideTv className="w-4 h-4" />
                        Live
                    </Link>
                    <Link href="/sports/upcoming" className={cn(
                        pillBase,
                        pathname === "/sports/upcoming" ? "bg-[#213743] text-white" : "text-gray-300 hover:bg-gray-700"
                    )}>
                        <ClockIcon className="w-4 h-4" />
                        Upcoming
                    </Link>
                </div>
            </div>
        </div>
    )
}