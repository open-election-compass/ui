import FieldTextarea from './FieldTextarea.vue';

export default {
  title: 'Elements/Fields/FieldTextarea',
  component: FieldTextarea,
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
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FieldTextarea },
  template: '<FieldTextarea v-bind="$props" />',
});

export const Message = Template.bind({});
Message.args = {
  alias: 'message',
  name: 'Message',
  label: 'Message',
  rules: 'required|min:10',
  placeholder: 'Enter your message...',
};
