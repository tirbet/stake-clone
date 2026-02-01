'use client';
import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Loader2Icon } from "lucide-react";

import { useOpenCurrency } from "@/features/currency/hooks/use-open-currency";
import { useEditCurrency } from "@/features/currency/api/use-edit-currency";
import { useDeleteCurrency } from "@/features/currency/api/use-delete-currency";
import { useGetCurrency } from "@/features/currency/api/use-get-currency";

import { CurrencyForm } from "@/features/currency/components/currency-form";
import { UpdateCurrencyIdSchema } from "@/schemas/currency.schema";
import { useConfirm } from "@/hooks/use-confirm";

export const EditCurrencySheet = () => {
    const { isOpen, onClose, id } = useOpenCurrency();

    const [ConfirmaDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this currency"
    )
    const { data, isLoading } = useGetCurrency(id);
    const defaultValues = data ? {
        name: data.name,
        code: data.code,
        symbol: data.symbol || "",
        useRate: +data.useRate,
        decimals: data.decimals,
        isActive: data.isActive,
    } : {
        name: "",
        code: "",
        symbol: "",
        useRate: 1,
        decimals: 0,
        isActive: true,
    }
    const eddiMutation = useEditCurrency(id);
    const deleteMutation = useDeleteCurrency(id!);
    const onDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    }
    const onSubmit = (values: UpdateCurrencyIdSchema) => {
        eddiMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };
    const deleting = deleteMutation.isPending;
    const updateing= eddiMutation.isPending;
    return (
        <React.Fragment>
            <ConfirmaDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Currency</SheetTitle>
                        <SheetDescription>
                            Edit existing currency
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
                        </div>) : (
                        <CurrencyForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isLoading || eddiMutation.isPending}
                            defaultValues={defaultValues}
                            onDelete={onDelete}
                            deleting={deleting}
                            updating={updateing}
                        />)
                    }
                </SheetContent>
            </Sheet>
        </React.Fragment>
    )
}