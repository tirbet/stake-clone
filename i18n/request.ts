import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';


async function loadMessages(locale: string) {
    const [common, navigation, forms, sports, status] = await Promise.all([
        import(`@/messages/${locale}/common.json`),
        import(`@/messages/${locale}/navigation.json`),
        import(`@/messages/${locale}/forms.json`), 
        import(`@/messages/${locale}/sports.json`),
        import(`@/messages/${locale}/status.json`)
    ]);

    return {
        common: common.default,
        navigation: navigation.default,
        forms: forms.default,
        sports: sports.default,
        status: status.default
    };
}


export default getRequestConfig(async ({ requestLocale }) => {
    // Static for now, we'll change this later
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: await loadMessages(locale)
    };
});