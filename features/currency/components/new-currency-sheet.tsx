'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNewCurrency } from "@/features/currency/hooks/use-new-currency"
import { CurrencyForm } from "@/features/currency/components/currency-form";
import { useCreateCurrency } from "@/features/currency/api/use-create-currency";
import { CurrencySchema } from "@/schemas/currency.schema";

export const NewCurrencySheet = () => {
    const { isOpen, onClose } = useNewCurrency();

    const mutation = useCreateCurrency();

    const onSubmit = (values: CurrencySchema) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Currency</SheetTitle>
                    <SheetDescription>
                        Create new currency.
                    </SheetDescription>
                </SheetHeader>
                <CurrencyForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{ 
                        name: "",
                        code: "",
                        symbol: "",
                        decimals: 2,
                        useRate: 1,
                        isActive: false,
                     }}
                />
            </SheetContent>
        </Sheet>
    )
}