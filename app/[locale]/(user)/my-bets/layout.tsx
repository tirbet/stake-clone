import SettingHeading from "@/components/setting-heading";
import SettingsSidebar from "@/components/sidebar/settings-sidebar";
import { Separator } from "@/components/ui/separator";

type Props = {
    children: React.ReactNode;
};

export default async function MyBetsLayout({
    children,
}: Readonly<Props>) {
    const items = [
        {
            name: 'navigation.user_my_bets.casino',
            href: '/my-bets/casino',
        },
        {
            name: 'navigation.user_my_bets.sports',
            href: '/my-bets/sports',
        },
        {
            name: 'navigation.user_my_bets.archive',
            href: '/my-bets/archive',
        }
    ];
    return (
        <div className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4 mt-1">
            <div className='w-full'>
                <SettingHeading data={{ title: 'common.my_bets', icon: 'my_bets' }} />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <SettingsSidebar sidebarNavItems={items} />
                    <Separator className="my-6 md:hidden" />
                    <div className="flex w-full bg-sidebar rounded-2xl p-6">
                        <section className="w-full space-y-12">{children}</section>
                    </div>
                </div>

            </div>
        </div>
    );
}