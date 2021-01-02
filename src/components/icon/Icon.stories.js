import Icon from './Icon.vue';

export default {
  title: 'Elements/Icon',
  component: Icon,
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
  components: { Icon },
  template: '<Icon v-bind="$props" />',
});

export const Check = Template.bind({});
Check.args = {
  name: 'check',
};
