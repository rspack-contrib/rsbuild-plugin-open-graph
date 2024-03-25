import { defineConfig } from '@rsbuild/core';
import { pluginOpenGraph } from '../src';

export default defineConfig({
  plugins: [pluginOpenGraph()],
});
