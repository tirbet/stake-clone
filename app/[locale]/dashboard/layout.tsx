
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UserType } from "@prisma/client";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

const onlyAccess: UserType[] = [UserType.SUPER_ADMIN, UserType.ADMIN, UserType.STAFF];



type Props = {
    children: React.ReactNode;
};

export default async function DashboardLayout({
    children,
}: Readonly<Props>) {
    const data = await auth.api.getSession({
        headers: await headers(),
    });
    if(!data?.user) {
        redirect('/login')
    }
    if (!onlyAccess.includes(data.user.userType as UserType)) {
        notFound()
    }

    const role = await prisma.role.findUnique({
        where: {id: data.user.roleId!},
        select: {
            name: true,
            permissions: {
                omit: {
                    id: true,
                    roleId: true,
                }
            }
        }
    });

    return (
        <>
            <AppSidebar variant={'sidebar'} collapsible={'icon'} >
               <></>
            </AppSidebar>
            <SidebarInset>               
                <main className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4">
                    {children}
                </main>
            </SidebarInset>
        </>
    );
}
