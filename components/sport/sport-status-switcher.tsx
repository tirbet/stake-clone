import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";


export function SportStatusSwitcher({ open, type }: { open: boolean, type: 'live' | 'upcoming' }) {

    return (
        <div
            className={cn(
                "flex items-center justify-around gap-2 rounded-xl bg-muted p-1 shadow-sm",
                open ? "flex" : "hidden"
            )}
        >
            <Link
                href={'/sport/live'}
                className={cn(
                    "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition",
                    type === "live"
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:bg-muted/60"
                )}
            >
                Live
            </Link>

            <Link
                href={"/sport/upcoming"}
                className={cn(
                    "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition",
                    type === "upcoming"
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:bg-muted/60"
                )}
            >
                Pre
            </Link>
        </div>
    );
}