"use client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useConfirm } from "@/hooks/use-confirm";
import { useOpenUser } from "@/features/user/hooks/use-open-user";
import { useDeleteUser } from "@/features/user/api/use-delete-user";


type Props = {
    id: string;
}

export const Actions = ({ id }: Props) => {

    const { onOpen } = useOpenUser();
    // const {} = useOpenRole();
    const deleteMutation = useDeleteUser(id);
    const [ConfirmaDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this user"
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