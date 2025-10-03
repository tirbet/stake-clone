import { Link } from "@/i18n/navigation";
import AppLogoIcon from "./app-logo-icon";



export default function AppLogo({isAdmin}: {isAdmin?: boolean}) {
    return (
        <>
            <div className="bg-white text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <Link href={isAdmin ? '/dashboard' : '/'}>
                    <AppLogoIcon className="h-8 w-8" />
                </Link>
            </div>
        </>
    );
}