import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import VScrollLock from 'v-scroll-lock';
import Modal from './Modal.vue';
import BaseButton from '../base-button/BaseButton.vue';

const Icon = {
  template: '<span class="icon" />',
  props: ['name'],
};

describe('Modal', () => {
  let wrapper: Wrapper<Vue>;
  const localVue = createLocalVue();
  localVue.use(VScrollLock);
  const options = {
    localVue,
    mocks: {
      $t: (message: string) => message,
    },
    propsData: {
      visible: true,
      heading: 'Heading',
      description: 'Description',
      icon: 'check',
    },
    slots: {
      default: 'Lorem ipsum',
    },
    stubs: {
      BaseButton,
      Icon,
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(Modal, options);
  });

  it('renders a modal when `visible` property is set', async () => {
    expect(wrapper.find('.modal__content').text()).toBe('Lorem ipsum');
    await wrapper.setProps({ visible: false });
  });

  it('displays a heading and optional icon and description', async () => {
    expect(wrapper.find('.modal__icon').exists()).toBe(true);
    expect(wrapper.find('.modal__heading').text()).toBe('Heading');
    expect(wrapper.find('.modal__description').text()).toBe('Description');
    await wrapper.setProps({ heading: '' });
    expect(wrapper.find('.modal__icon').exists()).toBe(false);
    expect(wrapper.find('.modal__heading').exists()).toBe(false);
    expect(wrapper.find('.modal__description').exists()).toBe(false);
  });

  it('clicking the overlay closes the modal (emits close event)', async () => {
    await wrapper.find('.modal__overlay').trigger('click');
    expect((wrapper.emitted() as any).close.length).toBe(1);
  });

  it('supports different widths', async () => {
    expect(wrapper.find('.modal').classes('modal--width-normal')).toBe(true);
    await wrapper.setProps({ width: 'narrow' });
    expect(wrapper.find('.modal').classes('modal--width-narrow')).toBe(true);
  });

  it('spins loading icons', async () => {
    expect(wrapper.find('.modal__icon').attributes('spin')).toBe(undefined);
    await wrapper.setProps({ icon: 'slash' });
    expect(wrapper.find('.modal__icon').attributes('spin')).toBe('true');
  });

  it('adds a done button by default', async () => {
    expect(wrapper.findAll('.modal__actions button').length).toBe(1);
    expect(wrapper.find('.modal__actions button').text()).toBe('done');
  });

  it('adds other buttons', async () => {
    await wrapper.setProps({
      buttons: [
        {
          caption: 'foo',
          theme: 'primary',
          eventName: 'foo',
        },
        {
          caption: 'bar',
          theme: 'primary',
          eventName: 'bar',
        },
      ],
    });
    expect(wrapper.findAll('.modal__actions button').length).toBe(2);
    expect(wrapper.findAll('.modal__actions button').at(0).text()).toBe('foo');
    expect(wrapper.findAll('.modal__actions button').at(1).text()).toBe('bar');
  });

  it('doesn\'t add padding to the content when asked to', async () => {
    expect(wrapper.find('.modal').classes('modal--no-padding')).toBe(false);
    await wrapper.setProps({
      noPadding: true,
    });
    expect(wrapper.find('.modal').classes('modal--no-padding')).toBe(true);
  });
});
