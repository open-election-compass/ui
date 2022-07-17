import AccordionList from '../accordion-list/AccordionList.vue';
import ModalView from './ModalView.vue';

export default {
  title: 'Elements/ModalView',
  component: ModalView,
  args: {
    visible: true,
    heading: 'Lorem ipsum',
    description: 'This is a demo of the Modal component.',
    icon: 'check',
    noPadding: false,
  },
  argTypes: {
    visible: {
      name: 'Visible?',
      control: 'boolean',
    },
    heading: {
      name: 'Heading',
      control: 'text',
    },
    description: {
      name: 'Description',
      control: 'text',
    },
    icon: {
      name: 'Icon',
      control: 'text',
    },
    width: {
      name: 'Width',
      control: 'radio',
      options: ['slim', 'narrow', 'normal', 'wide'],
    },
    buttons: {
      name: 'Buttons',
    },
    noPadding: {
      name: 'No Padding',
      control: 'boolean',
      description: "Don't add padding to the modal content.",
    },
  },
};

const Template = (args) => ({
  components: { AccordionList, ModalView },
  setup() {
    return { args };
  },
  template:
    '<ModalView v-bind="args">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</ModalView>',
});

export const Slim = Template.bind({});
Slim.args = {
  width: 'slim',
};

export const WithAccordionList = (args) => ({
  components: { AccordionList, ModalView },
  setup() {
    return { args };
  },
  template: `
    <ModalView v-bind="args">
      <AccordionList
        v-bind="args"
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
    </ModalView>
  `,
});
WithAccordionList.args = {
  noPadding: true,
};
