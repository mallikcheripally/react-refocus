import React from 'react';

import { isBrowser } from 'utils/environment';

/**
 * SkipLinkProps
 *
 * @property {string} href - The target ID to skip to (e.g., "#main-content").
 * @property {React.ReactNode} children - The content to be rendered inside the SkipLink.
 * @property {string} [className] - Additional class names to apply to the SkipLink.
 */
interface SkipLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * SkipLink
 *
 * Provides a skip link to navigate to the main content quickly, improving navigation for keyboard and screen reader users.
 *
 * @param {SkipLinkProps} props - The props for the SkipLink component.
 * @returns {JSX.Element} - The rendered SkipLink component.
 */
export const SkipLink: React.FC<SkipLinkProps> = ({ href, children, className }) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (isBrowser()) {
            const target = document.querySelector(href) as HTMLElement | null;
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
                target.removeAttribute('tabindex');
            } else {
                console.warn(`Skip link target "${href}" not found.`);
            }
        } else {
            event.preventDefault();
        }
    };

    return (
        <a href={href} className={className} onClick={handleClick}>
            {children}
        </a>
    );
};
