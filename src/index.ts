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
  pluginOptions:
    | PluginOpenGraphOptions
    | ((context: { entryName: string }) => PluginOpenGraphOptions),
): RsbuildPlugin => ({
  name: 'rsbuild-plugin-open-graph',

  setup(api) {
    api.modifyRsbuildConfig((userConfig, { mergeRsbuildConfig }) => {
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

      const getMetaByOptions = (options: PluginOpenGraphOptions) => {
        const meta: Record<string, MetaObject> = {};

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
        return meta;
      };

      const extraConfig: RsbuildConfig =
        typeof pluginOptions === 'function'
          ? {
              html: {
                meta: ({ entryName }) => {
                  return getMetaByOptions(pluginOptions({ entryName }));
                },
              },
            }
          : {
              html: {
                meta: getMetaByOptions(pluginOptions),
              },
            };

      return mergeRsbuildConfig(extraConfig, userConfig);
    });
  },
});
