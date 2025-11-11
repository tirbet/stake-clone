import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNewRole } from "@/features/role/hooks/use-new-role"
import { RoleForm } from "@/features/role/components/role-form";
import { useCreateRole } from "@/features/role/api/use-create-role";
import { RoleSchema } from "@/schemas/role.schema";

export const NewRoleSheet = () => {
    const { isOpen, onClose } = useNewRole();

    const mutation = useCreateRole();

    const onSubmit = (values: RoleSchema) => {
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
                    <SheetTitle>New Role</SheetTitle>
                    <SheetDescription>
                        Create role to manage your user permissions.
                    </SheetDescription>
                </SheetHeader>
                <RoleForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{ name: "",  permissions: []  }}
                />
            </SheetContent>
        </Sheet>
    )
}