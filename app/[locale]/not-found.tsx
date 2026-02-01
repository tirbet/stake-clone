import { Link } from "@/i18n/navigation";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background px-4">
            <section className="text-center space-y-6 max-w-md w-full">
                {/* Code Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    404 Not Found
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Page not found
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    The page you’re looking for doesn’t exist or may have been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                    >
                        Return Home
                    </Link>
                </div>

                <p className="text-[11px] text-muted-foreground">
                    Error code: <span className="font-mono">404</span>
                </p>
            </section>
        </main>
    )
}