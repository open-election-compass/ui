import { describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { defineRule } from 'vee-validate';
import { min, required } from '@vee-validate/rules';
defineRule('min', min);
defineRule('required', required);

import FieldTextarea from './FieldTextarea.vue';

function factory(
  name: string,
  value = '',
  rules: string | Record<string, unknown> = 'required'
): VueWrapper {
  return mount(FieldTextarea, {
    props: {
      alias: name.toLowerCase(),
      name,
      label: name,
      rules,
      value,
      description: `Description of ${name}`,
    },
  }) as VueWrapper;
}

describe('FieldTextarea', () => {
  it('renders a `textarea` element', async () => {
    const wrapper = await factory('Message');
    expect(wrapper.find('textarea').exists()).toBe(true);
  });

  it("fills the textarea with 'value'", async () => {
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
    await wrapper.find('textarea').trigger('change'); // trigger v-model
    await wrapper.find('textarea').trigger('blur'); // trigger publish()
    await (wrapper.vm as any).currentValidation;
    expect((wrapper.emitted()['update:value'] as any)[0][0]).toBe('Hello there!');
    expect(wrapper.find('.field-textarea').classes('field-textarea--valid')).toBe(true);
    expect(wrapper.find('.field-textarea__description').exists()).toBe(true);
    expect(wrapper.find('.field-textarea__error').exists()).toBe(false);

    // Invalid input
    await wrapper.find('textarea').setValue('Nope');
    await wrapper.find('textarea').trigger('change'); // trigger v-model
    await wrapper.find('textarea').trigger('blur'); // trigger publish()
    await (wrapper.vm as any).currentValidation;
    expect((wrapper.emitted()['update:value'] as any)[1][0]).toBe('');
    expect(wrapper.find('.field-textarea').classes('field-textarea--invalid')).toBe(true);
    expect(wrapper.find('.field-textarea__description').exists()).toBe(false);
    expect(wrapper.find('.field-textarea__error').exists()).toBe(true);
  });

  it('validates user input and emits change event when input is valid', async () => {
    const wrapper = await factory('Message', '', {
      required: true,
      min: 5,
    });

    await wrapper.find('textarea').setValue('Nope');
    await wrapper.find('textarea').trigger('change'); // trigger v-model
    await wrapper.find('textarea').trigger('blur'); // trigger publish()
    await (wrapper.vm as any).currentValidation;
    expect(wrapper.find('.field-textarea').classes('field-textarea--invalid')).toBe(true);
  });

  it('passes properties on (readonly)', async () => {
    const wrapper = await factory('Message');
    expect(wrapper.find('textarea').attributes('readonly')).toBe(undefined);
    wrapper.setProps({
      readonly: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('textarea').attributes('readonly')).toBeDefined();
  });
});
