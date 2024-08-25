import React from 'react';
import Head from '@docusaurus/Head';

const StructuredData = ({
    json = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'React Refocus',
        description:
            'A robust focus management library for React, enabling seamless focus trapping, keyboard navigation, and accessibility improvements.',
        codeRepository: 'https://github.com/mallikcheripally/react-refocus',
        programmingLanguage: 'JavaScript',
        license: 'https://opensource.org/licenses/MIT',
        keywords: [
            'react-refocus',
            'react refocus',
            'javascript focus library',
            'js focus library',
            'react focus trapping',
            'react keyboard navigation',
            'react focus order',
            'react return focus',
            'manage focus',
            'react accessibility',
            'npm react-refocus',
            'react focus hooks',
        ],
        author: {
            '@type': 'Person',
            name: 'Mallik Cheripally',
        },
        datePublished: '2024-06-16',
    },
}) => {
    return (
        <Head>
            <script type="application/ld+json">{JSON.stringify(json)}</script>
        </Head>
    );
};

export default StructuredData;
