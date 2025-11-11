"use client"
import { sideberInfo, welcomeNav as welcomeItems, adminSidebarItems } from "@/lib/data"
import { useLocale, useTranslations } from "next-intl";
import { LanguageIcon } from "./icons";
import { locales } from "@/config";
import { PermissionAction, PermissionResource } from "@/schemas/permission.schema";
// import { hasPermission } from "@/lib/hasPermission";
// import { NavItem } from "@/types/navigation";




export const SidebarInfo = () => {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const items = [
    ...sideberInfo,
    {
      name: t("label"),
      icon: LanguageIcon,
      onClick: true,
      url: "#",
      items:
        locales.map((cur) => ({
          name: t('locale', { locale: cur }),
          url: `#`,
          icon: LanguageIcon,
        }))

    },
  ];

  return (<></>);
}


type AdminSidebarProps = {
  name: string,
  permissions: {
    resource: PermissionResource,
    actions: PermissionAction[]
  }

}

export const AdminSidebar = ({ role }: { role: AdminSidebarProps }) => {
  console.log(role)
  // let items: NavItem[];
  // if ()
  //   const items = adminSidebarItems.filter((item) =>
  //     hasPermission(permissions, item.resource)
  //   );
  return <></>
}
