/** @jsxImportSource @emotion/react */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FocusRing } from '@/components/FocusRing';

jest.mock('@/utils/environment', () => ({
    isBrowser: jest.fn(() => true),
}));

describe('FocusRing Component', () => {
    it('renders children correctly', () => {
        render(
            <FocusRing>
                <button>Focusable Button</button>
            </FocusRing>
        );

        expect(screen.getByText('Focusable Button')).toBeInTheDocument();
    });

    it('applies default focus ring styles on focus', () => {
        render(
            <FocusRing>
                <button>Focusable Button</button>
            </FocusRing>
        );

        const button = screen.getByText('Focusable Button');
        fireEvent.focus(button);

        expect(button).toHaveClass('focus-ring');
    });

    it('removes focus ring class on blur', () => {
        render(
            <FocusRing>
                <button>Focusable Button</button>
            </FocusRing>
        );

        const button = screen.getByText('Focusable Button');
        fireEvent.focus(button);
        fireEvent.blur(button);

        expect(button).not.toHaveClass('focus-ring');
    });

    it('applies custom focus ring styles', () => {
        const customStyle = {
            border: '2px solid red',
            boxShadow: '0 0 0 2px rgba(255, 0, 0, 0.5)',
        };

        render(
            <FocusRing ringStyle={customStyle}>
                <button>Focusable Button</button>
            </FocusRing>
        );

        const button = screen.getByText('Focusable Button');
        fireEvent.focus(button);

        expect(button).toHaveClass('focus-ring');
    });

    it('applies additional class names correctly', () => {
        const className = 'custom-class';

        render(
            <FocusRing className={className}>
                <button>Focusable Button</button>
            </FocusRing>
        );

        const wrapper = screen.getByText('Focusable Button').parentElement;
        expect(wrapper).toHaveClass('custom-class');
    });
});
