import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations('market');
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      {t('2.N')}  {t('2.M.7', {score: 2.4})}
    </div>
  )
}
