import BaseButton from './BaseButton.vue';

export default {
  title: 'Elements/BaseButton',
  component: BaseButton,
  args: {
    caption: 'Button',
    target: '_self',
    disabled: false,
    tabIndex: 0,
  },
  argTypes: {
    caption: {
      name: 'Caption',
      control: 'text',
      description: 'The content of the default slot will be used for the caption of the Button.',
    },
    tag: {
      name: 'HTML Tag',
      control: 'radio',
      options: ['button', 'a'],
    },
    href: {
      name: 'Link',
      control: 'text',
    },
    type: {
      name: 'Button Type',
      control: 'radio',
      options: ['button', 'submit', 'reset']
    },
    theme: {
      name: 'Theme',
      control: 'select',
      options: [
        'primary',
        'positive',
        'neutral',
        'negative',
        'white',
        'primary-dark',
        'transparent',
      ],
    },
    size: {
      name: 'Size',
      control: 'radio',
      options: ['small', 'normal', 'large'],
    },
    textAlign: {
      name: 'Text Alignment',
      control: 'radio',
      options: ['left', 'center'],
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
    },
    disabled: {
      name: 'Disabled?',
      control: 'boolean',
    },
    tabindex: {
      name: 'Tab Index',
      control: {
        type: 'number',
        min: -1,
        step: 1,
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { BaseButton },
  template: '<BaseButton v-bind="args">{{ args.caption }}</BaseButton>',
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
