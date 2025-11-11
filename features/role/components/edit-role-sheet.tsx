import { Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useOpenRole } from "@/features/role/hooks/use-open-role"
import { RoleForm } from "@/features/role/components/role-form";
import { useGetRole } from "@/features/role/api/use-get-role";
import { useEditRole } from "@/features/role/api/use-edit-role";
import { useDeleteRole } from "@/features/role/api/use-delete-role";
import { useConfirm } from "@/hooks/use-confirm";
import { RoleSchema } from "@/schemas/role.schema";



export const EditRoleSheet = () => {
    const { isOpen, onClose, id } = useOpenRole();

    const [ConfirmaDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this role"
    )

    const roleQuery = useGetRole(id!);
    const eddiMutation = useEditRole(id);
    const deleteMutation = useDeleteRole(id!);

    const isPending = eddiMutation.isPending || deleteMutation.isPending;

    const isLoading = roleQuery.isLoading;

    const onSubmit = (values: RoleSchema) => {
        eddiMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

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

    const defaultValues = roleQuery.data ? {
        name: roleQuery.data.name,
        permissions: roleQuery.data.permissions
    } : {
        name: "",
        permissions: [],
        
    }

    return (
        <>
            <ConfirmaDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Role</SheetTitle>
                        <SheetDescription>
                            Edit existing role
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>) : (
                        <RoleForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultValues={defaultValues}
                            onDelete={onDelete}
                        />)
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}