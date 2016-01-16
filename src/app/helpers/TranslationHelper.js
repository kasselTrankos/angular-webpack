export default class TranslationHelper {
  constructor($translateProvider){
    console.log($translateProvider, 'lo popdiemo');

    $translateProvider.useStaticFilesLoader({
      prefix: '/assets/i18n/locale-',
      suffix: '.json'
    })
    .registerAvailableLanguageKeys(['es', 'en'], {
      'es_ES': 'es',
      'en_US': 'en',
      'en_UK': 'en'
    })
    .useSanitizeValueStrategy('sanitize')
    .preferredLanguage('es');

    // $translationProvider.defaultLanguage("es");
  }
}
