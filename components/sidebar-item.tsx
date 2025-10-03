"use client"
import { sideberInfo, welcomeNav as welcomeItems } from "@/lib/data"
import { NavMain } from "./nav-main";
import { useLocale, useTranslations } from "next-intl";
import { LanguageIcon } from "./icons";
import { locales } from "@/config";


export const WelcomeNav = () => {
  return <NavMain items={welcomeItems} />;
}

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

  return (<NavMain items={items} separator={true} />);
}
