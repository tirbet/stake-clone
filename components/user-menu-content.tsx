"use client"

import { DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Link, useRouter } from '@/i18n/navigation';
import { BarChart3Icon, CrownIcon, HeadsetIcon, LockIcon, LogOut, ReceiptIcon, ScrollTextIcon, SettingsIcon, UsersRoundIcon, WalletIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { signOut } from '@/lib/auth-client';
import { useUserStore } from '@/store/user-store';
import { useState } from 'react';


export function UserMenuContent() {
    const navUserT = useTranslations("navigation.user")
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const navigations = [
        {
            name: navUserT("wallet"),
            icon: WalletIcon,
            link: "#",
            isClick: false,
        },
        {
            name: navUserT("vault"),
            icon: LockIcon,
            link: "#",
            isClick: false,
        },
        {
            name: navUserT("vip"),
            icon: CrownIcon,
            link: "#",
            isClick: false,
        },
        {
            name: navUserT("affiliate"),
            icon: UsersRoundIcon,
            link: "/affiliate/overview",
            isClick: false,
        },
        {
            name: navUserT("statistics"),
            icon: BarChart3Icon,
            link: "#",
            isClick: false,
        },
        {
            name: navUserT("transactions"),
            icon: ReceiptIcon,
            link: "/transactions/deposits",
            isClick: false,
        },
        {
            name: navUserT("my_bets"),
            icon: ScrollTextIcon,
            link: "/my-bets/casino",
            isClick: false,
        },
        {
            name: navUserT("settings"),
            icon: SettingsIcon,
            link: "/settings/account",
            isClick: false,
        },
        {
            name: navUserT("live_support"),
            icon: HeadsetIcon,
            link: "#",
            isClick: false,
        },
    ];

    const handleMenuClick = (item: { isClick: boolean, link: string }) => {
        if (item.isClick) {
            console.log("Clicked:", item.isClick)
            return // ⛔️ prevent navigation
        }
    }
    const handleLogout = async () => {
        if (isLoggingOut) return;

        setIsLoggingOut(true)
        try {
            const { data, error } = await signOut();

            if (error) {
                toast.error("Failed to log out. Please try again.");
                return;
            }

            if (data?.success) {
                toast.info("Logged out successfully");
                router.push("/"); // Redirect to home page
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            console.error("Logout error:", error)
        } finally {
            setIsLoggingOut(false)
        }
    }
    return (
        <DropdownMenuGroup>
            {navigations.map((item) => (
                <DropdownMenuItem key={item.name} asChild className="text-gray-700 hover:text-neutral-900 hover:bg-gray-200">

                    <Link
                        href={`${item.link}`}
                        onClick={() => handleMenuClick(item)}
                        className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-muted rounded-sm"

                    >
                        <item.icon className='mr-2' />
                        {item.name}
                    </Link>
                </DropdownMenuItem>
            ))}

            <DropdownMenuItem asChild className='text-gray-700 hover:text-neutral-900 hover:bg-gray-200'>
                <Link className="block w-full" href={"#"} onClick={handleLogout} >
                    <LogOut className="mr-2" />
                    {navUserT('logout')}
                </Link>
            </DropdownMenuItem>
        </DropdownMenuGroup>
    );
}