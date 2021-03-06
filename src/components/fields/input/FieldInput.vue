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
        'field-input': true,
        'field-input--invalid': errors.length > 0,
        'field-input--valid': errors.length <= 0 && changed,
      }"
    >
      <label :for="alias" class="field-input__label">
        {{ label }}
      </label>
      <input
        v-model="cache"
        @blur="publish()"
        :type="type"
        :name="alias"
        :id="`field-${alias}`"
        class="field-input__input"
        :placeholder="placeholder"
      />
      <small v-if="errors.length < 1" class="field-input__description">
        <slot name="description">{{ description }}</slot>
      </small>
      <small v-else class="field-input__error">{{ errors[0] }}</small>
    </div>
  </ValidationProvider>
</template>

<script lang="js">
/**
 * Renders a textual input field, like text, email, number, etc. together with a label, description
 * and validation.
 */
export default {
  name: 'FieldInput',
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
    /**
     * The input type.
     */
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['email', 'file', 'number', 'password', 'tel', 'text', 'url'].includes(value);
      },
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
};
</script>

<style lang="scss">
@import '~@/styles/core';

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
    color: #CCC;
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
