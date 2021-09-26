const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss'
  ],
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src/');
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
      type: 'json'
    });
    config.resolve.extensions.push('.yaml');
    return config;
  },
}