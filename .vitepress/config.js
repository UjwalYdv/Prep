import markdownItKatex from 'markdown-it-katex'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const base = process.env.VERCEL ? '/' : '/Prep/'

export default withMermaid(
    defineConfig({
        title: 'ElevateU',
        description: 'Complete CS Preparation - DSA, LLD, OS, DBMS, CN, SQL',
        base,
        head: [
            ['link', { rel: 'icon', href: `${base}favicons/favicon.ico` }],
            ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicons/favicon.svg` }],
            ['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: `${base}favicons/favicon-96x96.png` }],
            ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `${base}favicons/apple-touch-icon.png` }],
            ['link', { rel: 'manifest', href: `${base}favicons/site.webmanifest` }],
        ],
        ignoreDeadLinks: true,

        mermaid: {
            // refer to https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
        },

        // optionally set additional config for plugin itself with MermaidPluginConfig
        mermaidPlugin: {
            class: 'mermaid my-class', // set additional css classes for parent container
        },

        themeConfig: {
            logo: {
                src: 'https://res.cloudinary.com/dzgoq3ikq/image/upload/v1763727602/ele-copy-removebg-preview_yuhev5.png',
            },
            siteTitle: false,
            nav: [
                { text: '🏠 Home', link: '/' },
                { text: '🎓 Academics', link: '/branch/' },
                {
                    text: '<img src="https://res.cloudinary.com/dzgoq3ikq/image/upload/v1760785019/icons8-leetcode-96_mmv1f2.png" style="width:16px;height:16px;display:inline;margin-right:4px;vertical-align:text-top;">Leetcode Solutions',
                    link: '/Leetcode/',
                },
                {
                    text: '📚 Core CS',
                    items: [
                        { text: '⚡ DSA', link: '/DSA/' },
                        { text: '💻 Operating System', link: '/OS/' },
                        { text: '📂 Database', link: '/DB/' },
                        { text: '🌐 Computer Networks', link: '/CN/' },
                        { text: '🧮 SQL', link: '/SQL/' },
                    ],
                },
                {
                    text: '💻 Programming',
                    items: [
                        {
                            text: '<img src="https://res.cloudinary.com/dzgoq3ikq/image/upload/v1760784601/icons8-c_-96_thpbq1.png" style="width:16px;height:16px;display:inline;margin-right:4px;vertical-align:text-top;">C++',
                            link: '/c++/',
                        },
                        {
                            text: '<img src="https://res.cloudinary.com/dzgoq3ikq/image/upload/v1760784845/icons8-java-96_lwbywj.png" style="width:16px;height:16px;display:inline;margin-right:4px;vertical-align:text-top;">Java & OOP',
                            link: '/Java%20with%20OOP/',
                        },
                    ],
                },
                // { text: "🛠 LLD", link: "/LLD/" },
                { text: '👔 Interview Exp', link: '/Interview/' },
                { text: '👥 Contributors', link: '/contributors/' },
            ],

            sidebar: {
                '/DSA/': [
                    {
                        text: 'Arrays',
                        collapsed: false,
                    },
                    {
                        text: 'Algorithms',
                        collapsed: false,
                    },
                    {
                        text: 'Data Structures',
                        collapsed: false,
                    },
                    {
                        text: 'Advanced Topics',
                        collapsed: false,
                    },
                ],

                '/LLD/': [
                    {
                        text: 'Fundamentals',
                        items: [
                            {
                                text: 'What is LLD?',
                                link: '/LLD/01-fundamentals/01-what-is-lld',
                            },
                            {
                                text: 'UML Basics',
                                link: '/LLD/01-fundamentals/03-uml-basics',
                            },
                        ],
                    },
                    {
                        text: 'SOLID Principles',
                        items: [
                            { text: 'Overview', link: '/LLD/02-solid-principles/' },
                            { text: 'SRP', link: '/LLD/02-solid-principles/01-srp' },
                            { text: 'OCP', link: '/LLD/02-solid-principles/02-ocp' },
                            { text: 'LSP', link: '/LLD/02-solid-principles/03-lsp' },
                            { text: 'ISP', link: '/LLD/02-solid-principles/04-isp' },
                            { text: 'DIP', link: '/LLD/02-solid-principles/05-dip' },
                        ],
                    },
                    {
                        text: 'Design Patterns',
                        items: [
                            { text: 'Overview', link: '/LLD/03-design-patterns/' },
                            {
                                text: 'Singleton',
                                link: '/LLD/03-design-patterns/01-singleton/',
                            },
                            { text: 'Factory', link: '/LLD/03-design-patterns/02-factory/' },
                            {
                                text: 'Observer',
                                link: '/LLD/03-design-patterns/03-observer/',
                            },
                            {
                                text: 'Strategy',
                                link: '/LLD/03-design-patterns/04-strategy/',
                            },
                            { text: 'Command', link: '/LLD/03-design-patterns/05-command/' },
                            {
                                text: 'Decorator',
                                link: '/LLD/03-design-patterns/06-decorator/',
                            },
                            { text: 'Builder', link: '/LLD/03-design-patterns/07-builder/' },
                        ],
                    },
                    {
                        text: 'Case Studies',
                        items: [
                            { text: 'Overview', link: '/LLD/05-case-studies/' },
                            {
                                text: 'Parking Lot',
                                link: '/LLD/05-case-studies/01-parking-lot/',
                            },
                        ],
                    },
                ],

                '/Java%20with%20OOP/': [
                    {
                        text: 'OOP Concepts',
                        items: [
                            { text: 'Overview', link: '/Java%20with%20OOP/OOP/' },
                            {
                                text: 'Encapsulation',
                                link: '/Java%20with%20OOP/OOP/Encapsulation/',
                            },
                            {
                                text: 'Inheritance',
                                link: '/Java%20with%20OOP/OOP/Inheritance/',
                            },
                            {
                                text: 'Abstraction',
                                link: '/Java%20with%20OOP/OOP/Abstraction/',
                            },
                        ],
                    },
                    {
                        text: 'Advanced Java',
                        items: [
                            {
                                text: 'Exception Handling',
                                link: '/Java%20with%20OOP/Exception%20Handling/',
                            },
                            {
                                text: 'MultiThreading',
                                link: '/Java%20with%20OOP/MultiThreading/',
                            },
                            {
                                text: 'Garbage Collection',
                                link: '/Java%20with%20OOP/Garbage%20Collection/',
                            },
                        ],
                    },
                ],
            },

            search: {
                provider: 'local',
            },

            socialLinks: [
                {
                    text: 'github',
                    icon: 'github',
                    link: 'https://github.com/raj8664/Prep',
                },
            ],
        },

        markdown: {
            lineNumbers: true,
            theme: {
                light: 'github-light',
                dark: 'github-dark',
            },
            html: true,
            config: (md) => {
                md.use(markdownItKatex, {
                    output: 'html',
                    throwOnError: false,
                    errorColor: ' #cc0000',
                    copy_tex: false,
                })
            },
        },
    }),
)
