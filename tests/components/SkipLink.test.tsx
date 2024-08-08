import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SkipLink } from '@/components/SkipLink';

// Mock the isBrowser function to always return true during tests
jest.mock('@/utils/environment', () => ({
    isBrowser: jest.fn(() => true),
}));

describe('SkipLink Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('renders children correctly', () => {
        render(
            <SkipLink href="#main-content">Skip to main content</SkipLink>
        );

        expect(screen.getByText('Skip to main content')).toBeInTheDocument();
    });

    it('applies additional class names correctly', () => {
        const className = 'custom-class';

        render(
            <SkipLink href="#main-content" className={className}>
                Skip to main content
            </SkipLink>
        );

        const linkElement = screen.getByText('Skip to main content');
        expect(linkElement).toHaveClass(className);
    });

    it('focuses the target element on click', () => {
        document.body.innerHTML = `
            <div id="main-content">Main Content</div>
        `;

        render(
            <SkipLink href="#main-content">Skip to main content</SkipLink>
        );

        const linkElement = screen.getByText('Skip to main content');
        const targetElement = document.getElementById('main-content')!;

        fireEvent.click(linkElement);

        expect(targetElement).toHaveFocus();
    });

    it('warns if the target element is not found', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

        render(
            <SkipLink href="#non-existent">Skip to non-existent content</SkipLink>
        );

        const linkElement = screen.getByText('Skip to non-existent content');
        fireEvent.click(linkElement);

        expect(consoleWarnSpy).toHaveBeenCalledWith('Skip link target "#non-existent" not found.');

        consoleWarnSpy.mockRestore();
    });

    it('prevents default behavior if not in a browser environment', () => {
        jest.resetModules(); // Reset the module cache
        // Re-mock isBrowser to return false for this specific test
        jest.mock('@/utils/environment', () => ({
            __esModule: true,  // This is important to allow using require in CommonJS
            ...jest.requireActual('@/utils/environment'),
            isBrowser: jest.fn(() => false),
        }));

        // Import the component again to apply the new mock
        const { SkipLink } = require('@/components/SkipLink');

        document.body.innerHTML = `
            <div id="main-content">Main Content</div>
        `;

        render(
            <SkipLink href="#main-content">Skip to main content</SkipLink>
        );

        const linkElement = screen.getByText('Skip to main content');

        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        linkElement.dispatchEvent(event);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });
});
