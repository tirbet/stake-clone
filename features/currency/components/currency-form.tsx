'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { TrashIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { currencySchema, CurrencySchema } from "@/schemas/currency.schema";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner"
type CurrencyFormProps = {
    id?: string;
    deleting?: boolean;
    updating?: boolean;
    onSubmit: (values: CurrencySchema) => void;
    disabled?: boolean;
    onDelete?: () => void;
    defaultValues?: Partial<CurrencySchema>;
}
export const CurrencyForm = ({
    id,
    deleting,
    updating,
    onSubmit,
    disabled,
    defaultValues,
    onDelete,
}: CurrencyFormProps
) => {
    const form = useForm<CurrencySchema>({
        resolver: zodResolver(currencySchema),
        defaultValues: defaultValues
    });

    const handleSubmit = (values: CurrencySchema) => {
        onSubmit(values);
    };

    const handleDelete = () => {
        onDelete?.();
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-2 px-4"
            >
                {/* Name */}
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Currency name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="US Dollar"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Code */}
                <FormField
                    name="code"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="USD"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(e.target.value.toUpperCase())
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Symbol */}
                <FormField
                    name="symbol"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Symbol</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="$"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* useRate */}
                <FormField
                    name="useRate"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>USD Rate</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.0001"
                                    min={0}
                                    disabled={disabled}
                                    placeholder="1.0000"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* decimals */}
                <FormField
                    name="decimals"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Decimals</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={0}
                                    disabled={disabled}
                                    placeholder="2"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* isActive */}
                <FormField
                    name="isActive"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border px-3 py-2">
                            <div>
                                <FormLabel>Status</FormLabel>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button className="w-full" disabled={disabled} type="submit">
                    {updating && <Spinner className="h-4 w-4 mr-2" />}
                    {id ? "Save changes" : "Create currency"}
                </Button>

                {!!id && (
                    <Button
                        type="button"
                        className="w-full"
                        variant="outline"
                        onClick={handleDelete}
                        disabled={disabled}
                    >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        {deleting && <Spinner className="h-4 w-4 mr-2" />}
                        Delete currency

                    </Button>
                )}
            </form>
        </Form>
    );
};