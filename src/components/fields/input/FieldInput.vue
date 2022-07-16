<template>
  <div
    :class="{
      'field-input': true,
      'field-input--invalid': field.errors.value.length > 0,
      'field-input--valid': field.errors.value.length <= 0 && field.meta.dirty,
    }"
  >
    <label :for="alias" class="field-input__label">
      {{ label }}
    </label>
    <input
      class="field-input__input"
      :type="type"
      :name="alias"
      :id="`field-${alias}`"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :readonly="readonly"
      v-model="field.value.value"
      @blur="publish"
      @change="field.handleChange"
    />
    <small v-if="field.errors.value.length < 1" class="field-input__description">
      <slot name="description">{{ description }}</slot>
    </small>
    <small v-else class="field-input__error">{{ field.errors.value[0] }}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, toRef } from 'vue';
import { useField, type ValidationResult } from 'vee-validate';

/**
 * Renders a textual input field, like text, email, number, etc. together with a label, description
 * and validation.
 */
export default defineComponent({
  name: 'FieldInput',
  data() {
    return {
      currentValidation: null as null | Promise<void | ValidationResult>,
    };
  },
  emits: ['change'],
  setup(props) {
    // Create Ref on alias. This is important because vee-validate needs to know if the field name
    // changes.
    const alias = toRef(props, 'alias');
    const name = toRef(props, 'name');

    // Create Field
    return {
      field: useField<string>(alias, props.rules, {
        label: name,
        type: props.type,
        initialValue: props.value,
      }) as ReturnType<typeof useField>,
    };
  },
  watch: {
    value(value: string): void {
      this.field.setValue(value);
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
    /**
     * The input type.
     */
    type: {
      type: String as PropType<'email' | 'file' | 'number' | 'password' | 'tel' | 'text' | 'url'>,
      required: true,
      validator: (value: string) => {
        return ['email', 'file', 'number', 'password', 'tel', 'text', 'url'].includes(value);
      },
    },
    value: {
      type: String,
      required: true,
    },
    /**
     * A set of vee-validate rules.
     */
    rules: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * The description below the field.
     */
    description: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    publish(): void {
      this.field.handleBlur();
      this.currentValidation = this.field.validate().then((result: ValidationResult) => {
        this.currentValidation = null;
        if (result.valid && this.field.value.value !== null) {
          this.$emit('change', this.field.value.value);
        } else {
          this.$emit('change', '');
        }
      });
    },
  },
});
</script>

<style lang="scss">
@import '@/styles/core';

.field-input__label {
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease-out;
}

.field-input--invalid .field-input__label {
  color: $theme-negative-background;
}

.field-input__input {
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid #ddd;
  display: block;
  font-size: 1.4rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease-out;
  &:hover {
    border-color: $theme-neutral-border;
  }
  &:focus {
    outline: none;
    border-color: #999;
  }
  &::placeholder {
    font-style: italic;
    color: #ccc;
  }
}

.field-input--invalid .field-input__input {
  border-color: $theme-negative-border;
}

.field-input__description {
  display: inline-block;
  margin-top: 0.5em;
  font-style: italic;
  color: #999;
}

.field-input__error {
  display: inline-block;
  margin-top: 0.5em;
  border-radius: $border-radius;
  padding: 0.35em 0.5em;
  background-color: $theme-negative-background;
  color: $theme-negative-text;
}
</style>
