# rsbuild-plugin-open-graph

rsbuild-plugin-open-graph is a Rsbuild plugin to do something.

<p>
  <a href="https://npmjs.com/package/rsbuild-plugin-open-graph">
   <img src="https://img.shields.io/npm/v/rsbuild-plugin-open-graph?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
</p>

## Usage

Install:

```bash
npm add rsbuild-plugin-open-graph -D
```

Add plugin to your `rsbuild.config.ts`:

```ts
// rsbuild.config.ts
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';

export default {
  plugins: [pluginOpenGraph()],
};
```

## Options

Here are the available options:

| Name | Type      | Description      | Defaults    |
| ---- | --------- | ---------------- | ----------- |
| foo  | `string`  | Some description | `undefined` |
| bar  | `boolean` | Some description | `false`     |

## License

[MIT](./LICENSE).
