"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Spinner } from "@/components/ui/spinner";
import { useGetConfig } from "@/features/config/api/use-get-config"
import { cn } from "@/lib/utils";
import { KycForm } from "./kyc-form";
import { VerificationStatus } from "@/prisma/generated/prisma/enums";
import { KycSchema } from "@/schemas/kyc.schema";

type Props = {
    initialKyc: Partial<KycSchema> | null;
    status: VerificationStatus | null;
};

export default function VerificationCard({ initialKyc, status }: Props) {
    const { data, isLoading } = useGetConfig();
    if (isLoading) {
        return (
            <div className="flex w-full items-center justify-center py-6">
                <Spinner />
            </div>
        );
    }

    const items = Array.isArray(data?.kyc) ? data.kyc.flat() : [];
    console.log(items)
    const formatLevel = (index: number) => `Level ${index}`;
    if (!items.length) {
        return (
            <div className="space-y-2 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-5 text-center">
                <p className="text-sm font-medium text-slate-100">
                    No KYC configurations available
                </p>
                <p className="text-xs text-slate-400">
                    Please contact an administrator to configure KYC levels.
                </p>
            </div>
        );
    }
    return (
        <div className="space-y-6 p-2 rounded-2xl">
            <Accordion type="single" collapsible className="w-full">
                {items.map((item) => (
                    <AccordionItem key={item.label} value={`kyc-label-${item.label}`}>
                        <AccordionTrigger
                            className={cn(
                                "text-base font-medium no-underline hover:no-underline focus:no-underline"
                            )}
                        >
                            <div className='flex items-center space-x-2'>
                                <span className="text-lg font-semibold">
                                    {formatLevel(item.label)}
                                </span>
                                {/* {level.status && (
                                    <Badge variant={level.status} className='capitalize'>
                                        {level.status}
                                    </Badge>
                                )} */}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {item.isActive && item.label === 1 && (
                                <KycForm
                                    fields={['firstName', 'lastName', 'birthDate', 'country']}
                                    label={item.label}
                                />
                            )}
                            {item.isActive && item.label === 2 && (
                                <KycForm
                                    fields={['idType', 'idNumber', 'idFrontPath', 'idBackPath']}
                                    label={item.label}
                                />
                            )}
                            {item.isActive && item.label === 3 && (
                                <KycForm
                                    fields={['paymentMethod', 'paymentProofPath', 'bankStatementPath', 'selfieWithIdPath']}
                                    label={item.label}
                                />
                            )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}