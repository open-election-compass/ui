import AccordionList from '../accordion-list/AccordionList.vue';
import Modal from './Modal.vue';

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
      defaultValue: 'check',
    },
    width: {
      name: 'Width',
      control: { type: 'radio', options: ['slim', 'narrow', 'normal', 'wide'] },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AccordionList, Modal },
  template: '<Modal v-bind="$props">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Modal>',
});

export const Slim = Template.bind({});
Slim.args = {
  width: 'slim',
};

export const WithAccordionList = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AccordionList, Modal },
  template: `
    <Modal v-bind="$props">
      <AccordionList
        v-bind="$props"
        :items="[
          { alias: 'first', caption: 'First' },
          { alias: 'second', caption: 'Second' },
          { alias: 'third', caption: 'Third' },
        ]"
      >
        <template v-slot:first>
          Nunc pretium nibh sit amet pellentesque ultricies. Pellentesque imperdiet, purus et imperdiet cursus, lorem arcu gravida nisi, ac pharetra nibh mi vitae tortor. Duis finibus tincidunt ligula vel hendrerit. Vivamus justo diam, aliquam sed iaculis a, mollis sit amet nunc. Maecenas eu scelerisque ipsum. Ut pharetra ullamcorper ex, eleifend semper neque tempor et. Vivamus vel arcu ultrices, sagittis velit eget, tincidunt velit.
        </template>
        <template v-slot:second>
          Nunc pretium nibh sit amet pellentesque ultricies. Pellentesque imperdiet, purus et imperdiet cursus, lorem arcu gravida nisi, ac pharetra nibh mi vitae tortor. Duis finibus tincidunt ligula vel hendrerit. Vivamus justo diam, aliquam sed iaculis a, mollis sit amet nunc. Maecenas eu scelerisque ipsum. Ut pharetra ullamcorper ex, eleifend semper neque tempor et. Vivamus vel arcu ultrices, sagittis velit eget, tincidunt velit.
        </template>
        <template v-slot:third>
          Nunc pretium nibh sit amet pellentesque ultricies. Pellentesque imperdiet, purus et imperdiet cursus, lorem arcu gravida nisi, ac pharetra nibh mi vitae tortor. Duis finibus tincidunt ligula vel hendrerit. Vivamus justo diam, aliquam sed iaculis a, mollis sit amet nunc. Maecenas eu scelerisque ipsum. Ut pharetra ullamcorper ex, eleifend semper neque tempor et. Vivamus vel arcu ultrices, sagittis velit eget, tincidunt velit.
        </template>
      </AccordionList>
    </Modal>
  `,
});
WithAccordionList.args = {
  noPadding: true,
};
