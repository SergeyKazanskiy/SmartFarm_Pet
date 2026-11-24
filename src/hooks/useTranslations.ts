import { useLanguageStore } from '@/stores/useLanguageStore';
import ru from '@/translations/ru.json';
import uk from '@/translations/uk.json';
import en from '@/translations/en.json';

/*
* Хук для получения переводов на основе текущего выбранного языка.
*/

const translations = { ru, en, uk };

// Используйте этот хук в компонентах, чтобы получить доступ к переводам
export const useTranslations = () => {
  const { language } = useLanguageStore();
  return translations[language];
};

// Если вам нужно получить переводы вне React-компонента, используйте эту функцию
export const getT = () => {
  const language = useLanguageStore.getState().language || 'ru'; 
  return translations[language];
};