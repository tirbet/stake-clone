
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { EventMatchCard } from "@/components/sport/event/event-match-card";
import type { SportEventItem } from "@/types/sport-type";
import { Link } from "@/i18n/navigation";
import slugify from "slugify";

export const LeagueSection: React.FC<{ league: string; matches: SportEventItem[], defaultOpen?: boolean }> = ({ league, matches, defaultOpen }) => {
    return (
        <Accordion type="single" collapsible className="w-full" defaultValue={defaultOpen ? league : undefined}>
            <AccordionItem value={league} className="bg-betslip rounded-md">
                <AccordionTrigger className={cn(
                    "[&[data-state=open]>svg]:rotate-180 flex w-full items-center justify-between hover:no-underline",
                    "p-1.5 md:p-2 border-b border-gray-700",
                )}>
                    <div className="flex-1 text-left inline-flex items-center gap-2">
                        <Link
                            href={`${matches[0].status === 1 ? "/sport/live" : "/sport/upcoming"
                                }/${slugify(matches[0].sportEn, { lower: true, strict: true })}/${matches[0].leagueId
                                }-${slugify(matches[0].leagueEn, { lower: true, strict: true })}`} 
                            className="text-gray-50 text-sm font-semibold">
                            {league}
                        </Link>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="p-0 md:p-0.5 xl:p-1">
                    {matches.map((event) => (
                        <EventMatchCard key={event.Id} event={event} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};