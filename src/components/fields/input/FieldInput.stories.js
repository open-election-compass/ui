import FieldInput from './FieldInput.vue';

export default {
  title: 'Elements/Fields/FieldInput',
  component: FieldInput,
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
    type: {
      name: 'Type',
      control: {
        type: 'select',
        options: ['text', 'number', 'file'],
      },
    },
    value: {
      name: 'Value',
      control: { type: 'text' },
    },
    rules: {
      name: 'Rules',
      control: { type: 'text' },
    },
    placeholder: {
      name: 'Placeholder',
      control: { type: 'text' },
    },
    description: {
      name: 'Description',
      control: { type: 'text' },
    },
    autocomplete: {
      name: 'Autocomplete',
      control: { type: 'text' },
    },
    readonly: {
      name: 'Readonly',
      control: { type: 'boolean' },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FieldInput },
  template: '<FieldInput v-bind="$props" />',
});

export const Email = Template.bind({});
Email.args = {
  alias: 'email',
  name: 'E-mail',
  label: 'E-mail address',
  type: 'email',
  rules: 'required|email',
  placeholder: 'you@example.com',
};

export const File = Template.bind({});
File.args = {
  alias: 'avatar',
  name: 'Avatar',
  label: 'Avatar',
  type: 'file',
  rules: 'required',
  description: 'Your avatar should be a JPG or PNG.',
};

export const Number = Template.bind({});
Number.args = {
  alias: 'age',
  name: 'Age',
  label: 'Age',
  type: 'number',
  rules: 'integer|min:18',
  description: 'You have to be at least 18 years old.',
};

export const Password = Template.bind({});
Password.args = {
  alias: 'password',
  name: 'Password',
  label: 'Password',
  type: 'password',
  rules: 'required|min:8',
  description: 'At least 8 characters.',
};

export const Tel = Template.bind({});
Tel.args = {
  alias: 'telephone',
  name: 'Telephone',
  label: 'Telephone',
  type: 'tel',
  rules: 'required',
  placeholder: '+49',
};

export const Text = Template.bind({});
Text.args = {
  alias: 'first-name',
  name: 'First Name',
  label: 'First Name',
  type: 'text',
  rules: 'required',
  placeholder: 'Your first name',
};

export const Url = Template.bind({});
Url.args = {
  alias: 'website',
  name: 'Website',
  label: 'Website',
  type: 'url',
  rules: 'required',
  placeholder: 'https://',
};
