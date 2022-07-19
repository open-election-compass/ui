import { describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { defineRule } from 'vee-validate';
import { one_of, required } from '@vee-validate/rules';
defineRule('one_of', one_of);
defineRule('required', required);

import FieldSwitch from './FieldSwitch.vue';

function factory(
  name: string,
  value = '',
  rules: string | Record<string, unknown> = 'required'
): VueWrapper {
  return mount(FieldSwitch, {
    props: {
      alias: name.toLowerCase(),
      name,
      label: name,
      rules,
      options: [
        { option: 'female', value: 'f' },
        { option: 'diverse', value: 'd' },
        { option: 'male', value: 'm' },
      ],
      value,
      description: `Description of ${name}`,
    },
  }) as VueWrapper;
}

describe('FieldSwitch', () => {
  it('renders a radio group', async () => {
    const wrapper = await factory('Gender');
    expect(wrapper.findAll('input[type="radio"]').length).toBe(3);
    const label1 = wrapper.findAll('label.field-switch__button')[0];
    expect(wrapper.findAll('input')[0]?.element.id === label1?.attributes('for')).toBe(true);
  });

  it('selects an option by clicking the label/button', async () => {
    const wrapper = await factory('Gender', 'm');
    expect((wrapper.find('input[value="m"]').element as HTMLInputElement).checked).toBe(true);
    await wrapper.setProps({
      value: 'd',
    });
    expect((wrapper.find('input[value="d"]').element as HTMLInputElement).checked).toBe(true);
    expect((wrapper.find('input[value="m"]').element as HTMLInputElement).checked).toBe(false);
    await wrapper.find('label.field-switch__button[for="field-gender-f"]').trigger('click');
    expect((wrapper.find('input[value="f"]').element as HTMLInputElement).checked).toBe(true);
    await wrapper.setProps({
      value: '',
    });
    expect((wrapper.find('input[value="f"]').element as HTMLInputElement).checked).toBe(false);
  });

  it('renders a label', async () => {
    const wrapper = await factory('Gender');
    expect(wrapper.find('label.field-switch__label').exists()).toBe(true);
    expect(wrapper.find('label.field-switch__label').text()).toBe('Gender');
  });

  it('shows a description', async () => {
    const wrapper = await factory('Gender');
    expect(wrapper.find('.field-switch__description').text()).toBe('Description of Gender');
  });

  it('validates user input and emits change event when input is valid', async () => {
    const wrapper = await factory('Gender', '', 'required|one_of:d,f');
    expect(wrapper.find('.field-switch').classes('field-switch--valid')).toBe(false);

    // Valid input
    await wrapper.find('input#field-gender-f').setValue('f');
    await (wrapper.vm as any).currentValidation;
    expect((wrapper.emitted().change as any)[0][0]).toBe('f');
    expect(wrapper.find('.field-switch').classes('field-switch--valid')).toBe(true);
    expect(wrapper.find('.field-switch__description').exists()).toBe(true);
    expect(wrapper.find('.field-switch__error').exists()).toBe(false);

    // Invalid input
    await wrapper.find('input#field-gender-m').setValue('m');
    await (wrapper.vm as any).currentValidation;
    expect((wrapper.emitted().change as any)[1][0]).toBe('');
    expect(wrapper.find('.field-switch').classes('field-switch--invalid')).toBe(true);
    expect(wrapper.find('.field-switch__description').exists()).toBe(false);
    expect(wrapper.find('.field-switch__error').exists()).toBe(true);
  });

  it('validates with object-based rules', async () => {
    const wrapper = await factory('Gender', '', {
      required: true,
      one_of: ['d', 'f'],
    });

    await wrapper.find('input#field-gender-m').setValue('m');
    await (wrapper.vm as any).currentValidation;
    expect(wrapper.find('.field-switch').classes('field-switch--invalid')).toBe(true);
  });

  it('passes properties on (readonly)', async () => {
    const wrapper = await factory('Gender');
    expect(wrapper.find('input').attributes('readonly')).toBe(undefined);
    wrapper.setProps({
      readonly: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').attributes('readonly')).toBeDefined();
  });
});
