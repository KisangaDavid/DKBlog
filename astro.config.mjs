import { defineConfig } from 'astro/config'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import mdx from '@astrojs/mdx'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeExternalLinks from 'rehype-external-links'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://blog.dkisanga.com',
  integrations: [
    starlight({
      title: 'DK Blog',
      expressiveCode: {
        themes: ['nord'],
        useStarlightUiThemeColors: false,
      },
    }),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
    remarkPlugins: [remarkGfm, remarkSmartypants, remarkMath],
    rehypePlugins: [
       [
        rehypeKatex,
        {
          trust: true,
        }
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ] 
    ],
     stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  },
 
})