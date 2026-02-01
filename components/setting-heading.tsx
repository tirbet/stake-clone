"use client";

import { CheckSquareIcon, ReceiptTextIcon, SettingsIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SettingHeading({ data }: { data: {title: string; icon: string, description?: string }}) {
    const t = useTranslations();
    return (
        <div className="mb-8 space-y-2">
            <h2 className="text-xl font-semibold tracking-tight flex items-center">
                {data.icon === 'settings' && (
                    <SettingsIcon className="mr-2 h-5 w-5" />
                )}
                {data.icon === 'transactions' && (
                    <ReceiptTextIcon className="mr-2 h-5 w-5" />
                )}
                {data.icon === 'my_bets' && (
                    <CheckSquareIcon className="mr-2 h-5 w-5" />
                )}
                <span className='first-letter:uppercase'>{t(`${data.title}`)}</span>
            </h2>
            {data.description && (
                <p className="text-muted-foreground text-sm">
                    {data.description}
                </p>
            )}
        </div>
    );
}