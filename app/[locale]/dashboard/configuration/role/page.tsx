"use client"

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetRoles } from "@/features/role/api/use-get-roles";
import { useNewRole } from "@/features/role/hooks/use-new-role";
import { Plus } from "lucide-react";
import { columns } from "./columns";
export default function Page() {
  const { onOpen } = useNewRole();
  const { data, isLoading } = useGetRoles();
  const isDisabled = isLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="w-full bg-sidebar border-none rounded-none drop-shadow-sm mt-2">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between w-full">
        <CardTitle className="text-xl line-clamp-1">Role Configuration</CardTitle>

        <div>
          <Button size="sm" className="w-full sm:w-auto" onClick={onOpen}>
            <Plus className="h-4 w-4 mr-2" />
            <span className="sr-only">Role</span>
          </Button>
        </div>
      </CardHeader>


      <CardContent className="w-full">
        <DataTable
          columns={columns}
          data={data || []}
          onDelete={(row) => {
            console.log(row);
          }}
          disabled={isDisabled}
        />
      </CardContent>
    </Card>
  );
}
