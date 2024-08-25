import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    docs: [
        'introduction',
        {
            type: 'category',
            label: 'Getting Started',
            items: [
                'getting-started/installation',
                'getting-started/quick-start',
            ],
        },
        {
            type: 'category',
            label: 'API Reference',
            items: [
                {
                    type: 'category',
                    label: 'Components',
                    items: [
                        'api/components/Focusable',
                        'api/components/FocusRing',
                        'api/components/FocusTrap',
                        'api/components/SkipLink',
                    ],
                },
                {
                    type: 'category',
                    label: 'Context',
                    items: [
                        'api/context/FocusContext',
                    ],
                },
                {
                    type: 'category',
                    label: 'Hooks',
                    items: [
                        'api/hooks/useArrowKeyNavigation',
                        'api/hooks/useEscapeKeyClose',
                        'api/hooks/useFocusCycling',
                        'api/hooks/useFocusOnMount',
                        'api/hooks/useFocusOrder',
                        'api/hooks/useFocusReturn',
                        'api/hooks/useFocusVisible',
                        'api/hooks/useFocusWithin',
                        'api/hooks/useHomeEndKeyNavigation',
                    ],
                },
            ],
        },
        'faq'
    ],
};

export default sidebars;
