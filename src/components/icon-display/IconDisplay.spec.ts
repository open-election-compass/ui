import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconDisplay from './IconDisplay.vue';

const FontAwesomeIcon = {
  template: `
    <span>
      <svg
        :class="{
          'icon': true,
          'fa-spin': spin,
          'fa-fw': fixedWidth
        }"
      >
        <path />
      </svg>
    </span>
  `,
  props: {
    name: {
      type: String,
    },
    spin: {
      type: Boolean,
      default: false,
    },
    fixedWidth: {
      type: Boolean,
      default: false,
    },
  },
};

function factory() {
  return mount(IconDisplay, {
    props: {
      name: 'check',
    },
    global: {
      stubs: {
        FontAwesomeIcon,
      },
    },
  });
}

describe('IconDisplay', () => {
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
