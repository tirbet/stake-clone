'use client';
import { useMountedState } from "react-use";
import { NewCurrencySheet } from "@/features/currency/components/new-currency-sheet";
import { EditCurrencySheet } from "@/features/currency/components/edit-currency-sheet";


export const SheetProvider = () => {
    const isMounted = useMountedState();
    if (!isMounted) return null;
    return (
        <>
            {/* Currency */}
            <NewCurrencySheet />
            <EditCurrencySheet />
        </>
    );
}