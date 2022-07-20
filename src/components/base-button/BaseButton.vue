<template>
  <component
    :is="tag"
    class="base-button"
    :class="classes"
    :disabled="disabled"
    :tabindex="disabled ? -1 : tabindex"
    :href="tag === 'a' ? href : undefined"
    :type="tag === 'button' ? type : undefined"
    :target="tag === 'a' ? target : undefined"
    @click="onClick"
  >
    <span v-if="left" class="base-button__left-icon">
      <IconDisplay :name="left" monospace />
    </span>
    <span v-if="$slots.default" class="base-button__caption">
      <slot />
    </span>
    <span v-if="right" class="base-button__right-icon">
      <IconDisplay :name="right" monospace />
    </span>
  </component>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import IconDisplay from '../icon-display/IconDisplay.vue';

export interface BaseButtonProps {
  tag?: 'button' | 'a';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  theme?:
    | 'primary'
    | 'positive'
    | 'neutral'
    | 'negative'
    | 'white'
    | 'primary-dark'
    | 'transparent';
  size?: 'small' | 'normal' | 'large';
  textAlign?: 'left' | 'center';
  left?: string;
  right?: string;
  target?: string;
  disabled?: boolean;
  tabindex?: number;
}

/**
 * Renders a basic button or a-tag with support for icons, themes and sizes.
 */
