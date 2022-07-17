import FieldSelect from './FieldSelect.vue';

export default {
  title: 'Elements/Fields/FieldSelect',
  component: FieldSelect,
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
  components: { FieldSelect },
  template: `
    <FieldSelect
      v-bind="args"
      :options="[
        { option: 'Christopher Eccleston', value: '9' },
        { option: 'David Tennant', value: '10' },
        { option: 'Matt Smith', value: '11' },
        { option: 'Peter Capaldi', value: '12' },
        { option: 'Jodie Whittaker', value: '13' },
      ]"
    />
  `,
});

export const Doctors = Template.bind({});
Doctors.args = {
  alias: 'doctors',
  name: 'Doctor',
  label: 'Bowties are cool?',
  rules: 'required|one_of:11',
  value: '',
};
