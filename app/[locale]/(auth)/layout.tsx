import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AppLayout from "@/components/layouts/app-layout";


type Props = {
    children: React.ReactNode;
};

export default async function AuthLayout({
    children,
}: Readonly<Props>) {
    const data = await auth.api.getSession({
        headers: await headers(),
    });

    // ✅ If already logged in, redirect to dashboard (or homepage)
    if (data?.user) {
        redirect(`/`); // change this path to wherever you want
    }
    return (
        <AppLayout
            user={data?.user}
            sidebarItem={[]}
        >
            {children}
        </AppLayout>
    );
}
