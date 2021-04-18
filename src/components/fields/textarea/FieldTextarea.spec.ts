import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import { ValidationProvider, extend } from 'vee-validate';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { min, max, required } from 'vee-validate/dist/rules.umd';
import FieldTextarea from './FieldTextarea.vue';

extend('max', max);
extend('min', min);
extend('required', required);

const localVue = createLocalVue();
localVue.component('ValidationProvider', ValidationProvider);

function factory(name: string, value = '', rules = 'required'): Wrapper<Vue> {
  return mount(FieldTextarea, {
    localVue,
    propsData: {
      alias: name.toLowerCase(),
      name,
      label: name,
      rules,
      value,
      description: `Description of ${name}`,
    },
  });
}

describe('FieldTextarea', () => {
  it('renders a `textarea` element', async () => {
    const wrapper = await factory('Message');
    expect(wrapper.find('textarea').exists()).toBe(true);
  });

  it('fills the textarea with \'value\'', async () => {
    const wrapper = await factory('Message', 'foo', 'required');
    expect((wrapper.find('textarea').element as any).value).toBe('foo');
    await wrapper.setProps({
      value: 'bar',
    });
    expect((wrapper.find('textarea').element as any).value).toBe('bar');
    await wrapper.find('textarea').setValue('foo');
    expect((wrapper.find('textarea').element as any).value).toBe('foo');
  });

  it('renders a label', async () => {
    const wrapper = await factory('Message');
    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe('Message');
  });

  it('shows a description', async () => {
    const wrapper = await factory('Message', 'text');
    expect(wrapper.find('.field-textarea__description').text()).toBe('Description of Message');
  });

  it('validates user input and emits change event when input is valid', async () => {
    const wrapper = await factory('Message', '', 'required|min:5');
    expect((wrapper.find('textarea').element as any).value).toBe('');
    expect(wrapper.find('.field-textarea').classes('field-textarea--valid')).toBe(false);

    // Valid input
    await wrapper.find('textarea').setValue('Hello there!');
    await wrapper.find('textarea').trigger('blur'); // trigger publish()
    await (wrapper.vm as any).currentValidation;
    expect((wrapper.emitted().change as any)[0][0]).toBe('Hello there!');
    expect(wrapper.find('.field-textarea').classes('field-textarea--valid')).toBe(true);
    expect(wrapper.find('.field-textarea__description').exists()).toBe(true);
    expect(wrapper.find('.field-textarea__error').exists()).toBe(false);

    // Invalid input
    await wrapper.find('textarea').setValue('Nope');
    await wrapper.find('textarea').trigger('blur'); // trigger publish()
    await (wrapper.vm as any).currentValidation;
    expect((wrapper.emitted().change as any)[1][0]).toBe('');
    expect(wrapper.find('.field-textarea').classes('field-textarea--invalid')).toBe(true);
    expect(wrapper.find('.field-textarea__description').exists()).toBe(false);
    expect(wrapper.find('.field-textarea__error').exists()).toBe(true);
  });

  it('passes properties on (readonly)', async () => {
    const wrapper = await factory('Message');
    expect(wrapper.find('textarea').attributes('readonly')).toBe(undefined);
    wrapper.setProps({
      readonly: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('textarea').attributes('readonly')).toBe('readonly');
  });
});
