"use client"

import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { Link, useRouter } from '@/i18n/navigation';
import { User } from '@/types/auth';
import { logOut } from '@/server/actions/auth-action';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
    showUserInfo?: boolean;
    user: User
};

export function UserMenuContent({ showUserInfo, user }: Props) {

    const router = useRouter();

    const handleLogout = async () => {
        const res = await logOut();
        if (res.success) {
            router.refresh();
            router.push('/');
            toast.info(res.message);
        } else {
            toast.error(res.message || "Something went wrong")
        }
        return null;
    };

    const handleClick = async (id: number) => {
        // console.log(id);
        return null;
    };

    return (
        <>
            {showUserInfo && (
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <UserInfo user={user} showEmail={false} />
                    </div>
                </DropdownMenuLabel>
            )}
            {showUserInfo && (<DropdownMenuSeparator />)}
            <DropdownMenuGroup>
                <DropdownMenuItem asChild className="">

                    <Link
                        href={""}
                        className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-muted rounded-sm"
                        prefetch
                    >
                        Setting
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className='text-gray-700 hover:text-neutral-900 hover:bg-gray-200'>
                    <Link className="block w-full" href={"#"} onClick={handleLogout}>
                        <LogOut className="mr-2" />
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </>
    );
}