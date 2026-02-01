import AppLayout from "@/components/layouts/app-layout";
import Welcome from "@/components/sidebar/welcome";

type Props = {
    children: React.ReactNode;
};

export default async function UserLayout({
    children,
}: Readonly<Props>) {

    return (
        <AppLayout sidebarItem={<Welcome />}>
            <main className="max-w-screen-xl mx-auto flex flex-col w-full px-1.5 mt-0.5 md:px-4 md:mt-2">
                {children}
            </main>
        </AppLayout>
    );
}
