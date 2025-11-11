"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type Option = { label: string; value: string };

type Props = {
    onChange: (value?: string) => void;
    onCreate?: (value: string) => void;
    options?: Option[];
    value?: string | null | undefined;
    disabled?: boolean;
    placeholder?: string;
};

export const Select = ({
    value, 
    onChange, 
    disabled, 
    onCreate, 
    options = [], 
    placeholder
}: Props) => {
    
    const onSelect = (
        option: SingleValue<Option>
    ) => {
        onChange(option?.value);
    };

    const formattedValue = useMemo(() => {
        return options.find((option) => option.value === value) || null;
    }, [options, value]);

    return (
        <CreatableSelect
            placeholder={placeholder}
            className="text-sm h-10"
            styles={{
                control: (base, state) => ({
                    ...base,
                    backgroundColor: "var(--background)",
                    borderColor: state.isFocused ? "var(--ring)" : "var(--border)",
                    borderWidth: "1px",
                    borderRadius: "6px",
                    boxShadow: state.isFocused ? "0 0 0 1px var(--ring)" : "none",
                    minHeight: "40px",
                    "&:hover": {
                        borderColor: "var(--ring)",
                    },
                }),
                placeholder: (base) => ({
                    ...base,
                    color: "var(--muted-foreground)",
                    fontSize: "14px",
                }),
                input: (base) => ({
                    ...base,
                    color: "var(--foreground)",
                    fontSize: "14px",
                }),
                singleValue: (base) => ({
                    ...base,
                    color: "var(--foreground)",
                    fontSize: "14px",
                }),
                menu: (base) => ({
                    ...base,
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }),
                option: (base, state) => ({
                    ...base,
                    fontSize: "14px",
                    backgroundColor: state.isSelected 
                        ? "var(--primary)" 
                        : state.isFocused 
                        ? "var(--muted)" 
                        : "var(--background)",
                    color: state.isSelected 
                        ? "var(--primary-foreground)" 
                        : "var(--foreground)",
                    "&:active": {
                        backgroundColor: "var(--accent)",
                    },
                }),
                dropdownIndicator: (base, state) => ({
                    ...base,
                    color: "var(--muted-foreground)",
                    "&:hover": {
                        color: "var(--foreground)",
                    },
                }),
                clearIndicator: (base, state) => ({
                    ...base,
                    color: "var(--muted-foreground)",
                    "&:hover": {
                        color: "var(--foreground)",
                    },
                }),
                indicatorSeparator: (base) => ({
                    ...base,
                    backgroundColor: "var(--border)",
                }),
            }}
            value={formattedValue}
            onChange={onSelect}
            options={options}
            onCreateOption={onCreate}
            isDisabled={disabled}
        />
    );
};