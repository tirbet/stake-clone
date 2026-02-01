import Link from "next/link";

export default function Forbidden() {

    return (
        <main className="min-h-screen flex items-center justify-center bg-background px-4">
            <section className="w-full max-w-md text-center space-y-6">
                {/* Icon / Badge */}
                <div className="inline-flex items-center justify-center rounded-full border border-border px-4 py-1 text-xs font-medium tracking-wide uppercase">
                    <span className="mr-2 h-2 w-2 rounded-full bg-red-500" />
                    Access Denied
                </div>

                {/* Code + Title */}
                <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">403 Forbidden</p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                        You don&apos;t have permission to view this page
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        If you think this is a mistake, try signing in with a different account
                        or contact support so we can help you get access.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition"
                    >
                        Go to Home
                    </Link>                   
                </div>

                {/* Small hint */}
                <p className="text-[11px] text-muted-foreground">
                    Error code: <span className="font-mono">403</span>
                </p>
            </section>
        </main>
    )
}