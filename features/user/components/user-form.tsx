import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userSchema, UserSchema } from "@/schemas/user.schema";
import { useGetRoles } from "@/features/role/api/use-get-roles";
import { Select } from "@/components/select";
import { useCreateRole } from "@/features/role/api/use-create-role";
import { useGetCurrencies } from "@/features/currency/api/use-get-currencies";



type Props = {
    id?: string;
    defaultValues?: UserSchema;
    onSubmit: (values: UserSchema) => void;
    onDelete?: () => void;
    disabled: boolean;
}

export const UserForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled
}: Props) => {

    const roleQuery = useGetRoles();
    const roleMutation = useCreateRole();

    const onCreateRole = (name: string) => roleMutation.mutate({
        name
    });
    const roleOptions = (roleQuery.data ?? []).map((role) => ({
        label: role.name,
        value: role.id,
    }));

    const currencyQuery = useGetCurrencies();

    const currencyoptions = (currencyQuery.data ?? []).map((currency) => ({
        label: currency.name + ` (${currency.code})`,
        value: currency.id,
    }));

    const form = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: defaultValues
    });

    const handleSubimt = (values: UserSchema) => {
        onSubmit(values);
    };

    const handleDelete = () => {
        onDelete?.();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubimt)}
                className="space-y-2 pt-2 ml-4 mr-4"
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    autoComplete="name"
                                    placeholder="Enter full name"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    disabled={disabled}
                                    autoComplete="username"
                                    placeholder="e.g example@email.com"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {!id && (
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        autoComplete="new-password"
                                        disabled={disabled}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    name="userType"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User Type</FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select user type"
                                    options={userSchema.shape.userType.options.map((option) => ({
                                        label: option,
                                        value: option,
                                    }))}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                    value={field.value}
                                    key={field.value}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* currencyId select */}
                {!id && (
                    <FormField
                        name="currencyId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Currency</FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder="Select currency"
                                        options={currencyoptions}
                                        onChange={field.onChange}
                                        disabled={currencyQuery.isLoading}
                                        value={field.value}
                                        key={field.value}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                )}

                {/* RoleId select */}
                <FormField
                    name="roleId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select a role"
                                    options={roleOptions}
                                    onCreate={onCreateRole}
                                    onChange={field.onChange}
                                    disabled={roleQuery.isLoading || roleMutation.isPending}
                                    value={field.value}
                                    key={field.value}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-full" disabled={disabled}>
                    {id ? "Save change" : "Create user"}
                </Button>
                {!!id && (
                    <Button
                        type="button"
                        className="w-full"
                        variant={"outline"}
                        onClick={handleDelete}
                        disabled={disabled}
                    >
                        <Trash className="size-4 m-8" />
                        Delete user
                    </Button>
                )}
            </form>
        </Form>
    );
}