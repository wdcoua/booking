import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['ua'];
const availableLanguages = ['ua', 'ru'];

i18n
    .use(Backend) // load translation using xhr -> see /public/locales. We will add locales in the next step

    .use(LanguageDetector) // detect user language

    .use(initReactI18next) // pass the i18n instance to react-i18next.

    .init({
        fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
        debug: true,
        whitelist: availableLanguages,

        interpolation: {
            escapeValue: false,
            // format: function(value, format,lng){
            //     if(format === 'bold') return <b>value</b>
            //     return value;
            // }
        },
    });

export default i18n;

// https://dev.to/ksushiva/how-to-translate-your-react-js-app-with-i18next-12mn
// https://react.i18next.com/