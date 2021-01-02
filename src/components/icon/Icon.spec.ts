import { mount } from '@vue/test-utils';
import Icon from './Icon.vue';

function factory() {
  return mount(Icon, {
    propsData: {
      name: 'check',
    },
  });
}

describe('Icon', () => {
  it('renders a vector graphic', () => {
    const wrapper = factory();
    expect(wrapper.find('svg.icon path').exists()).toBe(true);
  });

  it('renders monospace icons by default', async () => {
    const wrapper = factory();
    expect(wrapper.find('svg.fa-fw').exists()).toBe(true);
    await wrapper.setProps({ monospace: false });
    expect(wrapper.find('svg.fa-fw').exists()).toBe(false);
  });

  it('optionally renders icons spinning', async () => {
    const wrapper = factory();
    expect(wrapper.find('svg.fa-spin').exists()).toBe(false);
    await wrapper.setProps({ spinning: true });
    expect(wrapper.find('svg.fa-spin').exists()).toBe(true);
  });
});
