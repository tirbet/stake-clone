"use client"
import { cn } from "@/lib/utils";
import { AccordionItem, AccordionTrigger, AccordionContent, Accordion } from "@/components/ui/accordion";
import { LeagueSection } from "@/components/sport/event/league-section";
import { GetSportsResponse } from "@/features/sport/api/use-get-sport";
import FlagIcon from "@/components/icons/flag";

export const CountrySection = ({ data }: {
    data: {
        country: {
            id: number;
            name: string;
        };
        leagues: {
            id: number;
            name: string;
            slug: string;
            items: GetSportsResponse
        }[]
    }[]
}) => {

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={data[0].country.name}
        >
            {data.map(item => (

                <AccordionItem key={item.country.id} value={item.country.name} className="bg-[rgb(7,29,42)] rounded-sm mb-1 md:mb-2">
                    <AccordionTrigger className={cn(
                        "[&[data-state=open]>svg]:rotate-180 flex w-full",
                        "items-center justify-between hover:no-underline",
                        "p-1.5 md:p-3",
                    )}>
                        <div className="flex-1 text-left inline-flex items-center gap-1">
                            <FlagIcon countryCode={item.country.id}/>                            
                            <span className="text-gray-200 text-sm font-semibold">
                                {item.country.name}
                            </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-[rgb(26,44,56)] p-2 border-l border-r border-gray-700 rounded-b-sm">
                        {item.leagues.map((league) => (
                            <LeagueSection
                                key={league.id}
                                league={league}
                                defaultOpen={true}
                            />
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};