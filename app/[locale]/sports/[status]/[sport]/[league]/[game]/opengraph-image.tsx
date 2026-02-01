import { getGame } from "@/lib/sport/fetch-sport";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* ---------------- Helpers ---------------- */

const getStatusColor = (status?: string) => {
    if (!status) return "#64748b";
    const s = status.toLowerCase();
    if (s.includes("live")) return "#10B981";
    if (s.includes("upcoming") || s.includes("scheduled")) return "#3B82F6";
    if (s.includes("finished")) return "#8B5CF6";
    return "#64748b";
};
const getStatusGradient = (status?: string) => {
    if (!status) return "linear-gradient(135deg, #64748b, #475569)";
    const s = status.toLowerCase();
    if (s.includes("live")) return "linear-gradient(135deg, #10B981, #059669)";
    if (s.includes("upcoming") || s.includes("scheduled")) return "linear-gradient(135deg, #3B82F6, #2563EB)";
    if (s.includes("finished")) return "linear-gradient(135deg, #8B5CF6, #7C3AED)";
    return "linear-gradient(135deg, #64748b, #475569)";
};

const formatTimeOnly = (ts?: number) =>
    ts
        ? new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).format(new Date(ts * 1000))
        : "";

const formatDateOnly = (ts?: number) =>
    ts
        ? new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(ts * 1000))
        : "";

const getOutcomeDisplayName = (name: string, home: string, away: string) => {
    if (name === "W1") return home;
    if (name === "W2") return away;
    if (name === "X") return "DRAW";
    return name;
};

const getEmoji = (id?: number) => {
    if (id === 1) return "⚽";
    if (id === 2) return "🏒";
    if (id === 3) return "🏀";
    if (id === 4) return "🎾";
    if (id === 6) return "🏐";
    if (id === 8) return "🤾‍♂";
    if (id === 13) return "🏈";
    if (id === 16) return "🏸";
    if (id === 29) return "🏖";
    if (id === 66) return "🏏";
    if (id === 287) return "🔮";
    return "🏆";
}

const getOutcomeColor = (name: string) => {
    if (name === "W1") return "#38BDF8";
    if (name === "X") return "#8B5CF6";
    if (name === "W2") return "#EF4444";
    return "#38BDF8";
};

/* ---------------- Component ---------------- */

