import { ReactNode, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateRole } from "@/features/role/api/use-create-role";
import { Select } from "@/components/select";
import { useGetRoles } from "@/features/role/api/use-get-roles";


export const useSelectRole = (): [() => ReactNode, () => Promise<unknown>] => {

    const roleQuery = useGetRoles();
    const roleMutation = useCreateRole();
    const onCreateAccount = (name: string) => roleMutation.mutate({
        name
    });
    const roleOptions = (roleQuery.data ?? []).map((role) => ({
        label: role.name,
        value: role.id,
    }));

    const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(null);
    const selectValue = useRef<string | undefined>(undefined);

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    });

    const handleClose = () => {
        setPromise(null);
    }

    const handleConfirm = () => {
        promise?.resolve(selectValue.current);
        handleClose();
    }

    const handleCancel = () => {
        promise?.resolve(undefined);
        handleClose();
    }

    const ConfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Role</DialogTitle>
                    <DialogDescription>Please select role to continue</DialogDescription>
                </DialogHeader>
                <Select
                    placeholder="Select a role"
                    options={roleOptions}
                    onCreate={onCreateAccount}
                    onChange={(value) => selectValue.current = value}
                    disabled={roleQuery.isLoading || roleMutation.isPending}
                />
                <DialogFooter className="pt-2">
                    <Button onClick={handleCancel} variant={"outline"}>Cancel</Button>
                    <Button onClick={handleConfirm} >Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
    return [ConfirmationDialog, confirm];
}