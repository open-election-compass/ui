import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import { ValidationProvider, extend } from 'vee-validate';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { oneOf, required } from 'vee-validate/dist/rules.umd';
import FieldSelect from './FieldSelect.vue';

extend('oneOf', oneOf);
extend('required', required);

const localVue = createLocalVue();
localVue.component('ValidationProvider', ValidationProvider);

const Icon = {
  template: '<span class="icon" />',
  props: ['name'],
};

function factory(name: string, value = '', rules = 'required'): Wrapper<Vue> {
  return mount(FieldSelect, {
    localVue,
    mocks: {
      $t: (msg: string) => msg,
    },
    propsData: {
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
    stubs: {
      Icon,
    },
  });
}

describe('FieldSelect', () => {
  it('renders a select element', async () => {
    const wrapper = await factory('Doctor');
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.find('select option[disabled]').exists()).toBe(true);
    expect(wrapper.find('select option[disabled]').text()).toBe('choose');
  });

  it('selects an option from \'value\'', async () => {
    const wrapper = await factory('Doctor', '11');
    expect((wrapper.find('select').element as any).value).toBe('11');
    await wrapper.setProps({
      value: '12',
    });
    expect((wrapper.find('select').element as any).value).toBe('12');
    await wrapper.find('select').setValue('10');
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
    const wrapper = await factory('Doctor', '', 'required|oneOf:9,11,13');
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

  it('passes properties on (readonly)', async () => {
    const wrapper = await factory('Doctor');
    expect(wrapper.find('select').attributes('readonly')).toBe(undefined);
    wrapper.setProps({
      readonly: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('select').attributes('readonly')).toBe('readonly');
  });
});
