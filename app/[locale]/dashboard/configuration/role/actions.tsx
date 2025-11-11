"use client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useOpenRole } from "@/features/role/hooks/use-open-role";
import { useDeleteRole } from "@/features/role/api/use-delete-role";
import { useConfirm } from "@/hooks/use-confirm";


type Props = {
    id: string;
}

export const Actions = ({ id }: Props) => {

    const { onOpen } = useOpenRole();
    const deleteMutation = useDeleteRole(id);
    const [ConfirmaDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this role"
    );
    const handleDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate();
        }
    }

    return (
        <>
            <ConfirmaDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={() => onOpen(id)}>
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}>
                        <Trash className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}