import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNewUser } from "@/features/user/hooks/use-new-user"
import { UserForm } from "@/features/user/components/user-form";
import { useCreateUser } from "@/features/user/api/use-create-user";
import { UserSchema } from "@/schemas/user.schema";

export const NewUserSheet = () => {
    const { isOpen, onClose } = useNewUser();

    const mutation = useCreateUser();

    const onSubmit = (values: UserSchema) => {
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
                    <SheetTitle>New User</SheetTitle>
                    <SheetDescription>
                        Create new user.
                    </SheetDescription>
                </SheetHeader>
                <UserForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{ 
                        name: "",
                        email: "",
                        password: "",
                        roleId: "",
                        userType: "PLAYER",
                        currencyId: ""
                     }}
                />
            </SheetContent>
        </Sheet>
    )
}