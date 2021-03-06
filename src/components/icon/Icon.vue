<template>
  <FontAwesomeIcon
    :icon="['fas', name]"
    class="icon"
    :fixed-width="monospace"
    :spin="spinning" />
</template>

<script>
/**
 * A simple icon component to display free FontAwesome 5 icons.
 */
export default {
  name: 'Icon',
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
