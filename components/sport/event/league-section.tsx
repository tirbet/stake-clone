
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { EventMatchCard } from "@/components/sport/event/event-match-card";

import { Link } from "@/i18n/navigation";
import { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import { SportIcon } from "@/components/icon";
export const LeagueSection: React.FC<{
    league: {
        id: number;
        name: string;
        slug: string;
        items: GetSportsResponse;
    }, defaultOpen?: boolean
}> = ({ league, defaultOpen }) => {
    return (
        <Accordion type="single" collapsible className="w-full" defaultValue={defaultOpen ? league.name : undefined}>
            <AccordionItem value={league.name} className="bg-betslip rounded-md">
                <AccordionTrigger className={cn(
                    "[&[data-state=open]>svg]:rotate-180 flex w-full items-center justify-between hover:no-underline",
                    "p-1.5 md:p-2 border-b border-gray-700",
                )}>
                    <div className="flex-1 text-left inline-flex items-center gap-1">

                        <SportIcon id={league.items[0].sport.id} height={14} />
                        <Link
                            href={league.slug}
                            className="text-gray-50 text-sm font-semibold">
                            {league.name}
                        </Link>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="p-0 md:p-0.5 xl:p-1">
                    {league.items.map((event, index) => (
                        <EventMatchCard key={index} event={event} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};