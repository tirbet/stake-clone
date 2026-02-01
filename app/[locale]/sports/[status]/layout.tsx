import { ErrorMessage } from "@/components/error-message";
import AppLayout from "@/components/layouts/app-layout";
import SportSideBar from "@/components/sidebar/sport-sidebar";
import { Suspense } from "react";
type Props = {
    children: React.ReactNode;
    params: Promise<{ status: string }>;
};

export default async function Layout({ children, params }: Readonly<Props>) {
    const { status } = await params;
    if (status !== "live" && status !== "upcoming") {
        return (
            <ErrorMessage
                title="Invalid Status"
                message={`"${status}" is not a valid status. Please use "live" or "upcoming".`}
            />
        );
    }
    return (
        <AppLayout sidebarItem={<>
            <Suspense fallback={<>Loding...</>}>
                <SportSideBar type={status} />
            </Suspense>
        </>}>
            <div className="max-w-screen-xl mx-auto flex flex-col w-full px-1.5 mt-0.5 md:px-4 md:mt-2">
                {children}
            </div>
        </AppLayout >
    )
}