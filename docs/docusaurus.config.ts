import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'React Refocus',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',
  url: 'https://react-refocus.mallikcheripally.com',
  baseUrl: '/',
  organizationName: 'mallikcheripally',
  projectName: 'react-refocus',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: './docs', // Ensure this path is correct
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/mallikcheripally/react-refocus/edit/main/website/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: 'img/social-card.jpg',
    navbar: {
      title: 'React Refocus',
      logo: {
        alt: 'React Refocus',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/mallikcheripally/react-refocus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    search: {
      placeholder: 'Search...',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/mallikcheripally/react-refocus/discussions',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mallikcheripally/react-refocus',
            },
          ],
        },
      ],
      copyright: `Copyright © 2024 Mallik Cheripally`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    structuredData: {
      excludedRoutes: [], // array of routes to exclude from structured data generation
      verbose: false, // print verbose output to console
      featuredImageDimensions: {
        width: 1200,
        height: 630,
      },
      authors: {
        author_name: {
          authorId: 'mallikcheripally',
          url: 'https://mallikcheripally.com',
          sameAs: ['https://github.com/mallikcheripally', 'https://www.linkedin.com/in/mallikcheripally/', 'https://www.npmjs.com/~mallikcheripally'],
        },
      },
      organization: {
        name: 'React Refocus',
        url: 'https://react-refocus.mallikcheripally.com',
        logo: 'https://react-refocus.mallikcheripally.com/img/logo.png',
      },
      website: {
        datePublished: '2024-08-09',
        inLanguage: 'en-US',
      },
      webpage: {
        datePublished: '2024-08-09',
        inLanguage: 'en-US',
      },
      breadcrumbLabelMap: {
        'introduction': 'Introduction',
      }
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        language: 'en',
      },
    ],
    // [
    //   '@docusaurus/plugin-google-gtag',
    //   {
    //     trackingID: '',
    //     anonymizeIP: true,
    //   },
    // ],
    '@stackql/docusaurus-plugin-structured-data',
  ],
};

export default config;
