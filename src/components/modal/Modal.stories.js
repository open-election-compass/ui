import VScrollLock from 'v-scroll-lock';
import Vue from 'vue';
import Modal from './Modal.vue';

Vue.use(VScrollLock);

export default {
  title: 'Elements/Modal',
  component: Modal,
  argTypes: {
    visible: {
      name: 'Visible?',
      control: 'boolean',
      defaultValue: false,
    },
    heading: {
      name: 'Heading',
      control: 'text',
      defaultValue: 'Lorem ipsum',
    },
    description: {
      name: 'Description',
      control: 'text',
      defaultValue: 'This is a demo of the Modal component.',
    },
    icon: {
      name: 'Icon',
      control: 'text',
      default: 'check',
    },
    width: {
      name: 'Width',
      control: { type: 'radio', options: ['slim', 'narrow', 'normal', 'wide'] },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal },
  template: '<Modal v-bind="$props">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Modal>',
});

export const Slim = Template.bind({});
Slim.args = {
  width: 'slim',
};
