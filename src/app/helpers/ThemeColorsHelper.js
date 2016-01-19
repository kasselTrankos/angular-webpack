export default class ThemeColorsHelper {
  constructor($mdThemingProvider){

    $mdThemingProvider.definePalette('violet', {
      '50': '#ec71d4',
      '100': '#e22dc0',
      '200': '#be1a9e',
      '300': '#7f116a',
      '400': '#640e53',
      '500': '#490a3d',
      '600': '#2e0626',
      '700': '#130310',
      '800': '#000000',
      '900': '#000000',
      'A100': '#ec71d4',
      'A200': '#e22dc0',
      'A400': '#640e53',
      'A700': '#130310',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 A100'
    });

    $mdThemingProvider.definePalette('high-violet', {
      '50': '#fce0e9',
      '100': '#f49bba',
      '200': '#ee6897',
      '300': '#e7286b',
      '400': '#d9185c',
      '500': '#bd1550',
      '600': '#a11244',
      '700': '#860f39',
      '800': '#6a0c2d',
      '900': '#4f0921',
      'A100': '#fce0e9',
      'A200': '#f49bba',
      'A400': '#d9185c',
      'A700': '#860f39',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 A100 A200'
    });

    $mdThemingProvider.definePalette('orange', {
      '50': '#fffaf5',
      '100': '#fed7a9',
      '200': '#febe72',
      '300': '#fd9d2b',
      '400': '#fd8f0d',
      '500': '#e97f02',
      '600': '#cb6e02',
      '700': '#ac5e01',
      '800': '#8e4d01',
      '900': '#703d01',
      'A100': '#fffaf5',
      'A200': '#fed7a9',
      'A400': '#fd8f0d',
      'A700': '#ac5e01',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 500 A100 A200 A400'
    });

    $mdThemingProvider.definePalette('yellow', {
      '50': '#fffbe8',
      '100': '#ffed9c',
      '200': '#ffe264',
      '300': '#ffd51c',
      '400': '#fdce00',
      '500': '#deb500',
      '600': '#bf9c00',
      '700': '#a18300',
      '800': '#826a00',
      '900': '#645100',
      'A100': '#fffbe8',
      'A200': '#ffed9c',
      'A400': '#fdce00',
      'A700': '#a18300',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 500 600 A100 A200 A400'
    });

    $mdThemingProvider.definePalette('green', {
      '50': '#f1f8bb',
      '100': '#e3f275',
      '200': '#d8ed42',
      '300': '#bcd314',
      '400': '#a3b712',
      '500': '#8a9b0f',
      '600': '#717f0c',
      '700': '#58630a',
      '800': '#3f4707',
      '900': '#272b04',
      'A100': '#f1f8bb',
      'A200': '#e3f275',
      'A400': '#a3b712',
      'A700': '#58630a',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 500 A100 A200 A400'
    });

    $mdThemingProvider.theme('default')
    	.primaryPalette('green')
    	.accentPalette('high-violet');
      }
}
