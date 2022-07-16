<template>
  <div
    :class="{
      'field-select': true,
      'field-select--invalid': field.errors.value.length > 0,
      'field-select--valid': field.errors.value.length <= 0 && field.meta.dirty,
    }"
  >
    <label :for="alias" class="field-select__label">
      {{ label }}
    </label>
    <IconDisplay name="angle-down" class="field-select__icon" />
    <select
      class="field-select__select"
      :name="alias"
      :id="`field-${alias}`"
      :readonly="readonly"
      v-model="field.value.value"
      @blur="field.handleBlur"
      @change="publish"
    >
      <option :value="null" disabled>{{ $t('ui.fields.select.choose') }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.option }}
      </option>
    </select>
    <small v-if="field.errors.value.length < 1" class="field-select__description">
      <slot name="description">{{ description }}</slot>
    </small>
    <small v-else class="field-select__error">{{ field.errors.value[0] }}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
import IconDisplay from '../../icon-display/IconDisplay.vue';
import { useField, type ValidationResult } from 'vee-validate';

/**
 * Renders a select field together with a label, description and validation.
 */
export default defineComponent({
  name: 'FieldSelect',
  components: {
    IconDisplay,
  },
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
        initialValue: props.value,
      }) as ReturnType<typeof useField>,
    };
  },
  watch: {
    value(value) {
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
    value: {
      type: String,
      required: true,
    },
    /**
     * An array of options in this form: `{ value: string, option: string }`.
     */
    options: {
      type: Array as () => { option: string; value: string }[],
      required: true,
    },
    /**
     * A set of vee-validate rules.
     */
    rules: {
      type: String,
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

.field-select {
  position: relative;
}

.field-select__label {
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease-out;
}

.field-select--invalid .field-select__label {
  color: $theme-negative-background;
}

.field-select__icon {
  position: absolute;
  color: $theme-neutral-text;
  margin-top: 1.25em;
  pointer-events: none;
  right: 1em;
}

.field-select__select {
  box-shadow: $shadow-normal;
  border-radius: $border-radius;
  transition: box-shadow 0.2s ease-out;
  appearance: none;
  background-color: $theme-neutral-background;
  color: $theme-neutral-text;
  border: 1px solid $theme-neutral-border;
  padding: 1em;
  cursor: pointer;
  transition: all 0.2s ease-out;
  display: block;
  width: 100%;
  &:hover {
    box-shadow: $shadow-hover;
  }
  &:focus {
    outline: 0;
    box-shadow: $shadow-focus;
  }
}

.field-select__description {
  display: block;
  margin-top: 0.5rem;
  font-style: italic;
  color: #999;
}

.field-select__error {
  display: inline-block;
  margin-top: 0.5em;
  border-radius: $border-radius;
  padding: 0.35em 0.5em;
  background-color: $theme-negative-background;
  color: $theme-negative-text;
}
</style>
