<template>
  <div>
    <button
      class="async-button"
      :class="classes"
      :disabled="disabledOrBusy"
      :tabindex="disabledOrBusy ? -1 : tabindex"
      :type="type"
      @click="onClick"
    >
      <span
        v-if="left || right"
        :class="['async-button__icon', `async-button__icon--${left ? 'left' : 'right'}`]"
      >
        <transition name="icon">
          <!-- Additional div needed because we cannot apply two animations to the same element -->
          <div class="icon" v-if="status === 'pending'">
            <Icon key="pending" ref="pending-icon" name="slash" monospace spinning />
          </div>
          <Icon
            key="success"
            ref="success-icon"
            v-else-if="status === 'success'"
            name="check"
            monospace
          />
          <Icon
            key="error"
            ref="error-icon"
            v-else-if="status === 'error'"
            name="times"
            monospace
          />
          <Icon key="icon" ref="icon" v-else :name="left ? left : right" monospace />
        </transition>
      </span>
      <span
        v-if="$slots.default"
        class="async-button__caption"
      >
        <slot />
      </span>
    </button>
    <Modal
      :visible="error !== null"
      :heading="$t('ui.async-button.error.heading')"
      icon="times"
      width="slim"
      :buttons="[{
        caption: this.$t('ui.async-button.error.okay-button'),
        theme: 'primary',
        eventName: 'close',
      }]"
      @close="error = null"
    >
      {{ error }}
    </Modal>
  </div>
</template>

<script lang="js">
import Icon from '../icon/Icon.vue';
import Modal from '../modal/Modal.vue';

/**
 * Renders a basic button with support for icons, themes and sizes. Will execute a given async
 * function on click, display a loading animation, indicate success or show an error message in a
 * modal.
 */
