import IconDisplay from './IconDisplay.vue';

export default {
  title: 'Elements/IconDisplay',
  component: IconDisplay,
  argTypes: {
    name: {
      name: 'Icon Name',
      control: 'text',
    },
    monospace: {
      name: 'Monospace',
      control: 'boolean',
      defaultValue: true,
    },
    spinning: {
      name: 'Spinning',
      control: 'boolean',
      defaultValue: false,
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { IconDisplay },
  template: '<IconDisplay v-bind="$props" />',
});

export const Check = Template.bind({});
Check.args = {
  name: 'check',
};
