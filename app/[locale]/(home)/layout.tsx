
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInfo, WelcomeNav } from "@/components/sidebar-item";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



type Props = {
    children: React.ReactNode;
};

export default async function HomeLayout({
    children,
}: Readonly<Props>) {
    const data = await auth.api.getSession({
        headers: await headers(),
    });
    return (
        <>
            <AppSidebar variant={'sidebar'} collapsible={'icon'} >
                <WelcomeNav />
                <SidebarInfo />
            </AppSidebar>
            <SidebarInset>
                <SiteHeader user={data?.user} />
                <main className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4">
                    {children}
                </main>
            </SidebarInset>
        </>
    );
}
