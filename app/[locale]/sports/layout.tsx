import AppLayout from "@/components/layouts/app-layout";
import SportSideBar from "@/components/sidebar/sport-sidebar";
import BetSlip from "@/components/sport/BetSlip";
import React, { Suspense } from "react";

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
    return (
        <AppLayout sidebarItem={<>
            <Suspense fallback={<>Loding...</>}>
                <SportSideBar />
            </Suspense>
        </>}>
            <div className="max-w-7xl mx-auto flex flex-col w-full px-1.5 mt-0.5 md:px-4 md:mt-2">
                {children}
                <BetSlip />
            </div>
        </AppLayout >

    )
}