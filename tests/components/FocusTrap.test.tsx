import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FocusTrap } from '@/components/FocusTrap';

// Mock the isBrowser function to always return true during tests
jest.mock('@/utils/environment', () => ({
    isBrowser: jest.fn(() => true),
}));

describe('FocusTrap Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders children correctly', () => {
        render(
            <FocusTrap>
                <button>Button 1</button>
                <button>Button 2</button>
            </FocusTrap>,
        );

        expect(screen.getByText('Button 1')).toBeInTheDocument();
        expect(screen.getByText('Button 2')).toBeInTheDocument();
    });

    it('redirects focus to the first focusable element when focus is set outside the container', () => {
        render(
            <>
                <button>Outside Button</button>
                <FocusTrap>
                    <button>Button 1</button>
                    <button>Button 2</button>
                </FocusTrap>
            </>,
        );

        const outsideButton = screen.getByText('Outside Button');
        const insideButton1 = screen.getByText('Button 1');
        const currentContainer = insideButton1.parentElement as HTMLDivElement;

        fireEvent.focusIn(outsideButton);

        const focusEvent = new FocusEvent('focusin', { bubbles: true });
        Object.defineProperty(focusEvent, 'target', { writable: false, value: outsideButton });
        currentContainer.dispatchEvent(focusEvent);

        expect(insideButton1).toHaveFocus();
    });

    it('traps focus within the container', () => {
        render(
            <FocusTrap>
                <button>Button 1</button>
                <button>Button 2</button>
            </FocusTrap>,
        );

        const buttons = screen.getAllByRole('button');
        const container = buttons[0].parentElement!;

        buttons[0].focus();
        expect(buttons[0]).toHaveFocus();

        fireEvent.keyDown(container, { key: 'Tab', code: 'Tab' });
        expect(buttons[1]).toHaveFocus();

        fireEvent.keyDown(container, { key: 'Tab', code: 'Tab', shiftKey: true });
        expect(buttons[0]).toHaveFocus();

        fireEvent.keyDown(container, { key: 'Tab', code: 'Tab' });
        expect(buttons[1]).toHaveFocus();

        fireEvent.keyDown(container, { key: 'Tab', code: 'Tab' });
        expect(buttons[0]).toHaveFocus();

        // Shift + Tab should move focus back to the last element
        fireEvent.keyDown(container, { key: 'Tab', code: 'Tab', shiftKey: true });
        expect(buttons[1]).toHaveFocus();
    });

    it('applies additional class names correctly', () => {
        const className = 'custom-class';

        render(
            <FocusTrap className={className}>
                <button>Button 1</button>
            </FocusTrap>,
        );

        const container = screen.getByText('Button 1').parentElement;
        expect(container).toHaveClass(className);
    });

    it('uses the ref to access the container element', () => {
        const ref = createRef<HTMLDivElement>();

        render(
            <FocusTrap ref={ref}>
                <button>Button 1</button>
            </FocusTrap>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('handles no focusable elements gracefully', () => {
        render(
            <FocusTrap>
                <div>Non-focusable Content</div>
            </FocusTrap>,
        );

        const container = screen.getByText('Non-focusable Content').parentElement;
        expect(container).toBeInTheDocument();

        // Simulate Tab key press, should not throw errors
        fireEvent.keyDown(container!, { key: 'Tab', code: 'Tab' });
        expect(document.activeElement).not.toBe(null);
    });

    it('adds and removes event listeners on mount and unmount', () => {
        const addEventListenerSpy = jest.spyOn(HTMLDivElement.prototype, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(HTMLDivElement.prototype, 'removeEventListener');

        const { unmount, container } = render(
            <FocusTrap>
                <button>Button 1</button>
            </FocusTrap>,
        );

        expect(container).not.toBe(null);

        fireEvent.keyDown(container, { key: 'Tab', code: 'Tab', bubbles: true });

        expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
        expect(addEventListenerSpy).toHaveBeenCalledWith('focusin', expect.any(Function));

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('focusin', expect.any(Function));
    });
});
