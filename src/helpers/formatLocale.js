export function formatLocale(locale) {
    const localeDict = {
        'en-US': 'English',
        'es': 'Español',
        'it-IT': 'Italiano',
        'fr-FR': 'Français',
        'pt-PT': 'Português',
        'cs-CZ': 'Czech'
    };

    return localeDict[locale] || 'English';
}