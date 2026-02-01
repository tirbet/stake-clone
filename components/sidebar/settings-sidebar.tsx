"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MenuSquareIcon } from "lucide-react"; // Fixed icon name
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "@/i18n/navigation"; // Use Next.js navigation hook
import { useTranslations } from "next-intl";

type Props = {
    sidebarNavItems: {
        href: string;
        name: string;
    }[];
};

export default function SettingsSidebar({ sidebarNavItems }: Readonly<Props>) {
    const pathname = usePathname(); // Use Next.js hook instead of window
    const t = useTranslations();
    const normalizePath = (path: string) => {
        return path.replace(/\/+$/, ''); // Remove trailing slashes
    };

    const currentPath = normalizePath(pathname);

    // Find the current item by comparing normalized paths
    const currentItem = sidebarNavItems?.find((item) => {
        const itemPath = normalizePath(item.href);
        return currentPath === itemPath ||
            currentPath.startsWith(`${itemPath}/`);
    });

    // Handle empty sidebar items
    if (!sidebarNavItems || sidebarNavItems.length === 0) {
        return null;
    }

    return (
        <aside>
            {/* Mobile Dropdown */}
            <div className="block lg:hidden mb-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {currentItem && t(currentItem.name) || "Menu"}
                            <MenuSquareIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full" align="start">
                        {sidebarNavItems.map((item, index) => {
                            const itemPath = normalizePath(item.href);
                            const isActive = currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);

                            return (
                                <DropdownMenuItem asChild key={`${item.href}-${index}`}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "w-full",
                                            isActive && "font-semibold text-primary"
                                        )}
                                    >
                                        {t(item.name)}
                                    </Link>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-full max-w-xl lg:w-48 p-1.5 rounded-2xl h-fit mt-0.5 mb-0.5 bg-sidebar">
                <nav className="flex flex-col space-y-1">
                    {sidebarNavItems.map((item, index) => {
                        const itemPath = normalizePath(item.href);
                        const isActive = currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);

                        return (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn(
                                    'w-full justify-start h-9 px-3',
                                    isActive && 'bg-sidebar-accent'
                                )}
                            >
                                <Link href={item.href}>
                                    {t(item.name)}
                                </Link>
                            </Button>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}