<template>
  <transition name="fade" :duration="{ enter: 300, leave: 200 }">
    <div
      v-if="visible"
      class="modal"
      :class="classes"
      role="dialog"
      aria-labelledby="modal__heading"
      aria-describedby="modal__description"
    >
      <div class="modal__wrapper">
        <div class="modal__overlay" @click="$emit('close')" />
        <div class="modal__box">
          <div class="modal__header" v-if="heading">
            <IconDisplay v-if="icon" :name="icon" class="modal__icon" :spin="icon === 'slash'" />
            <h1 class="modal__heading">
              {{ heading }}
            </h1>
            <p v-if="description" class="modal__description">
              {{ description }}
            </p>
          </div>
          <div v-if="$slots.default" ref="content" class="modal__content">
            <slot />
          </div>
          <div class="modal__actions">
            <BaseButton
              v-for="button in buttons || defaultButton"
              :key="button.eventName"
              v-bind="button"
              class="modal__action"
              @click="button.eventName ? $emit(button.eventName) : () => {}"
            >
              {{ button.caption }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue';
import { useScrollLock } from '@vueuse/core';
import BaseButton, { type BaseButtonProps } from '../base-button/BaseButton.vue';
import IconDisplay from '../icon-display/IconDisplay.vue';

export interface BaseButtonPropsHelper extends BaseButtonProps {
  caption: string;
  eventName: string;
}

/**
 * Wraps content in a modal that can be hidden and shown programmatically.
 */
export default defineComponent({
  name: 'ModalView',
  // TODO: emits: ['close'],
  components: {
    BaseButton,
    IconDisplay,
  },
  setup() {
    const content = ref<HTMLElement | null>(null);
    return {
      isLocked: useScrollLock(content),
    };
  },
  props: {
    /**
     * Wether the modal is visible.
     */
    visible: {
      type: Boolean,
      default: true,
    },

    /**
     * The heading of the modal.
     */
    heading: {
      type: String,
      required: true,
    },

    /**
     * The description of the modal, appearing below the heading.
     */
    description: {
      type: String,
    },

    /**
     * An array of actions (buttons) that appear below the modals content. By default, contains a
     * simple done-button that emits the close-event.
     */
    buttons: {
      type: Array as () => (BaseButtonProps & { eventName: string; caption: string })[],
      default: null,
    },

    /**
     * An icon shown above the modal's heading.
     */
    icon: {
      type: String as PropType<string | null>,
      default: null,
    },

    /**
     * The width of the modal.
     */
    width: {
      type: String as PropType<'slim' | 'narrow' | 'normal' | 'wide'>,
      default: 'normal',
      validator: (value: string) => ['slim', 'narrow', 'normal', 'wide'].includes(value),
    },

    /**
     * Don't add padding to the modal content.
     */
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$watch('visible', (visible: boolean) => {
      this.isLocked = visible;
    });
  },
  computed: {
    classes(): string[] {
      const classes = [`modal--width-${this.width}`];
      if (this.noPadding) {
        classes.push('modal--no-padding');
      }
      return classes;
    },
    defaultButton(): Partial<BaseButtonPropsHelper>[] {
      return [
        {
          caption: this.$t('ui.modal.done') as string,
          theme: 'primary',
          eventName: 'close',
        },
      ];
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/core';

.modal {
  &__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 400;
    padding: 1rem;
  }

  &__overlay {
    background-color: rgba(#fff, 0.75);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__box {
    position: relative;
    z-index: 30;
    height: auto;
    max-height: 90vh;
    width: 100%;
    max-width: 24rem;
    background-color: #fff;
    border-radius: $border-radius;
    box-shadow: 0 2rem 8rem 0 rgba(#000, 0.25);
    color: $theme-base-text;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
  &.modal--width-slim .modal__box {
    max-width: 24rem;
  }
  &.modal--width-narrow .modal__box {
    max-width: 40rem;
  }
  &.modal--width-normal .modal__box {
    max-width: 60rem;
  }
  &.modal--width-wide .modal__box {
    max-width: 90rem;
  }

  &__header {
    padding: 1rem;
    text-align: center;
    flex: 1 0 auto;
  }

  &__icon {
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-right: 0.5em;
  }

  &__heading {
    display: inline-block;
    font-size: 1.5rem;
    margin: 1rem 0 0 0;
  }

  &__description {
    max-width: 40rem;
    margin: 1rem auto;
  }

  &__content {
    overflow-y: auto;
    padding: 1rem;
    flex: 1;
    border-bottom: 2px solid $theme-base-border;
  }
  &.modal--no-padding .modal__content {
    padding: 0;
    .accordion-list details:first-of-type,
    .accordion-list details:last-of-type {
      border-radius: 0;
    }
  }

  &__actions {
    overflow: hidden;
    padding: 1em;
    flex-shrink: 0;
  }

  &__action {
    width: 100%;
    & + & {
      margin-top: 0.5em;
    }
  }
}

@media (min-width: 40rem) {
  .modal__icon {
    font-size: 2rem;
    margin-right: 0;
  }

  .modal__heading {
    display: block;
    font-size: 2rem;
  }

  .modal__header {
    padding: 2rem;
  }

  .modal__content {
    padding: 2rem;
  }

  .modal__actions {
    padding: 2em;
  }

  .modal__action + .modal__action {
    margin-top: 1em;
  }
}

@media (min-width: 60rem) {
  .modal__actions {
    padding: 0 0.5em;
    text-align: right;
  }
  .modal__action {
    width: auto;
    display: inline-block;
    margin: 1em 0.5em;
    text-align: left;
    & + & {
      margin-top: 0;
    }
  }

  .modal__header {
    padding: 2rem 2rem 1rem 2rem;
  }

  .modal__content {
    padding: 2rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  .modal__overlay {
    transition: opacity 0.3s ease-out;
  }
  .modal__box {
    transition: opacity 0.15s ease-out, transform 0.3s ease-out;
  }
}

.fade-enter,
.fade-leave-to {
  .modal__overlay {
    opacity: 0;
  }
  .modal__box {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
