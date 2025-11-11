'use client';
import { useMountedState } from "react-use";
import { NewRoleSheet } from "@/features/role/components/new-role-sheet";
import { EditRoleSheet } from "@/features/role/components/edit-role-sheet";
import { NewUserSheet } from "@/features/user/components/new-user-sheet";
import { EditUserSheet } from "@/features/user/components/edit-user-sheet";


export const SheetProvider = () => {
    const isMounted = useMountedState();
    if (!isMounted) return null;
    return (
        <>
            {/* Role */}
            <NewRoleSheet />
            <EditRoleSheet />

            {/* User */}
            <NewUserSheet />
            <EditUserSheet />

        </>
    );
}