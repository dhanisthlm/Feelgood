import i18next from 'i18next';
import * as resources from '../../i18n/translations.json';

export const defaultLocale = 'ba-BA';

export const supportedLocales = [
    'sv-SE',
    'ba-BA'
];

i18next.init({
    lng: defaultLocale,
    resources,
    debug: false,
    fallbackNS: 'common',
    interpolation: {
        escapeValue: false
    }
});

export default i18next;