export default {
  name: 'AsyncButton',
  components: {
    Icon,
    Modal,
  },
  data() {
    return {
      status: 'idle',
      error: null,
      resetTimeout: null,
    };
  },
  props: {
    /**
     * The asynchronous function to execute when the button is clicked. Will trigger the loading
     * animation and wait for the promise to resolve.
     */
    action: {
      type: Function,
      required: true,
    },
    /**
     * The type of button.
     */
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value),
    },
    /**
     * The global theme to be used. Can indicate the purpose of the button.
     */
    theme: {
      type: String,
      default: 'primary',
      validator: (value) => [
        'primary', 'positive', 'neutral', 'negative', 'white', 'primary-dark', 'transparent',
      ].includes(value),
    },
    /**
     * The global size to be used.
     */
    size: {
      type: String,
      default: 'normal',
      validator: (value) => ['small', 'normal', 'large'].includes(value),
    },
    textAlign: {
      type: String,
      default: 'center',
      validator: (value) => ['left', 'center'].includes(value),
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
        `async-button--theme-${this.theme}`,
        `async-button--size-${this.size}`,
        `async-button--text-align-${this.textAlign}`,
      ];
      if (this.disabledOrBusy) {
        classes.push('async-button--disabled');
      }
      return classes;
    },
    disabledOrBusy() {
      return this.disabled || this.status === 'pending';
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
      this.status = 'pending';
      this.action().then(() => {
        this.status = 'success';
        this.scheduleStatusReset();
      }, (error) => {
        this.status = 'error';
        this.error = error.message;
        this.scheduleStatusReset();
      });
    },
    scheduleStatusReset(delay = 3000) {
      if (this.resetTimeout) {
        clearTimeout(this.resetTimeout);
      }
      this.resetTimeout = setTimeout(() => {
        this.status = 'idle';
      }, delay);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/core';

.async-button {
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

  &.async-button--theme-primary:disabled,
  &.async-button--theme-primary.async-button--disabled,
  &.async-button--theme-positive:disabled,
  &.async-button--theme-positive.async-button--disabled,
  &.async-button--theme-neutral:disabled,
  &.async-button--theme-neutral.async-button--disabled,
  &.async-button--theme-negative:disabled,
  &.async-button--theme-negative.async-button--disabled,
  &.async-button--theme-white:disabled,
  &.async-button--theme-white.async-button--disabled,
  &.async-button--theme-primary-dark:disabled,
  &.async-button--theme-primary-dark.async-button--disabled {
    box-shadow: $shadow-normal !important;
    cursor: default;
    opacity: 0.35;
  }
  &.async-button--theme-transparent:disabled,
  &.async-button--theme-transparent.async-button--disabled {
    cursor: default;
    opacity: 0.5;
  }

  &.async-button--theme-primary {
    color: $theme-primary-text;
    background-color: $theme-primary-background;
    border: 1px solid $theme-primary-border;
  }

  &.async-button--theme-primary:hover {
    background-color: lighten($theme-primary-background, 10%);
    border-color: lighten($theme-primary-border, 10%);
  }

  &.async-button--theme-primary:focus {
    border-color: transparent;
  }

  &.async-button--theme-positive {
    color: $theme-positive-text;
    background-color: $theme-positive-background;
    border: 1px solid $theme-positive-border;
  }

  &.async-button--theme-positive:hover {
    background-color: lighten($theme-positive-background, 10%);
    border-color: lighten($theme-positive-border, 10%);
  }

  &.async-button--theme-positive:focus {
    border-color: transparent;
  }

  &.async-button--theme-neutral {
    color: $theme-neutral-text;
    background-color: $theme-neutral-background;
    border: 1px solid $theme-neutral-border;
  }

  &.async-button--theme-neutral:hover {
    background-color: lighten($theme-neutral-background, 2%);
    border-color: lighten($theme-neutral-border, 2%);
  }

  &.async-button--theme-neutral:focus {
    border-color: transparent;
  }

  &.async-button--theme-negative {
    color: $theme-negative-text;
    background-color: $theme-negative-background;
    border: 1px solid $theme-negative-border;
  }

  &.async-button--theme-negative:hover {
    background-color: lighten($theme-negative-background, 10%);
    border-color: lighten($theme-negative-border, 10%);
  }

  &.async-button--theme-negative:focus {
    border-color: transparent;
  }

  &.async-button--theme-white {
    color: $theme-white-text;
    background-color: $theme-white-background;
    border: 1px solid $theme-white-border;
  }

  &.async-button--theme-white:hover {
    background-color: lighten($theme-white-background, 10%);
    border-color: lighten($theme-white-border, 10%);
  }

  &.async-button--theme-white:focus {
    border-color: transparent;
  }

  &.async-button--theme-primary-dark {
    color: $theme-primary-dark-text;
    background-color: $theme-primary-dark-background;
    border: 1px solid $theme-primary-dark-border;
  }

  &.async-button--theme-primary-dark:hover,
  &.async-button--theme-primary-dark:focus {
    background-color: lighten($theme-primary-dark-background, 10%);
    border-color: lighten($theme-primary-dark-border, 10%);
  }

  &.async-button--theme-transparent {
    color: #4a5568;
    background-color: transparent;
    border: 1px solid transparent;
    box-shadow: none;
  }

  &.async-button--theme-transparent:hover {
    border-color: #D5D5D5;
    box-shadow: $shadow-hover;
  }

  &.async-button--theme-transparent:focus {
    box-shadow: $shadow-focus;
  }

  &.async-button--size-small {
    padding: 0.75em 1em;
    font-size: 0.875em;
  }

  &.async-button--size-normal {
    padding: 0.65em 0.875em;
    font-size: 1.15em;
  }

  &.async-button--size-large {
    padding: 0.65em 0.875em;
    font-size: 1.15em;
  }

  @media screen and (min-width: 50rem) {
    &.async-button--size-small {
      font-size: 1em;
    }

    &.async-button--size-normal {
      padding: 0.65em 0.875em;
      font-size: 1.25em;
    }

    &.async-button--size-large {
      padding: 0.875em 1.25em;
      font-size: 1.5em;
    }
  }

  &.async-button--text-align-center {
    justify-content: center;
  }

  &.async-button--text-align-left {
    justify-content: flex-start;
  }
}

.async-button__icon {
  display: inline-block;
  color: inherit;
  width: 1.25em;
  height: 1em;
  position: relative;
  .icon {
    position: absolute;
    left: 0;
  }
}

.async-button__icon--left {
  margin-right: 1em;
}

.async-button__icon--right {
  margin-left: 1em;
  order: 2;
}

@media (min-width: 40em) {
  .async-button {
    font-size: 1.2em;
  }
}

@media (prefers-reduced-motion: no-preference), (update: fast) {
  .async-button {
    transition: all 0.2s ease-out;
  }
  .icon-enter-active {
    transition: all .55s ease-out;
  }
  .icon-enter {
    transform: translateX(1em);
    opacity: 0;
  }
  .icon-leave-active {
    transition: all .25s ease-out;
  }
  .icon-leave-to {
    transform: translateX(-1em);
    opacity: 0;
  }
}
</style>
