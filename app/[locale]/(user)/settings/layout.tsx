import SettingHeading from "@/components/setting-heading";
import SettingsSidebar from "@/components/sidebar/settings-sidebar";
import { Separator } from "@/components/ui/separator";

type Props = {
    children: React.ReactNode;
};

export default async function SettingLayout({
    children,
}: Readonly<Props>) {
    const items = [
        {
            name: 'navigation.user_setting.account',
            href: '/settings/account',
        },
        {
            name: 'navigation.user_setting.offers',
            href: '/settings/offers',
        },
        {
            name: 'navigation.user_setting.preferences',
            href: '/settings/preferences',
        },
        {
            name: 'navigation.user_setting.security',
            href: '/settings/security',
        },
        {
            name: 'navigation.user_setting.verification',
            href: '/settings/verification',
        }
    ];
    return (
        <div className="max-w-screen-xl mx-auto flex w-full items-center justify-between px-4 mt-1">
            <div className='w-full'>
                <SettingHeading data={{ title: 'common.settings', icon: 'settings' }} />
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