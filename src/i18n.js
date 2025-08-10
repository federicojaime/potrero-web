// src/i18n.js - CONFIGURACIÓN QUE FUNCIONA
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: false,
    
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    // CRÍTICO: Estos idiomas deben coincidir con tus carpetas
    supportedLngs: ['es', 'en', 'fr','pt'],
    
    interpolation: {
      escapeValue: false,
    },
    
    // IMPORTANTE: Configuración de React
    react: {
      useSuspense: false, // ← CAMBIÉ ESTO A FALSE
    }
  });

export default i18n;