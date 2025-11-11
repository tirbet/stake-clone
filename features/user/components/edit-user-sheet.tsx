import { Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useOpenUser } from "@/features/user/hooks/use-open-user"
import { UserForm } from "@/features/user/components/user-form";
import { useGetUser } from "@/features/user/api/use-get-user";
import { useEditUser } from "@/features/user/api/use-edit-user";
import { useDeleteUser } from "@/features/user/api/use-delete-user";
import { useConfirm } from "@/hooks/use-confirm";
import { UserSchema } from "@/schemas/user.schema";
import { UserType } from "@prisma/client";


export const EditUserSheet = () => {
    const { isOpen, onClose, id } = useOpenUser();

    const [ConfirmaDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this user"
    )

    const userQuery = useGetUser(id);
    const eddiMutation = useEditUser(id);
    const deleteMutation = useDeleteUser(id!);

    const isPending = eddiMutation.isPending || deleteMutation.isPending;

    const isLoading = userQuery.isLoading;

    const onSubmit = (values: UserSchema) => {
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

    const defaultValues = userQuery.data ? {
        name: userQuery.data.name,
        email: userQuery.data.email,
        roleId: userQuery.data.roleId || "",
        userType: userQuery.data.userType,
        password: "",
        currencyId: userQuery.data.wallets.find(wallet => wallet.isActive == true && wallet.isBonus == false)?.currency.id || undefined,

    } : {
        name: "",
        email: "",
        roleId: "",
        userType: UserType.STAFF,
        currencyId: undefined,
        password: "",
    }

    return (
        <>
            <ConfirmaDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit User</SheetTitle>
                        <SheetDescription>
                            Edit existing user
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>) : (
                        <UserForm
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