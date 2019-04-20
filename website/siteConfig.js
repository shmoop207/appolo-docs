/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [];

const siteConfig = {
    title: 'Appolo', // Title for your website.
    tagline: 'Outer space server framework for Node.js',
    url: 'https://appolojs.com', // Your website URL
    baseUrl: '/', // Base URL for your project */
    // For github.io type URLs, you would set the url and baseUrl like:
    //   url: 'https://facebook.github.io',
    //   baseUrl: '/test-site/',

    // Used for publishing and more
    projectName: 'appolo',
    organizationName: 'appolo',
    // For top-level user or org sites, the organization is still the same.
    // e.g., for the https://JoelMarcey.github.io site, it would be set like...
    //   organizationName: 'JoelMarcey'

    // For no header links in the top nav bar -> headerLinks: [],
    headerLinks: [
        {doc: 'introduction/quick-start', label: 'Documentation',icon:"aaaa"},
        {href: "https://github.com/shmoop207/appolo", label: 'GitHub'},
        { search: true }
    ],

    // If you have users set above, you add it here:
    users,

    /* path to images for header/footer */
    headerIcon: 'img/appolo_fav.png',
    footerIcon: 'img/docusaurus.svg',
    favicon: 'img/favicon/appolo_fav.ico',


    /* Colors for website */
    colors: {
        primaryColor: '#3261a2',
        secondaryColor: '#307b58',
    },

    /* Custom fonts for website */
    /*
    fonts: {
      myFont: [
        "Times New Roman",
        "Serif"
      ],
      myOtherFont: [
        "-apple-system",
        "system-ui"
      ]
    },
    */
    algolia: {
        apiKey: '9380938731316e972c0f423c7839983b',
        indexName: 'shmoop207_appolo',
        algoliaOptions: {} // Optional, if provided by Algolia
    },
    // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
    copyright: `Copyright © ${new Date().getFullYear()} Appolo`,

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks.
        theme: 'atom-one-dark',
    },

    // Add custom scripts here that would be placed in <script> tags.

    scripts: [
        'https://buttons.github.io/buttons.js',
        'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
        '/js/code-blocks-buttons.js',
    ],

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    // No .html extensions for paths.
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: 'img/appolo.png',
    twitterImage: 'img/appolo.png',

    scrollToTop: true,
    scrollToTopOptions: {
        zIndex: 100,
    },

    docsSideNavCollapsible: true,
    //customDocsPath: '../docs',




    // Show documentation's last contributor's name.
    // enableUpdateBy: true,

    // Show documentation's last update time.
    // enableUpdateTime: true,

    // You may provide arbitrary config keys to be used as needed by your
    // template. For example, if you need your repo's URL...
       repoUrl: 'https://github.com/shmoop207/appolo',
};

module.exports = siteConfig;
