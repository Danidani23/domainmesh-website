// i18n utility — loads translations and provides t() function
export const languages = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    it: 'Italiano',
    es: 'Español',
    pt: 'Português',
    hu: 'Magyar',
    pl: 'Polski',
    uk: 'Українська',
    ru: 'Русский',
    tr: 'Türkçe',
    ar: 'العربية',
    ja: '日本語',
    ko: '한국어',
    zh: '中文',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

// Import all translation files
import en from './en.json';
import de from './de.json';
import fr from './fr.json';
import it from './it.json';
import es from './es.json';
import pt from './pt.json';
import hu from './hu.json';
import pl from './pl.json';
import uk from './uk.json';
import ru from './ru.json';
import tr from './tr.json';
import ar from './ar.json';
import ja from './ja.json';
import ko from './ko.json';
import zh from './zh.json';

const translations: Record<Lang, Record<string, string>> = {
    en, de, fr, it, es, pt, hu, pl, uk, ru, tr, ar, ja, ko, zh,
};

export function t(lang: Lang, key: string): string {
    return translations[lang]?.[key] ?? translations[defaultLang]?.[key] ?? key;
}

export function getLangFromUrl(url: URL): Lang {
    const [, langSegment] = url.pathname.split('/');
    if (langSegment && langSegment in languages) {
        return langSegment as Lang;
    }
    return defaultLang;
}

export function getLocalizedPath(lang: Lang, path: string): string {
    return `/${lang}${path.startsWith('/') ? path : '/' + path}`;
}
