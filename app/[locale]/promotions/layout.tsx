import AppLayout from "@/components/layouts/app-layout";
import Welcome from "@/components/sidebar/welcome";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function PromotionsLayout({ children, params }: Readonly<Props>) {
    const { locale } = await params;
    const categories = [
        { label: "All Promotions", href: `/${locale}/promotions` },
        { label: "Casino", href: `/${locale}/promotions/category/casino` },
        { label: "Sport", href: `/${locale}/promotions/category/sport` },
        { label: "Community", href: `/${locale}/promotions/category/community` },
        { label: "Poker", href: `/${locale}/promotions/category/poker` },
        { label: "Esports", href: `/${locale}/promotions/category/esports` },
    ];

    return (
        <AppLayout sidebarItem={<Welcome />}>
            <div className="w-full pb-16">
                <div className="container mx-auto px-4 pt-8">
                    <h1 className="text-2xl font-semibold text-white mb-6">
                        Promotions
                    </h1>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <Link
                                key={cat.href}
                                href={cat.href}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium",
                                    "bg-[#111C24] text-[#A8C3D8] hover:bg-[#1A2A36] hover:text-white",
                                    "transition-colors"
                                )}
                            >
                                {cat.label}
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Main Content Slot */}
                <div className="container mx-auto px-4 pt-8">
                    {children}
                </div>
            </div>
        </AppLayout>
    )
}