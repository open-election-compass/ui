<template>
  <div class="accordion-list">
    <details
      v-for="(item, index) in items"
      :key="item.alias"
      class="accordion-list__item"
      :open="openFirst && index === 0"
    >
      <summary>{{ item.caption }}</summary>
      <slot :name="item.alias" />
    </details>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Renders an accordion using the elements details and summary.
 */
export default defineComponent({
  name: 'AccordionList',
  props: {
    /**
     * List of items, each with an alias used for the slot name and a caption used for the summary.
     */
    items: {
      type: Array as () => { alias: string; caption: string }[],
      required: true,
    },

    /**
     * Wether to open the first item in the list by default.
     */
    openFirst: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/core';

.accordion-list {
  details {
    background: $theme-neutral-background;
    color: $theme-neutral-text;
    overflow: hidden;
    & + details {
      border-top: 2px solid $theme-neutral-border;
    }
    &:first-of-type {
      border-radius: $border-radius $border-radius 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 $border-radius $border-radius;
    }
    &[open] {
      padding: 0 1rem 1rem 1rem;
      summary {
        margin: 0 -1rem;
      }
    }
  }
  summary {
    font-weight: bold;
    padding: 1em;
    cursor: pointer;
    user-select: none;
    &:hover,
    &:focus {
      outline: 0;
      text-decoration: underline;
    }
  }
}

@media (min-width: 40rem) {
  .accordion-list {
    details {
      &[open] {
        padding: 0 2rem 2rem 2rem;
        summary {
          margin: 0 -2rem;
        }
      }
    }
    summary {
      padding: 2em;
    }
  }
}
</style>
