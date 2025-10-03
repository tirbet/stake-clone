
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";




type Props = {
    children: React.ReactNode;
};

export default async function AuthLayout({
    children,
}: Readonly<Props>) {

    return (
        <>
            <AppSidebar variant={'sidebar'} collapsible={'icon'} >
                <></>
            </AppSidebar>
            <SidebarInset>
                <SiteHeader />
                <main className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4">
                    {children}
                </main>
            </SidebarInset>
        </>
    );
}
