import i18n from 'i18next';

i18n
    .init({
        fallbackLng: 'cimode',
        debug: false,
        saveMissing: false,

        interpolation: {
            escapeValue: false
        },

        react: {
            wait: false,
            nsMode: 'fallback'
        }
    });

export default i18n;