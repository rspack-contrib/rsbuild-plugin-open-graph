import { test, expect } from '@rstest/core';
import { pluginOpenGraph } from '../../src';
import { createRsbuild } from '@rsbuild/core';
import fs from 'node:fs';
import path from 'node:path';

test('should build succeed', async () => {
  const rsbuild = await createRsbuild({
    cwd: __dirname,
    rsbuildConfig: {
      source: {
        entry: {
          foo: './src/foo.js',
          bar: './src/bar.js',
        },
      },
      plugins: [
        pluginOpenGraph(({ entryName }) => {
          return {
            title: entryName,
            type: 'website',
            url: 'https://rsbuild.dev/',
            image: 'https://rsbuild.dev/og-image.png',
            description: 'The Rspack-based build tool',
            twitter: {
              site: '@rspack_dev',
              card: 'summary_large_image',
            },
          };
        }),
      ],
    },
  });

  await rsbuild.build();
  const fooHtml = await fs.promises.readFile(
    path.resolve(rsbuild.context.distPath, 'foo.html'),
    'utf-8',
  );
  const barHtml = await fs.promises.readFile(
    path.resolve(rsbuild.context.distPath, 'bar.html'),
    'utf-8',
  );

  const expectTags = [
    '<meta property="og:url" content="https://rsbuild.dev/">',
    '<meta property="og:type" content="website">',
    '<meta property="og:title" content="<title>"',
    '<meta property="og:image" content="https://rsbuild.dev/og-image.png">',
    '<meta property="og:description" content="The Rspack-based build tool">',
    '<meta property="twitter:site" content="@rspack_dev">',
    '<meta property="twitter:card" content="summary_large_image">',
  ];

  for (const tag of expectTags) {
    expect(fooHtml.includes(tag.replace('<title>', 'foo'))).toBeTruthy();
  }
  for (const tag of expectTags) {
    expect(barHtml.includes(tag.replace('<title>', 'bar'))).toBeTruthy();
  }
});
