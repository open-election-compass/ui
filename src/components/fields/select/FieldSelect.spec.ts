import { describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { defineRule } from 'vee-validate';
import { one_of, required } from '@vee-validate/rules';
defineRule('one_of', one_of);
defineRule('required', required);

import FieldSelect from './FieldSelect.vue';

const IconDisplay = {
  template: '<span class="icon-display" />',
  props: ['name'],
};

function factory(
  name: string,
  value = '',
  rules: string | Record<string, unknown> = 'required'
): VueWrapper {
  return mount(FieldSelect, {
    global: {
      mocks: {
        $t: (msg: string) => msg,
      },
      stubs: {
        IconDisplay,
      },
    },
    props: {
      alias: name.toLowerCase(),
      name,
      label: name,
      rules,
      options: [
        { option: 'Christopher Eccleston', value: '9' },
        { option: 'David Tennant', value: '10' },
        { option: 'Matt Smith', value: '11' },
        { option: 'Peter Capaldi', value: '12' },
        { option: 'Jodie Whittaker', value: '13' },
      ],
      value,
      description: `Description of ${name}`,
    },
  }) as VueWrapper;
}

describe('FieldSelect', () => {
  it('renders a select element', async () => {
    const wrapper = await factory('Doctor');
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.find('select option[disabled]').exists()).toBe(true);
    expect(wrapper.find('select option[disabled]').text()).toContain('choose');
  });

  it("selects an option from 'value'", async () => {
    const wrapper = await factory('Doctor', '11');
    expect((wrapper.find('select').element as any).value).toBe('11');
    await wrapper.setProps({
      value: '12',
    });
    expect((wrapper.find('select').element as any).value).toBe('12');
    await wrapper.find('select').setValue('10');
    await wrapper.find('select').trigger('change');
    expect((wrapper.find('select').element as any).value).toBe('10');
    await wrapper.setProps({
      value: '',
    });
    expect((wrapper.find('select').element as any).value).toBe('');
  });

  it('renders a label', async () => {
    const wrapper = await factory('Doctor');
    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe('Doctor');
  });

  it('shows a description', async () => {
    const wrapper = await factory('Doctor');
    expect(wrapper.find('.field-select__description').text()).toBe('Description of Doctor');
  });

  it('validates user input and emits change event when input is valid', async () => {
    const wrapper = await factory('Doctor', '', 'required|one_of:9,11,13');
    expect((wrapper.find('select').element as any).value).toBe('');
    expect(wrapper.find('.field-select').classes('field-select--valid')).toBe(false);

    // Valid input
    await wrapper.find('select').setValue('13');
    await (wrapper.vm as any).currentValidation;
    expect((wrapper.emitted().change as any)[0][0]).toBe('13');
    expect(wrapper.find('.field-select').classes('field-select--valid')).toBe(true);
    expect(wrapper.find('.field-select__description').exists()).toBe(true);
    expect(wrapper.find('.field-select__error').exists()).toBe(false);

    // Invalid input
    await wrapper.find('select').setValue('12');
    await (wrapper.vm as any).currentValidation;
    expect((wrapper.emitted().change as any)[1][0]).toBe('');
    expect(wrapper.find('.field-select').classes('field-select--invalid')).toBe(true);
    expect(wrapper.find('.field-select__description').exists()).toBe(false);
    expect(wrapper.find('.field-select__error').exists()).toBe(true);
  });

  it('validates with object-based rules', async () => {
    const wrapper = await factory('Doctor', '', {
      required: true,
      one_of: ['9', '11', '13'],
    });
    await wrapper.find('select').setValue('12');
    await (wrapper.vm as any).currentValidation;
    expect(wrapper.find('.field-select').classes('field-select--invalid')).toBe(true);
  });

  it('passes properties on (readonly)', async () => {
    const wrapper = await factory('Doctor');
    expect(wrapper.find('select').attributes('readonly')).toBe(undefined);
    wrapper.setProps({
      readonly: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('select').attributes('readonly')).toBeDefined();
  });
});
