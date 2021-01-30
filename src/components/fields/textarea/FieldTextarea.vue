<template>
  <ValidationProvider :name="name" :rules="rules" v-slot="{ changed, errors }" ref="field">
    <div
      :class="{
        'field-textarea': true,
        'field-textarea--invalid': errors.length > 0,
        'field-textarea--valid': errors.length <= 0 && changed,
      }"
    >
      <label :for="alias" class="field-textarea__label">
        {{ label }}
      </label>
      <textarea
        v-model="cache"
        @blur="publish()"
        :name="alias"
        :id="`field-${alias}`"
        class="field-textarea__textarea"
        :placeholder="placeholder"
      />
      <small v-if="errors.length < 1" class="field-textarea__description">
        <slot name="description">{{ description }}</slot>
      </small>
      <small v-else class="field-textarea__error">{{ errors[0] }}</small>
    </div>
  </ValidationProvider>
</template>

<script lang="js">
import { ValidationProvider, extend } from 'vee-validate';

import { max, min, required } from 'vee-validate/dist/rules.umd';

extend('max', max);
extend('min', min);
extend('required', required);

/**
 * Renders a textarea together with a label, description and validation.
 */
export default {
  name: 'FieldTextarea',
  data() {
    return {
      cache: null,
      currentValidation: null,
    };
  },
  mounted() {
    this.cache = this.value;
  },
  watch: {
    value(value) {
      this.cache = value;
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
     * A set of vee-validate rules.
     */
    rules: {
      type: [String, Object],
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
  },
  methods: {
    publish() {
      this.currentValidation = this.$refs.field.validate(this.cache).then(({ valid }) => {
        this.currentValidation = null;
        if (valid) {
          this.$emit('change', this.cache.trim());
        } else {
          this.$emit('change', '');
        }
      });
    },
  },
  components: {
    ValidationProvider,
  },
};
</script>

<style lang="scss">
@import '~@/styles/core';

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
    color: #CCC;
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