export default defineComponent({
  name: 'BaseButton',
  components: {
    IconDisplay,
  },
  emits: ['click'],
  props: {
    /**
     * The HTML tag to be used.
     */
    tag: {
      type: String as PropType<'button' | 'a'>,
      default: 'button',
      validator: (value: string) => ['button', 'a'].includes(value),
    },
    /**
     * The href attribute – only applies when tag is set to `a`.
     */
    href: {
      type: String,
      default: null,
    },
    /**
     * The type of button – only applies when tag is set to `button`.
     */
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
      validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
    },
    /**
     * The global theme to be used. Can indicate the purpose of the button.
     */
    theme: {
      type: String as PropType<
        'primary' | 'positive' | 'neutral' | 'negative' | 'white' | 'primary-dark' | 'transparent'
      >,
      default: 'primary',
      validator: (value: string) =>
        [
          'primary',
          'positive',
          'neutral',
          'negative',
          'white',
          'primary-dark',
          'transparent',
        ].includes(value),
    },
    /**
     * The global size to be used.
     */
    size: {
      type: String as PropType<'small' | 'normal' | 'large'>,
      default: 'normal',
      validator: (value: string) => ['small', 'normal', 'large'].includes(value),
    },
    textAlign: {
      type: String as PropType<'left' | 'center'>,
      default: 'center',
      validator: (value: string) => ['left', 'center'].includes(value),
    },
    /**
     * The FontAwesome icon to be displayed left of the caption.
     */
    left: {
      type: String,
      default: '',
    },
    /**
     * The FontAwesome icon to be displayed right of the caption.
     */
    right: {
      type: String,
      default: '',
    },
    /**
     * The link target – only applies when tag is set to `a`.
     */
    target: {
      type: String,
      default: '_self',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    classes() {
      const classes = [
        `base-button--theme-${this.theme}`,
        `base-button--size-${this.size}`,
        `base-button--text-align-${this.textAlign}`,
      ];
      if (this.disabled) {
        classes.push('base-button--disabled');
      }
      return classes;
    },
  },
  methods: {
    onClick(event: MouseEvent) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      if (this.tag === 'button') {
        event.preventDefault();
      }
      this.$emit('click', event);
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/core';

.base-button {
  font-weight: 500;
  border: 0;
  border-radius: $border-radius;
  box-shadow: $shadow-normal;
  appearance: none;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;

  &:hover {
    outline: none;
    box-shadow: $shadow-hover;
  }

  &:focus {
    outline: none;
    box-shadow: $shadow-focus;
  }

  &.base-button--theme-primary:disabled,
  &.base-button--theme-primary.base-button--disabled,
  &.base-button--theme-positive:disabled,
  &.base-button--theme-positive.base-button--disabled,
  &.base-button--theme-neutral:disabled,
  &.base-button--theme-neutral.base-button--disabled,
  &.base-button--theme-negative:disabled,
  &.base-button--theme-negative.base-button--disabled,
  &.base-button--theme-white:disabled,
  &.base-button--theme-white.base-button--disabled,
  &.base-button--theme-primary-dark:disabled,
  &.base-button--theme-primary-dark.base-button--disabled {
    box-shadow: $shadow-normal !important;
    cursor: default;
    opacity: 0.35;
  }
  &.base-button--theme-transparent:disabled,
  &.base-button--theme-transparent.base-button--disabled {
    cursor: default;
    opacity: 0.35;
  }

  &.base-button--theme-primary {
    color: $theme-primary-text;
    background-color: $theme-primary-background;
    border: 1px solid $theme-primary-border;
  }

  &.base-button--theme-primary:hover {
    background-color: lighten($theme-primary-background, 10%);
    border-color: lighten($theme-primary-border, 10%);
  }

  &.base-button--theme-primary:focus {
    border-color: transparent;
  }

  &.base-button--theme-positive {
    color: $theme-positive-text;
    background-color: $theme-positive-background;
    border: 1px solid $theme-positive-border;
  }

  &.base-button--theme-positive:hover {
    background-color: lighten($theme-positive-background, 10%);
    border-color: lighten($theme-positive-border, 10%);
  }

  &.base-button--theme-positive:focus {
    border-color: transparent;
  }

  &.base-button--theme-neutral {
    color: $theme-neutral-text;
    background-color: $theme-neutral-background;
    border: 1px solid $theme-neutral-border;
  }

  &.base-button--theme-neutral:hover {
    background-color: lighten($theme-neutral-background, 2%);
    border-color: lighten($theme-neutral-border, 2%);
  }

  &.base-button--theme-neutral:focus {
    border-color: transparent;
  }

  &.base-button--theme-negative {
    color: $theme-negative-text;
    background-color: $theme-negative-background;
    border: 1px solid $theme-negative-border;
  }

  &.base-button--theme-negative:hover {
    background-color: lighten($theme-negative-background, 10%);
    border-color: lighten($theme-negative-border, 10%);
  }

  &.base-button--theme-negative:focus {
    border-color: transparent;
  }

  &.base-button--theme-white {
    color: $theme-white-text;
    background-color: $theme-white-background;
    border: 1px solid $theme-white-border;
  }

  &.base-button--theme-white:hover {
    background-color: lighten($theme-white-background, 10%);
    border-color: lighten($theme-white-border, 10%);
  }

  &.base-button--theme-white:focus {
    border-color: transparent;
  }

  &.base-button--theme-primary-dark {
    color: $theme-primary-dark-text;
    background-color: $theme-primary-dark-background;
    border: 1px solid $theme-primary-dark-border;
  }

  &.base-button--theme-primary-dark:hover,
  &.base-button--theme-primary-dark:focus {
    background-color: lighten($theme-primary-dark-background, 10%);
    border-color: lighten($theme-primary-dark-border, 10%);
  }

  &.base-button--theme-transparent {
    color: #4a5568;
    background-color: transparent;
    border: 1px solid transparent;
    box-shadow: none;
  }

  &.base-button--theme-transparent:hover {
    border-color: #d5d5d5;
    box-shadow: $shadow-hover;
  }

  &.base-button--theme-transparent:focus {
    box-shadow: $shadow-focus;
  }

  &.base-button--size-small {
    padding: 0.75em 1em;
    font-size: 0.875em;
  }

  &.base-button--size-normal {
    padding: 0.65em 0.875em;
    font-size: 1.15em;
  }

  &.base-button--size-large {
    padding: 0.65em 0.875em;
    font-size: 1.15em;
  }

  @media screen and (min-width: 50rem) {
    &.base-button--size-small {
      font-size: 1em;
    }

    &.base-button--size-normal {
      padding: 0.65em 0.875em;
      font-size: 1.25em;
    }

    &.base-button--size-large {
      padding: 0.875em 1.25em;
      font-size: 1.5em;
    }
  }

  &.base-button--text-align-center {
    justify-content: center;
  }

  &.base-button--text-align-left {
    justify-content: flex-start;
  }
}

@media (prefers-reduced-motion: no-preference), (update: fast) {
  .base-button {
    transition: all 0.2s ease-out;
  }
}

.base-button__left-icon {
  display: inline-block;
  margin-inline-end: 1em;
  color: inherit;
}

.base-button__right-icon {
  display: inline-block;
  margin-inline-start: 1em;
  color: inherit;
}

@media (min-width: 40em) {
  .base-button {
    font-size: 1.2em;
  }
}
</style>
