"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { KycField as KycFieldType } from "@/lib/constants/configuration";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type Props = {
    control: Control<any>;
    name: string;
    field: KycFieldType;
    disabled?: boolean;
};

const fieldLabels: Record<KycFieldType, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    birthDate: "Birth Date",
    country: "Country",
    idType: "ID Type",
    idNumber: "ID Number",
    idFrontPath: "ID Front Image",
    idBackPath: "ID Back Image",
    selfieWithIdPath: "Selfie With ID",
    paymentMethod: "Payment Method",
    paymentProofPath: "Payment Proof",
    bankStatementPath: "Bank Statement",
};

const KycField: React.FC<Props> = ({ control, name, field, disabled }) => {
    const label = fieldLabels[field];

    return (
        <FormField
            control={control}
            name={name}
            render={({ field: rhfField }) => {
                switch (field) {
                    case "firstName":
                    case "lastName":
                    case "country":
                    case "idNumber":
                        return (
                            <FormItem className="space-y-1">
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...rhfField}
                                        disabled={disabled}
                                        value={rhfField.value ?? ""}
                                        onChange={(e) => rhfField.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );

                    case "birthDate":
                        return (
                            <FormItem className="space-y-1">
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        disabled={disabled}
                                        value={rhfField.value ?? ""}
                                        onChange={(e) => rhfField.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );

                    case "idType":
                        return (
                            <FormItem className="space-y-1">
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={rhfField.onChange}
                                        value={rhfField.value ?? ""}
                                        disabled={disabled}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select ID Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PASSPORT">Passport</SelectItem>
                                            <SelectItem value="DRIVER_LICENSE">Driver License</SelectItem>
                                            <SelectItem value="NATIONAL_ID">National ID</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );

                    case "paymentMethod":
                        return (
                            <FormItem className="space-y-1">
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={rhfField.onChange}
                                        value={rhfField.value ?? ""}
                                        disabled={disabled}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Payment Method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                                            <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );

                    case "idFrontPath":
                    case "idBackPath":
                    case "selfieWithIdPath":
                    case "paymentProofPath":
                    case "bankStatementPath":
                        return (
                            <FormItem className="space-y-1">
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        disabled={disabled}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            rhfField.onChange(file ?? null);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );

                    default:
                        return (
                            <FormItem>
                                <Label>{label}</Label>
                                <Input
                                    {...rhfField}
                                    disabled={disabled}
                                    value={rhfField.value ?? ""}
                                    onChange={(e) => rhfField.onChange(e.target.value)}
                                />
                            </FormItem>
                        );
                }
            }}
        />
    );
};

export default KycField;
