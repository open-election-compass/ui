import AsyncButton from './AsyncButton.vue';

export default {
  title: 'Elements/AsyncButton',
  component: AsyncButton,
  args: {
    caption: 'Button',
    disabled: false,
    tabindex: 0,
  },
  argTypes: {
    caption: {
      name: 'Caption',
      control: 'text',
      description: 'The content of the default slot will be used for the caption of the Button.',
    },
    type: {
      name: 'Button Type',
      control: 'radio',
      options: ['button', 'submit', 'reset'],
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
  components: { AsyncButton },
  template: '<AsyncButton v-bind="args">{{ args.caption }}</AsyncButton>',
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
