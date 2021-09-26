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
        'field-select': true,
        'field-select--invalid': errors.length > 0,
        'field-select--valid': errors.length <= 0 && changed,
      }"
    >
      <label :for="alias" class="field-select__label">
        {{ label }}
      </label>
      <Icon name="angle-down" class="field-select__icon" />
      <select
        v-model="cache"
        @change="publish()"
        :name="alias"
        :id="`field-${alias}`"
        class="field-select__select"
        :readonly="readonly"
      >
        <option :value="null" disabled>{{ $t('ui.fields.select.choose') }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.option }}
        </option>
      </select>
      <small v-if="errors.length < 1" class="field-select__description">
        <slot name="description">{{ description }}</slot>
      </small>
      <small v-else class="field-select__error">{{ errors[0] }}</small>
    </div>
  </ValidationProvider>
</template>

<script>
import Icon from '../../icon/Icon.vue';
/**
 * Renders a select field together with a label, description and validation.
 */
export default {
  name: 'FieldSelect',
  components: {
    Icon,
  },
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
    readonly: {
      type: Boolean,
      default: false,
    },
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
