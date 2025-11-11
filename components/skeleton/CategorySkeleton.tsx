import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function CategorySkeleton() {
    return (
        <ScrollArea className="w-full">
            <div className="flex mt-3 mb-2 p-1.25 items-center bg-sidebar rounded-md">
                <div className="flex gap-2 px-2 py-1 w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="px-4 py-1.5 rounded-full transition-all whitespace-nowrap animate-pulse"
                        >
                            <div className="h-5 w-20 bg-[rgb(47,69,83)] rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}