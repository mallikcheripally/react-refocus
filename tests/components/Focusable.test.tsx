import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Focusable } from '@/components/Focusable';

jest.mock('@/utils/environment', () => ({
    isBrowser: jest.fn(() => true),
}));

describe('Focusable', () => {
    it('renders children correctly', () => {
        render(
            <Focusable>
                <span>Focusable Content</span>
            </Focusable>,
        );

        expect(screen.getByText('Focusable Content')).toBeInTheDocument();
    });

    it('applies the provided tabIndex to the element', () => {
        render(
            <Focusable tabIndex={1}>
                <span>Focusable Content</span>
            </Focusable>,
        );

        expect(screen.getByText('Focusable Content').parentElement).toHaveAttribute('tabindex', '1');
    });

    it('calls the onFocus callback when the element gains focus', () => {
        const handleFocus = jest.fn();

        render(
            <Focusable onFocus={handleFocus}>
                <span>Focusable Content</span>
            </Focusable>,
        );

        fireEvent.focus(screen.getByText('Focusable Content').parentElement!);

        expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls the onBlur callback when the element loses focus', () => {
        const handleBlur = jest.fn();

        render(
            <Focusable onBlur={handleBlur}>
                <span>Focusable Content</span>
            </Focusable>,
        );

        fireEvent.blur(screen.getByText('Focusable Content').parentElement!);

        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('applies the provided className to the element', () => {
        const className = 'custom-class';

        render(
            <Focusable className={className}>
                <span>Focusable Content</span>
            </Focusable>,
        );

        expect(screen.getByText('Focusable Content').parentElement).toHaveClass(className);
    });

    it('uses a default tabIndex of 0 if none is provided', () => {
        render(
            <Focusable>
                <span>Focusable Content</span>
            </Focusable>,
        );

        expect(screen.getByText('Focusable Content').parentElement).toHaveAttribute('tabindex', '0');
    });
});
