import BetSlip from "@/components/sport/BetSlip";
import React from "react";

type Props = {
    children: React.ReactNode;
};

export default async function RootLayout({ children }: Readonly<Props>) {
    return (
        <React.Fragment>
            {children}
            <BetSlip />
        </React.Fragment>
    )
}