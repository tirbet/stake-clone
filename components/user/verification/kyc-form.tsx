"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { kycSchema, KycSchema } from "@/schemas/kyc.schema";
import { Form } from "@/components/ui/form";
import { KycField as KycFieldType } from "@/lib/constants/configuration";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import KycField from "./kyc-field";
import { useCreateUserKyc } from "@/features/user/api/use-create-user-kyc";
type Props = {
    fields: KycFieldType[]
    label: number;
    defaultValues?: Partial<KycSchema>;
    disabled?: boolean;
}

export const KycForm = ({ fields, defaultValues, label }: Props) => {
    const form = useForm<KycSchema>({
        resolver: zodResolver(kycSchema),
        defaultValues,
    });
    const { mutate, isPending } = useCreateUserKyc();
    const handleSubmit = (form: KycSchema) => {
        console.log(form)
        mutate({
            form,
            label: label.toString()
        })

        // call mutation / fetch here
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} encType="multipart/form-data">
                <Card className="border shadow-sm bg-sidebar-accent">
                    <CardHeader>
                        <CardTitle>title</CardTitle>
                        <CardDescription>description</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fields.length ? (
                            <>
                                {fields.map((item) => (
                                    <KycField
                                        key={item}
                                        control={form.control}
                                        name={item}
                                        field={item}
                                        disabled={isPending}
                                    />))}
                            </>) : (
                            <p className="text-xs text-slate-500">No fields configured.</p>
                        )}
                    </CardContent>
                    <CardFooter className='justify-end'>
                        <Button
                            type="submit"
                            disabled={false}>
                            Subbmit
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}