export default async function Image({
    params,
}: {
    params: Promise<{ status: string; sport: string; league: string; game: string }>;
}) {
    const { data } = await getGame(params);
    const game = data?.data;

    const appName = process.env.APP_NAME || "SportsHub";
    const sportId = game?.sport.id;
    const home = game?.team?.home?.name || "Home Team";
    const away = game?.team?.away?.name || "Away Team";
    const league = game?.league?.name || "League";
    const sport = game?.sport?.name || "Sport";
    const country = game?.country?.name;

    const status = game?.status || "Upcoming";
    const startTime = game?.startTime;

    const stage = game?.matchInfo?.stage;
    const location = game?.matchInfo?.location;

    const market = game?.markets?.[0];

    const isLive = status.toLowerCase().includes("live");
    const isUpcoming = status.toLowerCase().includes("upcoming");
    const isFinished = status.toLowerCase().includes("finished");

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    position: "relative",
                    fontFamily:
                        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    background:
                        "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c4a6e 100%)",
                    overflow: "hidden",
                }}
            >
                {/* Soft highlight */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: `
                            radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
                        `,
                    }}
                />
                {/* Grid Pattern */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `
                            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                        backgroundPosition: "center center",
                    }}
                />

                {/* Main container */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        padding: "48px",
                        gap: "48px",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* LEFT PANEL - Sport & League Info */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "24%",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    marginBottom: "28px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "32px",
                                        lineHeight: 1,
                                    }}
                                >
                                    {getEmoji(sportId)}
                                </div>
                                <div
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: 600,
                                        color: "#cbd5e1",
                                        textTransform: "uppercase",
                                        letterSpacing: "1.5px",
                                    }}
                                >
                                    {sport}
                                </div>
                            </div>

                            <div
                                style={{
                                    fontSize: "42px",
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    background:
                                        "linear-gradient(90deg, #f8fafc, #e2e8f0)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    marginBottom: "12px",
                                }}
                            >
                                {league}
                            </div>

                            {country && (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        fontSize: "16px",
                                        color: "#94a3b8",
                                        padding: "8px 16px",
                                        background: "rgba(30, 41, 59, 0.4)",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            background: "#38BDF8",
                                        }}
                                    />
                                    {country}
                                </div>
                            )}
                        </div>
                        {/* STAGE & INFO */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            {stage && (
                                <div
                                    style={{
                                        padding: "12px 20px",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        color: "#38BDF8",
                                        background: "rgba(56, 189, 248, 0.12)",
                                        border: "1px solid rgba(56, 189, 248, 0.2)",
                                        borderRadius: "12px",
                                        backdropFilter: "blur(10px)",
                                    }}
                                >
                                    {stage}
                                </div>
                            )}
                            {/* App Name */}
                            <div
                                style={{
                                    fontSize: "14px",
                                    color: "rgba(255, 255, 255, 0.4)",
                                    letterSpacing: "3px",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    paddingTop: "20px",
                                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                {appName}
                            </div>
                        </div>
                    </div>

                    {/* CENTER PANEL - Match Details */}
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "40px",
                        }}
                    >
                        {/* STATUS BADGE */}
                        <div
                            style={{
                                position: "relative",
                                padding: "16px 48px",
                                borderRadius: "20px",
                                background: getStatusGradient(status),
                                color: "#fff",
                                fontSize: "24px",
                                fontWeight: 800,
                                letterSpacing: "2px",
                                boxShadow: isLive
                                    ? `0 0 40px ${getStatusColor(status)}80`
                                    : "0 8px 32px rgba(0, 0, 0, 0.3)",
                                border: "2px solid rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            {status.toUpperCase()}

                        </div>

                        {/* TIME DISPLAY */}
                        {isUpcoming && startTime && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "32px",
                                    padding: "24px 48px",
                                    borderRadius: "20px",
                                    background: "rgba(15, 23, 42, 0.7)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "42px",
                                            fontWeight: 900,
                                            color: "#f8fafc",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        {formatTimeOnly(startTime)}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "18px",
                                            color: "#94a3b8",
                                            marginTop: "4px",
                                        }}
                                    >
                                        {formatDateOnly(startTime)}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: "1px",
                                        height: "60px",
                                        background: "rgba(255, 255, 255, 0.1)",
                                    }}
                                />
                                <div
                                    style={{
                                        fontSize: "16px",
                                        color: "#cbd5e1",
                                        fontWeight: 600,
                                        textAlign: "center",
                                        maxWidth: "300px",
                                    }}
                                >
                                    Upcoming Match • Get Ready
                                </div>
                            </div>
                        )}

                        {/* TEAMS DISPLAY */}
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "48px",
                            }}
                        >
                            {/* Home Team */}
                            <div
                                style={{
                                    display: "flex",
                                    flex: 1,
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        color: "#f8fafc",
                                        textAlign: "center",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        padding: "8px",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(56, 189, 248, 0.2)",
                                        width: "100%",
                                        backdropFilter: "blur(10px)",

                                    }}
                                >
                                    {home}
                                </div>
                            </div>
                            {/* VS Separator */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "20px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: 400,
                                        color: "#94a3b8",
                                        padding: "6px 12px",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        borderRadius: "8px",
                                        letterSpacing: "1px",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                    }}
                                >
                                    VS
                                </div>
                                {isUpcoming && (
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            color: "#64748b",
                                            fontWeight: 400,
                                        }}
                                    >
                                        starts soon
                                    </div>
                                )}
                            </div>
                            {/* Away Team */}
                            <div
                                style={{
                                    display: "flex",
                                    flex: 1,
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        color: "#f8fafc",
                                        textAlign: "center",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        padding: "8px",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(56, 189, 248, 0.2)",
                                        width: "100%",
                                        backdropFilter: "blur(10px)",

                                    }}
                                >
                                    {away}
                                </div>
                            </div>
                        </div>

                        {/* LOCATION */}
                        {location && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "16px 32px",
                                    fontSize: "18px",
                                    color: "#cbd5e1",
                                    background: "rgba(30, 41, 59, 0.6)",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: 22,
                                        marginRight: 8,
                                    }}
                                >
                                    🏟
                                </div>
                                {location}
                            </div>
                        )}
                    </div>

                    {/* RIGHT PANEL - Odds */}
                    {!isFinished && market && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "24%",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <div
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        color: "#f8fafc",
                                        marginBottom: "24px",
                                        paddingBottom: "12px",
                                        borderBottom: "2px solid rgba(56, 189, 248, 0.3)",
                                    }}
                                >
                                    {market.name}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px",
                                    }}
                                >
                                    {market.outcomes.map((item, i) => {
                                        const o = item[0];
                                        const isHome = o.name === "W1";
                                        const isAway = o.name === "W2";
                                        const isDraw = o.name === "X";
                                        return (
                                            <div
                                                key={i}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    padding: "24px",
                                                    borderRadius: "16px",
                                                    background: isDraw
                                                        ? "rgba(139, 92, 246, 0.1)"
                                                        : isHome
                                                            ? "rgba(56, 189, 248, 0.1)"
                                                            : "rgba(239, 68, 68, 0.1)",
                                                    border: `2px solid ${isDraw
                                                        ? "rgba(139, 92, 246, 0.3)"
                                                        : isHome
                                                            ? "rgba(56, 189, 248, 0.3)"
                                                            : "rgba(239, 68, 68, 0.3)"
                                                        }`,
                                                    backdropFilter: "blur(10px)",
                                                    transition: "all 0.2s",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "4px",
                                                        width: "70%",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontSize: "16px",
                                                            color: "#f8fafc",
                                                            fontWeight: 600,
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}
                                                    >
                                                        {getOutcomeDisplayName(o.name, home, away)}
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: 900,
                                                        color: getOutcomeColor(o.name),
                                                        textShadow: `0 2px 10px ${getOutcomeColor(o.name)}40`,
                                                    }}
                                                >
                                                    {o.coefficient?.toFixed(2)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* INFO NOTE */}
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "rgba(255, 255, 255, 0.4)",
                                    textAlign: "right",
                                    paddingTop: "20px",
                                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                Odds subject to change
                            </div>
                        </div>
                    )}
                </div>

                {/* Decorative Elements */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "linear-gradient(90deg, #38BDF8, #8B5CF6, #10B981)",
                    }}
                />
            </div>
        ),
        {
            ...size,
            emoji: 'blobmoji'
        }
    );
}
