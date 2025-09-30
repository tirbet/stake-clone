
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";



type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function HomeLayout({
    children,
    params
}: Readonly<Props>) {
    const { locale } = await params;

    return (
        <>
            <AppSidebar variant={'sidebar'} collapsible={'icon'} />
            <SidebarInset>
                <SiteHeader />
                <main className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4">
                    {children}
                </main>
            </SidebarInset>
        </>
    );
}
