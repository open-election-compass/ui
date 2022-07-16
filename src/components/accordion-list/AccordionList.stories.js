import AccordionList from './AccordionList.vue';

export default {
  title: 'Elements/AccordionList',
  component: AccordionList,
  argTypes: {
    items: {
      name: 'Items',
      description:
        'List of items, each with an alias used for the slot name and a caption used for the summary.',
    },
    openFirst: {
      name: 'Open First Item',
      control: 'boolean',
      defaultValue: false,
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AccordionList },
  template: `
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
  `,
});

export const Default = Template.bind({});
Default.args = {};
