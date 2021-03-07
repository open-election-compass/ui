import { shallowMount, Wrapper } from '@vue/test-utils';
import AccordionList from './AccordionList.vue';

describe('AccordionList', () => {
  let wrapper: Wrapper<Vue>;
  const options = {
    propsData: {
      items: [
        { alias: 'first', caption: 'First' },
        { alias: 'second', caption: 'Second' },
        { alias: 'third', caption: 'Third' },
      ],
    },
    slots: {
      first: '<p>First Slot</p>',
      second: '<p>Second Slot</p>',
      third: '<p>Third Slot</p>',
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(AccordionList, options);
  });

  it('renders items using `details` and `summary` tags', async () => {
    expect(wrapper.findAll('details').length).toBe(3);
    expect(wrapper.findAll('details').at(0).find('summary').text()).toBe('First');
    expect(wrapper.findAll('details').at(1).find('summary').text()).toBe('Second');
    expect(wrapper.findAll('details').at(2).find('summary').text()).toBe('Third');
  });

  it('adds slots inside the `details` elements', async () => {
    expect(wrapper.findAll('details').at(0).find('p').text()).toBe('First Slot');
    expect(wrapper.findAll('details').at(1).find('p').text()).toBe('Second Slot');
    expect(wrapper.findAll('details').at(2).find('p').text()).toBe('Third Slot');
  });

  it('starts with the first item open, if asked to', async () => {
    expect(wrapper.findAll('details').at(0).attributes('open')).toBe(undefined);
    expect(wrapper.findAll('details').at(1).attributes('open')).toBe(undefined);
    expect(wrapper.findAll('details').at(2).attributes('open')).toBe(undefined);
    await wrapper.setProps({
      openFirst: true,
    });
    expect(wrapper.findAll('details').at(0).attributes('open')).toBe('open');
    expect(wrapper.findAll('details').at(1).attributes('open')).toBe(undefined);
    expect(wrapper.findAll('details').at(2).attributes('open')).toBe(undefined);
  });
});
