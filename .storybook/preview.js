import { app } from '@storybook/vue3';

// VeeValidate
import { configure, defineRule } from 'vee-validate';
import {
  alpha,
  email,
  integer,
  length,
  max,
  min,
  one_of,
  regex,
  required,
} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

// VueI18n
import { createI18n } from 'vue-i18n';
import deLocale from '../src/locales/de.yaml';
import enLocale from '../src/locales/en.yaml';

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
import '../src/styles/main.scss';
// import Icon from '../src/components/icon/Icon.vue'

// app.component('Icon', Icon)

// Configure VeeValidate
defineRule('alpha', alpha);
defineRule('email', email);
defineRule('integer', integer);
defineRule('length', length);
defineRule('max', max);
defineRule('min', min);
defineRule('one_of', one_of);
defineRule('regex', regex);
defineRule('required', required);

configure({
  generateMessage: localize('en'),
});

// Configure VueI18n
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    de: deLocale,
    en: enLocale,
  },
});

app.use(i18n);

export const decorators = [
  (story) => ({
    components: { story },
    i18n,
    template: '<story />',
  }),
];

// Configure FontAwesome
app.component('FontAwesomeIcon', FontAwesomeIcon);
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
  faUndo
);

// Configure Storybook
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
