import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GameGroup } from "@/types/sport-type";
import { useGameGroupStore } from "@/store/game-group-store";

export function GameGroupTab({ groups }: { groups?: GameGroup[] }) {
    const { data, setSelectedGroup } = useGameGroupStore();

    return (
        <ScrollArea className="flex w-full mt-0 mb-2 p-1.25 items-center rounded-md bg-sidebar">
            <div className="flex gap-2 px-2 py-1 w-full max-w-5xl">
                {groups?.map((group) => (
                    <button
                        key={group.id}
                        onClick={() => setSelectedGroup(group)}
                        className={cn(
                            "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap",
                            "border border-transparent",
                            group.id === data?.id
                                ? "bg-[rgb(47,69,83)] text-white shadow-sm"
                                : "text-white hover:text-white hover:border-[rbg(61,85,100)]"
                        )}
                    >
                        {group.name}
                    </button>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}