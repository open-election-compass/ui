import { mount, Wrapper } from '@vue/test-utils';
import FieldInput from './FieldInput.vue';

function factory(name: string, type: string, rules = 'required', value = ''): Wrapper<Vue> {
  return mount(FieldInput, {
    propsData: {
      alias: name.toLowerCase(),
      name,
      type,
      label: name,
      rules,
      value,
      description: `Description of ${name}`,
    },
  });
}

describe('FieldInput', () => {
  it('renders an `input` element with the correct type', async () => {
    const wrapper = await factory('First Name', 'text');
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('input').attributes('type')).toBe('text');
    await wrapper.setProps({
      type: 'number',
    });
    expect(wrapper.find('input').attributes('type')).toBe('number');
  });

  it('fills the input with \'value\'', async () => {
    const wrapper = await factory('First Name', 'text', 'required', 'foo');
    expect((wrapper.find('input').element as any).value).toBe('foo');
    await wrapper.setProps({
      value: 'bar',
    });
    expect((wrapper.find('input').element as any).value).toBe('bar');
    await wrapper.find('input').setValue('foo');
    expect((wrapper.find('input').element as any).value).toBe('foo');
  });

  it('renders a label', async () => {
    const wrapper = await factory('First Name', 'text');
    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe('First Name');
  });

  it('shows a description', async () => {
    const wrapper = await factory('First Name', 'text');
    expect(wrapper.find('.field-input__description').text()).toBe('Description of First Name');
  });

  it('validates user input and emits change event when input is valid', async () => {
    const wrapper = await factory('First Name', 'text', 'required|alpha');
    expect((wrapper.find('input').element as any).value).toBe('');
    expect(wrapper.find('.field-input').classes('field-input--valid')).toBe(false);

    // Valid input
    await wrapper.find('input').setValue('Luke');
    await wrapper.find('input').trigger('blur'); // trigger publish()
    await (wrapper.vm as any).currentValidation;
    expect((wrapper.emitted().change as any)[0][0]).toBe('Luke');
    expect(wrapper.find('.field-input').classes('field-input--valid')).toBe(true);
    expect(wrapper.find('.field-input__description').exists()).toBe(true);
    expect(wrapper.find('.field-input__error').exists()).toBe(false);

    // Invalid input
    await wrapper.find('input').setValue('C3PO');
    await wrapper.find('input').trigger('blur'); // trigger publish()
    await (wrapper.vm as any).currentValidation;
    expect((wrapper.emitted().change as any)[1][0]).toBe('');
    expect(wrapper.find('.field-input').classes('field-input--invalid')).toBe(true);
    expect(wrapper.find('.field-input__description').exists()).toBe(false);
    expect(wrapper.find('.field-input__error').exists()).toBe(true);
  });
});
