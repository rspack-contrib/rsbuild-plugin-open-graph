# rsbuild-plugin-open-graph

An Rsbuild plugin to generate Open Graph meta tags.

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
  plugins: [
    pluginOpenGraph({
      // options
    }),
  ],
};
```

## Example

- Config:

```ts
pluginOpenGraph({
  title: 'Rsbuild',
  type: 'website',
  url: 'https://rsbuild.dev/',
  image: 'https://rsbuild.dev/og-image.png',
  description: 'The Rspack-based build tool',
  twitter: {
    site: '@rspack_dev',
    card: 'summary_large_image',
  },
});
```

- Generated HTML:

```html
<html>
  <head>
    <meta property="og:url" content="https://rsbuild.dev/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Rsbuild" />
    <meta property="og:image" content="https://rsbuild.dev/og-image.png" />
    <meta property="og:description" content="The Rspack-based build tool" />
    <meta property="twitter:site" content="@rspack_dev" />
    <meta property="twitter:card" content="summary_large_image" />
  </head>
  <body></body>
</html>
```

## Options

Here are the available options:

```ts
type PluginOpenGraphOptions = {
  url?: string;
  type?: string;
  title?: string;
  image?: string;
  audio?: string;
  video?: string;
  locale?: string;
  determiner?: 'a' | 'an' | 'the' | 'auto' | '';
  description?: string;
  twitter?: {
    site?: string;
    card?: string;
    title?: string;
    image?: string;
    player?: string;
    creator?: string;
    description?: string;
  };
};
```

See the following documents for details:

- [The Open Graph protocol](https://ogp.me/)
- [The Open Graph of Twitter](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [The Open Graph of Meta / Facebook](https://developers.facebook.com/docs/sharing/webmasters)

## License

[MIT](./LICENSE).
