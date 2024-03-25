import type { RsbuildConfig, RsbuildPlugin } from '@rsbuild/core';

export type PluginOpenGraphOptions = {
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

type MetaObject = {
  property: string;
  content: string;
};

function getMeta(name: string, value: string): Record<string, MetaObject> {
  return {
    [name]: {
      property: name,
      content: value,
    },
  };
}

export const pluginOpenGraph = (
  options: PluginOpenGraphOptions = {},
): RsbuildPlugin => ({
  name: 'rsbuild-plugin-open-graph',

  setup(api) {
    api.modifyRsbuildConfig((userConfig, { mergeRsbuildConfig }) => {
      const meta: Record<string, MetaObject> = {};

      const BASIC_KEYS = [
        'url',
        'type',
        'title',
        'image',
        'audio',
        'video',
        'locale',
        'determiner',
        'description',
      ] as const;

      BASIC_KEYS.forEach((key) => {
        const val = options[key];
        if (val !== undefined) {
          Object.assign(meta, getMeta(`og:${key}`, val));
        }
      });

      if (options.twitter) {
        Object.entries(options.twitter).forEach(([key, val]) => {
          Object.assign(meta, getMeta(`twitter:${key}`, val));
        });
      }

      const extraConfig: RsbuildConfig = {
        html: {
          meta,
        },
      };

      return mergeRsbuildConfig(extraConfig, userConfig);
    });
  },
});
