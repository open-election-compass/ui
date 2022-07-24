import { describe, it, beforeEach, expect, vi } from 'vitest';
import { shallowMount, mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import AsyncButton from './AsyncButton.vue';

const IconDisplay = {
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
  let wrapper: VueWrapper;
  const options = {
    props: {
      theme: 'primary',
      right: 'angle-right',
      action: (): Promise<void> =>
        new Promise((resolve) => {
          setTimeout(() => resolve(), 2000);
        }),
    },
    global: {
      mocks: {
        $t: (message: string) => message,
      },
      stubs: {
        IconDisplay,
        ModalView: {
          props: ['visible'],
          template: '<div v-if="visible" class="modal-view-stub"><slot /></div>',
        },
      },
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(AsyncButton, options) as VueWrapper;
  });

  it('renders a `button`', async () => {
    expect(wrapper.find('button.async-button').element.tagName).toBe('BUTTON');
  });

  it('can be disabled', async () => {
    await wrapper.setProps({ disabled: true });
    const button = wrapper.find('button.async-button');
    expect((button.element as HTMLButtonElement).disabled).toBe(true);
    expect((button.element as HTMLButtonElement).tabIndex).toBe(-1);
    expect(button.classes('async-button--disabled')).toBe(true);
  });

  it('uses tabindex', async () => {
    await wrapper.setProps({ tabindex: 3 });
    expect(wrapper.find('button.async-button').attributes('tabindex')).toBe('3');
  });

  it('can render an icon before the caption', async () => {
    await wrapper.setProps({ left: 'check' });
    expect(wrapper.findComponent(IconDisplay).exists()).toBe(true);
  });

  it('can render an icon after the caption', async () => {
    await wrapper.setProps({ right: 'check' });
    expect(wrapper.findComponent({ ref: 'icon' }).exists()).toBe(true);
  });

  it('uses the default slot as the caption', () => {
    wrapper = shallowMount(
      AsyncButton,
      Object.assign(options, {
        slots: {
          default: 'Foo',
        },
      })
    ) as VueWrapper;
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
    expect(button.classes('async-button--size-normal')).toBe(false);
    await wrapper.setProps({
      size: 'normal',
    });
    expect(button.classes('async-button--size-small')).toBe(false);
    expect(button.classes('async-button--size-normal')).toBe(true);
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
    wrapper = mount(AsyncButton, options) as VueWrapper;
    const action = vi.fn().mockResolvedValue(true);
    await wrapper.setProps({ action });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('is disabled when action is being executed (pending)', async () => {
    vi.useFakeTimers();

    const button = wrapper.find('button.async-button');
    expect((button.element as HTMLButtonElement).disabled).toBe(false);

    await button.trigger('click');

    await nextTick();
    expect((button.element as HTMLButtonElement).disabled).toBe(true);
    vi.runAllTimers();
    await nextTick();
    await nextTick();
    expect((button.element as HTMLButtonElement).disabled).toBe(false);

    vi.useRealTimers();
  });

  it('shows special icons to indicate pending, success and errors while executing the action', async () => {
    vi.useFakeTimers();

    const button = wrapper.find('button.async-button');
    expect(wrapper.getComponent({ ref: 'icon' }).props('name')).toBe('angle-right');

    // Successful action
    wrapper.setProps({
      action: (): Promise<void> =>
        new Promise((resolve) => {
          setTimeout(() => resolve(), 2000);
        }),
    });

    await button.trigger('click');

    await nextTick();
    expect(wrapper.getComponent({ ref: 'pending-icon' }).props('name')).toBe('slash');
    expect(wrapper.getComponent({ ref: 'pending-icon' }).props('spinning')).toBe(true);
    vi.runAllTimers();
    await nextTick();
    await nextTick();
    expect(wrapper.getComponent({ ref: 'success-icon' }).props('name')).toBe('check');
    vi.runAllTimers();
    await nextTick();
    expect(wrapper.getComponent({ ref: 'icon' }).props('name')).toBe('angle-right');

    // Unsuccessful action
    await wrapper.setProps({
      action: (): Promise<void> =>
        new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error('foo')), 2000);
        }),
    });

    await button.trigger('click');

    await nextTick();
    expect(wrapper.getComponent({ ref: 'pending-icon' }).props('name')).toBe('slash');
    expect(wrapper.getComponent({ ref: 'pending-icon' }).props('spinning')).toBe(true);
    vi.runAllTimers();
    await nextTick();
    await nextTick();
    expect(wrapper.getComponent({ ref: 'error-icon' }).props('name')).toBe('times');
    vi.runAllTimers();
    await nextTick();
    expect(wrapper.getComponent({ ref: 'icon' }).props('name')).toBe('angle-right');

    vi.useRealTimers();
  });

  it.only('emits success and error events', async () => {
    vi.useFakeTimers();

    const button = wrapper.find('button.async-button');
    expect(wrapper.getComponent({ ref: 'icon' }).props('name')).toBe('angle-right');

    // Successful action
    await wrapper.setProps({
      action: (): Promise<number> =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(123);
          }, 2000);
        }),
    });

    await button.trigger('click');

    await nextTick();
    // pending
    vi.runAllTimers();
    await nextTick();
    await nextTick();
    expect((wrapper.emitted()['success'] as any)[0][0]).toBe(123);
    vi.runAllTimers();
    await nextTick();

    // Unsuccessful action
    const error = new Error('foo');
    await wrapper.setProps({
      action: (): Promise<Error> =>
        new Promise((resolve, reject) => {
          setTimeout(() => reject(error), 2000);
        }),
    });

    await button.trigger('click');

    await nextTick();
    // pending
    vi.runAllTimers();
    await nextTick();
    await nextTick();
    expect((wrapper.emitted()['error'] as any)[0][0]).toBe(error);

    vi.useRealTimers();
  });

  it('shows error messages in a modal', async () => {
    vi.useFakeTimers();

    const button = wrapper.find('button.async-button');

    // Reject promise
    wrapper.setProps({
      action: (): Promise<void> =>
        new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error('foo')), 2000);
        }),
    });
    await nextTick();

    await button.trigger('click');

    vi.runAllTimers();
    await nextTick();
    await nextTick();
    vi.runAllTimers();
    await nextTick();
    await nextTick();
    expect(wrapper.find('.modal-view-stub').text()).toBe('foo');

    // Catch error in promise
    wrapper.setProps({
      action: vi.fn().mockImplementation(
        () =>
          new Promise(() => {
            throw new Error('bar');
          })
      ),
    });
    await nextTick();

    await button.trigger('click');

    vi.runAllTimers();
    await nextTick();
    await nextTick();
    vi.runAllTimers();
    await nextTick();
    await nextTick();
    expect(wrapper.find('.modal-view-stub').text()).toBe('bar');

    vi.useRealTimers();
  });
});
