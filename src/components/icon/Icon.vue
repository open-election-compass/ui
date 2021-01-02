<template>
  <font-awesome-icon
    :icon="['fas', name]"
    class="icon"
    :fixed-width="monospace"
    :spin="spinning" />
</template>

<script>
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

/**
 * A simple icon component to display free FontAwesome 5 icons.
 */
export default {
  name: 'Icon',
  components: {
    FontAwesomeIcon,
  },
  props: {
    /**
     * The FontAwesome icon identifier (snake-case) to be used.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Wether the width should be the same for all icons or individual.
     */
    monospace: {
      type: Boolean,
      default: true,
    },
    /**
     * Make the icon spin constantly.
     */
    spinning: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
