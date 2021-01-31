<template>
  <ValidationProvider
    :name="name"
    :rules="rules"
    v-slot="{ changed, errors }"
    slim
    ref="field"
  >
    <div
      :class="{
        'field-switch': true,
        'field-switch--invalid': errors.length > 0,
        'field-switch--valid': errors.length <= 0 && changed,
      }"
    >
      <label :for="alias" class="field-switch__label">
        {{ label }}
      </label>
      <div class="field-switch__radio-group">
        <div
          v-for="button in options"
          :key="button.value"
          class="field-switch__radio-button"
        >
          <input
            v-model="cache"
            :name="alias"
            :value="button.value"
            :id="`field-${alias}-${button.value}`"
            class="field-switch__input"
            type="radio"
          />
          <label
            class="field-switch__button"
            :for="`field-${alias}-${button.value}`"
          >
            {{ button.option }}
          </label>
        </div>
      </div>
      <small v-if="errors.length < 1" class="field-switch__description">
        <slot name="description">{{ description }}</slot>
      </small>
      <small v-else class="field-switch__error">{{ errors[0] }}</small>
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate';

import { oneOf, required } from 'vee-validate/dist/rules.umd';

extend('oneOf', oneOf);
extend('required', required);

/**
 * Renders a radio group but in a switch-like design.
 */
export default {
  name: 'FieldSwitch',
  data() {
    return {
      cache: null,
      currentValidation: null,
    };
  },
  mounted() {
    this.cache = this.value || null;
  },
  watch: {
    value(value) {
      this.cache = value || null;
    },
    cache() {
      this.publish();
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    /**
     * The name of the field in kebab-case.
     */
    alias: {
      type: String,
      required: true,
    },
    /**
     * The human readable name of the field.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * The label above the field.
     */
    label: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
    /**
     * An array of options in this form: `{ value: string, option: string }`.
     */
    options: {
      type: Array,
      required: true,
    },
    /**
     * A set of vee-validate rules.
     */
    rules: {
      type: [String, Object],
      required: true,
    },
    /**
     * The description below the field.
     */
    description: {
      type: String,
      default: '',
    },
  },
  components: {
    ValidationProvider,
  },
  methods: {
    publish() {
      this.currentValidation = this.$refs.field.validate(this.cache).then(({ valid }) => {
        this.currentValidation = null;
        if (valid) {
          this.$emit('change', this.cache);
        } else {
          this.$emit('change', '');
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/core';

.field-switch__label {
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease-out;
}

.field-switch--invalid .field-switch__label {
  color: $theme-negative-background;
}

.field-switch__radio-group {
  box-shadow: $shadow-normal;
  border-radius: $border-radius;
  transition: box-shadow 0.2s ease-out;
  &:hover {
    box-shadow: $shadow-hover;
  }
  &:focus-within {
    box-shadow: $shadow-focus;
  }
}

.field-switch__input {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  &:checked + .field-switch__button {
    background-color: $theme-primary-background;
    color: $theme-primary-text;
    border-left-color: $theme-primary-border;
    border-right-color: $theme-primary-border;
  }
}

.field-switch__button {
  display: block;
  padding: 1em;
  margin: 0;
  cursor: pointer;
  background-color: $theme-neutral-background;
  color: $theme-neutral-text;
  border: 1px solid $theme-neutral-border;
  text-align: center;
  transition: all 0.2s ease-out;
  &:hover, &:focus {
    filter: brightness(1.025);
  }
}

.field-switch__radio-button {
  &:first-child {
    .field-switch__input:checked + .field-switch__button {
      border-top-color: $theme-primary-border;
    }
    .field-switch__button {
      border-radius: $border-radius $border-radius 0 0 ;
    }
  }
  &:last-child {
    .field-switch__input:checked + .field-switch__button {
      border-bottom-color: $theme-primary-border;
    }
    .field-switch__button {
      border-radius: 0 0 $border-radius $border-radius;
    }
  }
  & + & .field-switch__button {
    border-top: 0;
  }
}

.field-switch__description {
  display: block;
  margin-top: 0.5rem;
  font-style: italic;
  color: #999;
}

.field-switch__error {
  display: inline-block;
  margin-top: 0.5em;
  border-radius: $border-radius;
  padding: 0.35em 0.5em;
  background-color: $theme-negative-background;
  color: $theme-negative-text;
}
</style>
