import Vue from 'vue';
import VueI18n from 'vue-i18n';


Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: selectedLocale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {}
});

const selectedLocale = localStorage.getItem('language') || process.env.VUE_APP_I18N_LOCALE || 'en';

const loadedLanguages = [];

function setI18nLanguage (lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  localStorage.setItem('language', lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}.json`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages.default);
      loadedLanguages.push(lang);
      return setI18nLanguage(lang);
    }
  );
}

loadLanguageAsync(selectedLocale);
