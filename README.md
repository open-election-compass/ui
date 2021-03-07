# OpenElectionCompass UI
> Collection of Vue.js components for the OpenElectionCompass web interfaces.

Components are documented using Storybook.
[📗 Live-Components and Docs](https://open-election-compass.github.io/ui/)

## Installation

Install the latest version of the OpenElectionCompass UI using your favourite package manager:

```
npm i @open-election-compass
```

### Import components and styling

```js
import '@open-election-compass/ui/dist/open-election-compass-ui.css';
import {
  AccordionList,
  AsyncButton,
  BaseButton,
  FieldInput,
  FieldSelect,
  FieldSwitch,
  FieldTextarea,
  Icon,
  Modal,
} from '@open-election-compass/ui';

// Install OpenElectionCompass UI
Vue.component('AccordionList', AccordionList);
Vue.component('AsyncButton', AsyncButton);
Vue.component('BaseButton', BaseButton);
Vue.component('FieldInput', FieldInput);
Vue.component('FieldSelect', FieldSelect);
Vue.component('FieldSwitch', FieldSwitch);
Vue.component('FieldTextarea', FieldTextarea);
Vue.component('Icon', Icon);
Vue.component('Modal', Modal);
```

OpenElectionCompass UI relies on common Vue.js packages you might have already installed in your
application. To allow for maximum flexibility, you have to provide these yourself:

### VeeValidate (v3 for Vue.js 2)

To use any of the Field components, you need to install [VeeValidate](https://vee-validate.logaretm.com/v3/)
and provide locales and rules of your choice:

```js
import { ValidationProvider, extend, localize } from 'vee-validate';
import {
  alpha, email, integer, length, max, min, regex, required,
} from 'vee-validate/dist/rules.umd';
import en from 'vee-validate/dist/locale/en.json';

// Configure VeeValidate
extend('alpha', alpha);
extend('email', email);
extend('integer', integer);
extend('length', length);
extend('max', max);
extend('min', min);
extend('regex', regex);
extend('required', required);

localize({ en });
localize('en');

Vue.component('ValidationProvider', ValidationProvider);
```

### VueI18n

[VueI18n](https://kazupon.github.io/vue-i18n/) allows some components come with their own
translations, e.g. FieldSelect adds a 'Please choose' option:

```js
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
```

### VScrollLock

The Modal component uses [VScrollLock](https://github.com/phegman/v-scroll-lock) to prevent
scrolling of the body in the background.

```js
import VScrollLock from 'v-scroll-lock';

Vue.use(VScrollLock);
```

### FontAwesome

Many components use icons from FontAwesome 5. You can add your own selection of icons to the list
or use a paid license. Make sure to include the icons listed here, though:

```js
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faAngleDown, faAngleLeft, faAngleRight, faAngleUp, faArrowRight, faBars, faCheck, faCircle, faChartBar, faExclamationCircle, faExternalLinkAlt, faFrown, faGrin, faLanguage, faMeh, faMehBlank, faMinus, faQuestion, faSlash, faSmile, faTimes, faUndo,
} from '@fortawesome/free-solid-svg-icons';

// Configure FontAwesome
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
library.add(
  faAngleDown, faAngleLeft, faAngleRight, faAngleUp, faArrowRight, faBars, faCheck, faCircle, faChartBar, faExclamationCircle, faExternalLinkAlt, faFrown, faGrin, faLanguage, faMeh, faMehBlank, faMinus, faQuestion, faSlash, faSmile, faTimes, faUndo,
);
```

## Development

We develop the components in this package in isolation using [Storybook](https://storybook.js.org/).

### Compile with HMR for development

```sh
npm run dev
```

### Compile and minify for production

```sh
npm run build
```

### Run your unit tests

```sh
npm run test
```

### Lint and fix files

```sh
npm run lint
```
