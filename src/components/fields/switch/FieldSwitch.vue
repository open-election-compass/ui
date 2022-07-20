<template>
  <div
    :class="{
      'field-switch': true,
      'field-switch--invalid': field.errors.value.length > 0,
      'field-switch--valid': field.errors.value.length <= 0 && field.meta.dirty,
    }"
  >
    <label :for="alias" class="field-switch__label">
      {{ label }}
    </label>
    <div class="field-switch__radio-group">
      <div v-for="button in options" :key="button.value" class="field-switch__radio-button">
        <input
          class="field-switch__input"
          type="radio"
          :name="alias"
          :id="`field-${alias}-${button.value}`"
          :value="button.value"
          :readonly="readonly"
          v-model="field.value.value"
          @change="publish"
        />
        <label class="field-switch__button" :for="`field-${alias}-${button.value}`">
          {{ button.option }}
        </label>
      </div>
    </div>
    <small v-if="field.errors.value.length < 1" class="field-switch__description">
      <slot name="description">{{ description }}</slot>
    </small>
    <small v-else class="field-switch__error">{{ field.errors.value[0] }}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, type PropType } from 'vue';
import { useField, type ValidationResult } from 'vee-validate';

/**
 * Renders a radio group but in a switch-like design.
 */
export default defineComponent({
  name: 'FieldSwitch',
  data() {
    return {
      currentValidation: null as null | Promise<void | ValidationResult>,
    };
  },
  emits: ['update:value'],
  setup(props) {
    // Create Ref on alias. This is important because vee-validate needs to know if the field name
    // changes.
    const alias = toRef(props, 'alias');
    const name = toRef(props, 'name');

    // Create Field
    return {
      field: useField<string>(alias, props.rules, {
        label: name,
        type: 'radio',
        initialValue: props.value,
      }),
    };
  },
  watch: {
    value(value: string): void {
      this.field?.setValue(value);
    },
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
      type: String,
      default: null,
    },
    /**
     * An array of options in this form: `{ value: string, option: string }`.
     */
    options: {
      type: Array as () => { value: string; option: string }[],
      required: true,
    },
    /**
     * A set of vee-validate rules.
     */
    rules: {
      type: [String, Object] as PropType<string | Record<string, unknown>>,
      required: true,
    },
    /**
     * The description below the field.
     */
    description: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    publish(): void {
      this.currentValidation = this.field.validate().then((result: ValidationResult) => {
        this.currentValidation = null;
        if (result.valid && this.field.value.value !== null) {
          this.$emit('update:value', this.field.value.value);
        } else {
          this.$emit('update:value', '');
        }
      });
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/core';

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
  &:hover,
  &:focus {
    filter: brightness(1.025);
  }
}

.field-switch__radio-button {
  &:first-child {
    .field-switch__input:checked + .field-switch__button {
      border-top-color: $theme-primary-border;
    }
    .field-switch__button {
      border-radius: $border-radius $border-radius 0 0;
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
