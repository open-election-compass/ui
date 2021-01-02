import BaseButton from './BaseButton.vue';

export default {
  title: 'Elements/BaseButton',
  component: BaseButton,
  argTypes: {
    caption: {
      name: 'Caption',
      control: 'text',
      defaultValue: 'Button',
      description: 'The content of the default slot will be used for the caption of the Button.',
    },
    tag: {
      name: 'HTML Tag',
      control: { type: 'radio', options: ['button', 'a'] },
    },
    href: {
      name: 'Link',
      control: 'text',
      defaultValue: 'Button',
    },
    type: {
      name: 'Button Type',
      control: { type: 'radio', options: ['button', 'submit', 'reset'] },
    },
    theme: {
      name: 'Theme',
      control: {
        type: 'select',
        options: ['primary', 'positive', 'neutral', 'negative', 'white', 'primary-dark', 'transparent'],
      },
    },
    size: {
      name: 'Size',
      control: { type: 'radio', options: ['small', 'normal', 'large'] },
    },
    textAlign: {
      name: 'Text Alignment',
      control: { type: 'radio', options: ['left', 'center'] },
    },
    left: {
      name: 'Left Icon',
      control: 'text',
    },
    right: {
      name: 'Right Icon',
      control: 'text',
    },
    target: {
      name: 'Link Target',
      control: 'text',
      defaultValue: '_self',
    },
    disabled: {
      name: 'Disabled?',
      control: 'boolean',
      defaultValue: false,
    },
    tabindex: {
      name: 'Tab Index',
      control: {
        type: 'number',
        min: -1,
        step: 1,
      },
      defaultValue: 0,
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: '<BaseButton v-bind="$props">{{ $props.caption }}</BaseButton>',
});

export const Primary = Template.bind({});
Primary.args = {
  theme: 'primary',
};

export const Confirm = Template.bind({});
Confirm.args = {
  theme: 'positive',
  left: 'check',
};

export const Small = Template.bind({});
Small.args = {
  theme: 'neutral',
  size: 'small',
};
