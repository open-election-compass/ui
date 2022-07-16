import AsyncButton from './AsyncButton.vue';

export default {
  title: 'Elements/AsyncButton',
  component: AsyncButton,
  argTypes: {
    caption: {
      name: 'Caption',
      control: 'text',
      defaultValue: 'Button',
      description: 'The content of the default slot will be used for the caption of the Button.',
    },
    type: {
      name: 'Button Type',
      control: { type: 'radio', options: ['button', 'submit', 'reset'] },
    },
    theme: {
      name: 'Theme',
      control: {
        type: 'select',
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
  components: { AsyncButton },
  template: '<AsyncButton v-bind="$props">{{ $props.caption }}</AsyncButton>',
});

export const Successful = Template.bind({});
Successful.args = {
  theme: 'primary',
  right: 'angle-right',
  action: () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    }),
};

export const Unsuccessful = Template.bind({});
Unsuccessful.args = {
  theme: 'primary',
  right: 'angle-right',
  action: () =>
    new Promise((resolve, reject) => {
      setTimeout(
        () =>
          reject(
            new Error(
              'Something went wrong. This error message was returned by the async function passed to the action-property.'
            )
          ),
        2000
      );
    }),
};
