import FieldSwitch from './FieldSwitch.vue';

export default {
  title: 'Elements/Fields/FieldSwitch',
  component: FieldSwitch,
  argTypes: {
    alias: {
      name: 'Alias',
      control: { type: 'text' },
    },
    name: {
      name: 'Name',
      control: { type: 'text' },
    },
    label: {
      name: 'Label',
      control: { type: 'text' },
    },
    value: {
      name: 'Value',
      control: { type: 'text' },
    },
    options: {
      name: 'Options',
      control: {
        disable: true,
      },
    },
    rules: {
      name: 'Rules',
      control: { type: 'text' },
    },
    description: {
      name: 'Description',
      control: { type: 'text' },
    },
    readonly: {
      name: 'Readonly',
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { FieldSwitch },
  template: `
    <FieldSwitch
      v-bind="args"
      :options="[
        { option: 'female', value: 'f' },
        { option: 'diverse', value: 'd' },
        { option: 'male', value: 'm' },
      ]"
    />
  `,
});

export const Gender = Template.bind({});
Gender.args = {
  alias: 'gender',
  name: 'Gender',
  label: 'Gender',
  rules: 'required',
  value: '',
};
