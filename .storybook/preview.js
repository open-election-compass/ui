import Vue from 'vue';

// VeeValidate
import { ValidationProvider, extend, localize } from 'vee-validate';
import {
  alpha, email, integer, length, max, min, oneOf, regex, required,
} from 'vee-validate/dist/rules.umd';
import en from 'vee-validate/dist/locale/en.json';

// VueI18n
import VueI18n from 'vue-i18n';
import deLocale from '../src/locales/de.yaml'
import enLocale from '../src/locales/en.yaml'

// VScrollLock
import VScrollLock from 'v-scroll-lock';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArrowRight,
  faBars,
  faCheck,
  faCircle,
  faChartBar,
  faExclamationCircle,
  faExternalLinkAlt,
  faFrown,
  faGrin,
  faLanguage,
  faMeh,
  faMehBlank,
  faMinus,
  faQuestion,
  faSlash,
  faSmile,
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';

// Framework styling
import '../src/styles/main.scss'
// import Icon from '../src/components/icon/Icon.vue'

// Vue.component('Icon', Icon)

// Configure VeeValidate
extend('alpha', alpha);
extend('email', email);
extend('integer', integer);
extend('length', length);
extend('max', max);
extend('min', min);
extend('oneOf', oneOf);
extend('regex', regex);
extend('required', required);

localize({ en });
localize('en');

Vue.component('ValidationProvider', ValidationProvider);

// Configure VueI18n
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    de: deLocale,
    en: enLocale,
  },
});

// This looks like it doesn't do anything, but I kept it since it would technically be the standard
// way to do this. What really did the trick though was the decorator.
Vue.extend({ i18n });

export const decorators = [(story) => ({
  components: { story },
  i18n,
  template: '<story />'
})];

// Configure VScrollLock
Vue.use(VScrollLock);

// Configure FontAwesome
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
library.add(
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArrowRight,
  faBars,
  faCheck,
  faCircle,
  faChartBar,
  faExclamationCircle,
  faExternalLinkAlt,
  faFrown,
  faGrin,
  faLanguage,
  faMeh,
  faMehBlank,
  faMinus,
  faQuestion,
  faSlash,
  faSmile,
  faTimes,
  faUndo,
);

// Configure Storybook
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}