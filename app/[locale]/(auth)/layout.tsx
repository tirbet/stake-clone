
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarInfo, WelcomeNav } from "@/components/sidebar-item";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";


type Props = {
    children: React.ReactNode;
};

export default async function AuthLayout({
    children,
}: Readonly<Props>) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // ✅ If already logged in, redirect to dashboard (or homepage)
    if (session?.user) {
        redirect(`/`); // change this path to wherever you want
    }
    return (
        <>
            <AppSidebar variant={'sidebar'} collapsible={'icon'} >
                <WelcomeNav />
                <SidebarInfo />
            </AppSidebar>
            <SidebarInset>
                <SiteHeader user={session?.user} />
                <main className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4">
                    <div className="flex min-h-screen w-full items-start justify-center sm:items-center">
                        <div className="flex w-full max-w-sm flex-col gap-6 mt-10 sm:mt-0">
                            {children}
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </>
    );
}
