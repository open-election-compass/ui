import IconDisplay from './IconDisplay.vue';

export default {
  title: 'Elements/IconDisplay',
  component: IconDisplay,
  args: {
    monospace: true,
    spinning: false,
  },
  argTypes: {
    name: {
      name: 'Icon Name',
      control: 'text',
    },
    monospace: {
      name: 'Monospace',
      control: 'boolean',
    },
    spinning: {
      name: 'Spinning',
      control: 'boolean',
    },
  },
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { IconDisplay },
  template: '<IconDisplay v-bind="args" />',
});

export const Check = Template.bind({});
Check.args = {
  name: 'check',
};
