"use client";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useSportStatus } from "@/store/sport-status";


export function SportStatusSwitcher({ open }: { open: boolean }) {
        const {status, setStatus} = useSportStatus();
    return (
        <div
            className={cn(
                "flex items-center justify-around gap-2 rounded-xl bg-muted p-1 shadow-sm",
                open ? "flex" : "hidden"
            )}
        >
            <Link
                href={'#'}
                onClick={() => setStatus('live')}
                className={cn(
                    "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition",
                    status === "live"
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:bg-muted/60"
                )}
            >
                Live
            </Link>

            <Link
                href={"#"}
                onClick={() => setStatus('upcoming')}
                className={cn(
                    "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition",
                    status === "upcoming"
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:bg-muted/60"
                )}
            >
                Pre
            </Link>
        </div>
    );
}