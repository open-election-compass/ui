<template>
  <div
    :class="{
      'field-textarea': true,
      'field-textarea--invalid': field.errors.value.length > 0,
      'field-textarea--valid': field.errors.value.length <= 0 && field.meta.dirty,
    }"
  >
    <label :for="alias" class="field-textarea__label">
      {{ label }}
    </label>
    <textarea
      class="field-textarea__textarea"
      :name="alias"
      :id="`field-${alias}`"
      :placeholder="placeholder"
      :readonly="readonly"
      v-model="field.value.value"
      @blur="publish"
      @change="field.handleChange"
    />
    <small v-if="field.errors.value.length < 1" class="field-textarea__description">
      <slot name="description">{{ description }}</slot>
    </small>
    <small v-else class="field-textarea__error">{{ field.errors.value[0] }}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, type PropType } from 'vue';
import { useField, type ValidationResult } from 'vee-validate';

/**
 * Renders a textarea together with a label, description and validation.
 */
export default defineComponent({
  name: 'FieldTextarea',
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
        initialValue: props.value,
      }),
    };
  },
  watch: {
    value(value: string): void {
      this.field.setValue(value);
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
     * A set of vee-validate rules.
     */
    rules: {
      type: [String, Object] as PropType<string | Record<string, unknown>>,
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

.field-textarea__label {
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease-out;
}

.field-textarea--invalid .field-textarea__label {
  color: $theme-negative-background;
}

.field-textarea__textarea {
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

.field-textarea--invalid .field-textarea__textarea {
  border-color: $theme-negative-border;
}

.field-textarea__description {
  display: inline-block;
  margin-top: 0.5em;
  font-style: italic;
  color: #999;
}

.field-textarea__error {
  display: inline-block;
  margin-top: 0.5em;
  border-radius: $border-radius;
  padding: 0.35em 0.5em;
  background-color: $theme-negative-background;
  color: $theme-negative-text;
}
</style>
