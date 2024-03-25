import type { RsbuildPlugin } from '@rsbuild/core';

export type PluginOpenGraphOptions = {
  foo?: string;
  bar?: boolean;
};

export const pluginOpenGraph = (
  options: PluginOpenGraphOptions = {},
): RsbuildPlugin => ({
  name: 'rsbuild-plugin-open-graph',

  setup(api) {
    console.log('api', api);
    console.log('options', options);
  },
});
