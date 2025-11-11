"use client"
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewUser } from "@/features/user/hooks/use-new-user";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { useGetCurrencies } from "@/features/currency/api/use-get-currencies";

export default function Page() {
    const { onOpen } = useNewUser();
    const { data, isLoading } = useGetCurrencies();
    const isDisabled = isLoading;

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <Card className="w-full bg-sidebar border-none rounded-none drop-shadow-sm mt-2">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between w-full">
                <CardTitle className="text-xl line-clamp-1">Currency</CardTitle>
                <Button size="sm" className="w-full sm:w-auto" onClick={onOpen}>
                    <Plus className="h-4 w-4 mr-2" />
                   <span className="sr-only">Add Currency</span>
                </Button>
            </CardHeader>

            <CardContent className="w-full">
                <DataTable
                    columns={columns}
                    data={data || []}
                    disabled={isDisabled}
                />
            </CardContent>
        </Card>
    );
}
