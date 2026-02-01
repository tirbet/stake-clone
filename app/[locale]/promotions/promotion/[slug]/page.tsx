import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
    params: Promise<{ slug: string, locale: string }>;
};

export default async function PromotionDetailsPage({
    params
}: Readonly<Props>) {
    const { slug, locale } = await params;

    // Example data (replace with real fetch)
    const promotion = {
        image: "/promotions/promo-sample.jpg",
        title: "Premier League - 2 Goal Lead Payout",
        description: `
      The Premier League is back, promising another season packed with goals and fiercely contested battles.
      Liverpool kick off as favourites to defend their title, but Arsenal and Manchester City will be close behind.
      ...
    `,
        startDate: "August 11, 2025",
        endDate: "May 31, 2026",
        terms: [
            "Pre-match, single bets in the 1x2 market for all Premier League matches",
            "Only the first bet per match, per customer, per household qualifies",
            "Bets must be placed before the scheduled time indicated on Stake.com",
            "Minimum Stake: $5 USD",
            "Maximum Payout: $100 USD",
        ],
    };

    return (
        <div className="space-y-8">
            {/* Back Button + Navigation */}
            <div className="flex items-center gap-2">
                <Link
                    href={`/${locale}/promotions`}
                    className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Link>

                <span className="text-sm font-medium text-neutral-300">
                    {promotion.title}
                </span>
            </div>

            {/* Banner */}
            <div className="w-full rounded-xl overflow-hidden bg-neutral-800 relative max-w-2xl mx-auto">
                <Image
                    src={promotion.image}
                    alt={promotion.title}
                    width={800}
                    height={400}
                    className="object-cover"
                />
            </div>

            {/* Dates */}
            <p className="text-xs text-neutral-400">
                {promotion.startDate} - {promotion.endDate}
            </p>

            {/* Title */}
            <h1 className="text-2xl font-bold text-white">
                {promotion.title}
            </h1>

            {/* Description */}
            <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
                {promotion.description}
            </p>

            {/* Terms & Conditions */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-white">Terms & Conditions</h2>
                <ul className="list-disc pl-5 text-neutral-300 text-sm space-y-1">
                    {promotion.terms.map((term, i) => (
                        <li key={i}>{term}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
