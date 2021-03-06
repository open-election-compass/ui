import { shallowMount, Wrapper } from '@vue/test-utils';
import AsyncButton from './AsyncButton.vue';

const Icon = {
  template: '<span class="icon" />',
  props: {
    name: {
      type: String,
    },
    spinning: {
      type: Boolean,
      default: false,
    },
  },
};

describe('AsyncButton', () => {
  let wrapper: Wrapper<Vue>;
  const options = {
    propsData: {
      theme: 'primary',
      right: 'angle-right',
      action: (): Promise<void> => new Promise((resolve) => {
        setTimeout(() => resolve(), 2000);
      }),
    },
    mocks: {
      $t: (message: string) => message,
    },
    stubs: {
      Icon,
      Modal: {
        props: ['visible'],
        template: '<div v-if="visible" class="modal-stub"><slot /></div>',
      },
    },
  };

  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = shallowMount(AsyncButton, options);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders a `button`', async () => {
    expect(wrapper.find('button.async-button').element.tagName).toBe('BUTTON');
  });

  it('can be disabled', async () => {
    await wrapper.setProps({ disabled: true });
    const button = wrapper.find('button.async-button');
    expect((button.element as HTMLButtonElement).disabled).toBe(true);
    expect(button.element.tabIndex).toBe(-1);
    expect(button.classes('async-button--disabled')).toBe(true);
  });

  it('uses tabindex', async () => {
    await wrapper.setProps({ tabindex: 3 });
    expect(wrapper.find('button.async-button').attributes('tabindex')).toBe('3');
  });

  it('can render an icon before the caption', async () => {
    await wrapper.setProps({ left: 'check' });
    expect(wrapper.findComponent(Icon).exists()).toBe(true);
  });

  it('can render an icon after the caption', async () => {
    await wrapper.setProps({ right: 'check' });
    expect(wrapper.findComponent({ ref: 'icon' }).exists()).toBe(true);
  });

  it('uses the default slot as the caption', () => {
    wrapper = shallowMount(AsyncButton, Object.assign(options, {
      slots: {
        default: 'Foo',
      },
    }));
    expect(wrapper.text()).toBe('Foo');
  });

  it('sets the button type', async () => {
    const button = wrapper.find('button.async-button');
    await wrapper.setProps({
      type: 'button',
    });
    expect(button.attributes('type')).toBe('button');
    await wrapper.setProps({
      type: 'submit',
    });
    expect(button.attributes('type')).toBe('submit');
    await wrapper.setProps({
      type: 'reset',
    });
    expect(button.attributes('type')).toBe('reset');
  });

  it('can use different themes', async () => {
    const button = wrapper.find('button.async-button');
    await wrapper.setProps({
      theme: 'primary',
    });
    expect(button.classes('async-button--theme-primary')).toBe(true);
    expect(button.classes('async-button--theme-positive')).toBe(false);
    await wrapper.setProps({
      theme: 'positive',
    });
    expect(button.classes('async-button--theme-primary')).toBe(false);
    expect(button.classes('async-button--theme-positive')).toBe(true);
  });

  it('supports different sizes', async () => {
    const button = wrapper.find('button.async-button');
    await wrapper.setProps({
      size: 'small',
    });
    expect(button.classes('async-button--size-small')).toBe(true);
    expect(button.classes('async-button--size-big')).toBe(false);
    await wrapper.setProps({
      size: 'big',
    });
    expect(button.classes('async-button--size-small')).toBe(false);
    expect(button.classes('async-button--size-big')).toBe(true);
  });

  it('supports different text alignments', async () => {
    const button = wrapper.find('button.async-button');
    await wrapper.setProps({
      textAlign: 'left',
    });
    expect(button.classes('async-button--text-align-left')).toBe(true);
    expect(button.classes('async-button--text-align-center')).toBe(false);
    await wrapper.setProps({
      textAlign: 'center',
    });
    expect(button.classes('async-button--text-align-left')).toBe(false);
    expect(button.classes('async-button--text-align-center')).toBe(true);
  });

  it('executes the given action when clicked', async () => {
    const button = wrapper.find('button.async-button');
    const action = jest.fn().mockResolvedValue(undefined);
    wrapper.setProps({ action });
    button.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('is disabled when action is being executed (pending)', async () => {
    const button = wrapper.find('button.async-button');
    expect((button.element as HTMLButtonElement).disabled).toBe(false);
    button.trigger('click');
    await wrapper.vm.$nextTick();
    expect((button.element as HTMLButtonElement).disabled).toBe(true);
    jest.runAllTimers();
    await wrapper.vm.$nextTick();
    expect((button.element as HTMLButtonElement).disabled).toBe(false);
  });

  it('shows special icons to indicate pending, success and errors while executing the action', async () => {
    const button = wrapper.find('button.async-button');
    expect(wrapper.getComponent({ ref: 'icon' }).props('name')).toBe('angle-right');

    // Successful action
    wrapper.setProps({
      action: (): Promise<void> => new Promise((resolve) => {
        setTimeout(() => resolve(), 2000);
      }),
    });
    button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.getComponent({ ref: 'pending-icon' }).props('name')).toBe('slash');
    expect(wrapper.getComponent({ ref: 'pending-icon' }).props('spinning')).toBe(true);
    jest.runAllTimers();
    await wrapper.vm.$nextTick();
    expect(wrapper.getComponent({ ref: 'success-icon' }).props('name')).toBe('check');
    jest.runAllTimers();
    await wrapper.vm.$nextTick();
    expect(wrapper.getComponent({ ref: 'icon' }).props('name')).toBe('angle-right');

    // Unsuccessful action
    wrapper.setProps({
      action: (): Promise<void> => new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('foo')), 2000);
      }),
    });
    button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.getComponent({ ref: 'pending-icon' }).props('name')).toBe('slash');
    expect(wrapper.getComponent({ ref: 'pending-icon' }).props('spinning')).toBe(true);
    jest.runAllTimers();
    await wrapper.vm.$nextTick();
    expect(wrapper.getComponent({ ref: 'error-icon' }).props('name')).toBe('times');
    jest.runAllTimers();
    await wrapper.vm.$nextTick();
    expect(wrapper.getComponent({ ref: 'icon' }).props('name')).toBe('angle-right');
  });

  it('shows error messages in a modal', async () => {
    const button = wrapper.find('button.async-button');

    // Reject promise
    wrapper.setProps({
      action: (): Promise<void> => new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('foo')), 2000);
      }),
    });
    await wrapper.vm.$nextTick();
    button.trigger('click');
    jest.runAllTimers();
    await wrapper.vm.$nextTick();
    jest.runAllTimers();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.modal-stub').text()).toBe('foo');

    // Catch error in promise
    wrapper.setProps({
      action: jest.fn().mockImplementation(() => new Promise(() => {
        throw new Error('bar');
      })),
    });
    await wrapper.vm.$nextTick();
    button.trigger('click');
    jest.runAllTimers();
    await wrapper.vm.$nextTick();
    jest.runAllTimers();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.modal-stub').text()).toBe('bar');
  });
});
