import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import useArrowKeyNavigation from '@/hooks/useArrowKeyNavigation';

const TestComponent: React.FC<{ customSelectors?: string[] }> = ({ customSelectors = [] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useArrowKeyNavigation(containerRef, customSelectors);

    return (
        <div ref={containerRef} tabIndex={-1}>
            <button>Button 1</button>
            <button>Button 2</button>
            <input type="text" />
            <textarea></textarea>
            <a href="#">Link</a>
            <button>Button 3</button>
        </div>
    );
};

describe('useArrowKeyNavigation', () => {
    it('navigates focus with ArrowDown and ArrowUp keys', () => {
        const { getAllByRole } = render(<TestComponent />);
        const buttons = getAllByRole('button');
        const input = getAllByRole('textbox')[0];
        const textarea = getAllByRole('textbox')[1];

        // Focus the first button
        buttons[0].focus();
        expect(buttons[0]).toHaveFocus();

        // Press ArrowDown to move focus to the second button
        fireEvent.keyDown(buttons[0], { key: 'ArrowDown', code: 'ArrowDown' });
        expect(buttons[1]).toHaveFocus();

        // Press ArrowDown to move focus to the input
        fireEvent.keyDown(buttons[1], { key: 'ArrowDown', code: 'ArrowDown' });
        expect(input).toHaveFocus();

        // Press ArrowDown to move focus to the textarea
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' });
        expect(textarea).toHaveFocus();

        // Press ArrowUp to move focus back to the input
        fireEvent.keyDown(textarea, { key: 'ArrowUp', code: 'ArrowUp' });
        expect(input).toHaveFocus();

        // Press ArrowUp to move focus back to the second button
        fireEvent.keyDown(input, { key: 'ArrowUp', code: 'ArrowUp' });
        expect(buttons[1]).toHaveFocus();
    });

    it('navigates focus with ArrowRight and ArrowLeft keys', () => {
        const { getAllByRole } = render(<TestComponent />);
        const buttons = getAllByRole('button');
        const input = getAllByRole('textbox')[0];
        const textarea = getAllByRole('textbox')[1];

        // Focus the first button
        buttons[0].focus();
        expect(buttons[0]).toHaveFocus();

        // Press ArrowRight to move focus to the second button
        fireEvent.keyDown(buttons[0], { key: 'ArrowRight', code: 'ArrowRight' });
        expect(buttons[1]).toHaveFocus();

        // Press ArrowRight to move focus to the input
        fireEvent.keyDown(buttons[1], { key: 'ArrowRight', code: 'ArrowRight' });
        expect(input).toHaveFocus();

        // Press ArrowRight to move focus to the textarea
        fireEvent.keyDown(input, { key: 'ArrowRight', code: 'ArrowRight' });
        expect(textarea).toHaveFocus();

        // Press ArrowLeft to move focus back to the input
        fireEvent.keyDown(textarea, { key: 'ArrowLeft', code: 'ArrowLeft' });
        expect(input).toHaveFocus();

        // Press ArrowLeft to move focus back to the second button
        fireEvent.keyDown(input, { key: 'ArrowLeft', code: 'ArrowLeft' });
        expect(buttons[1]).toHaveFocus();
    });

    it('respects custom selectors', () => {
        const { getByText } = render(<TestComponent customSelectors={['a']} />);
        const link = getByText('Link');

        // Focus the link
        link.focus();
        expect(link).toHaveFocus();

        // Press ArrowDown to move focus to the next button
        fireEvent.keyDown(link, { key: 'ArrowDown', code: 'ArrowDown' });
        expect(getByText('Button 3')).toHaveFocus();

        // Press ArrowUp to move focus back to the link
        fireEvent.keyDown(getByText('Button 3'), { key: 'ArrowUp', code: 'ArrowUp' });
        expect(link).toHaveFocus();
    });

    it('does not navigate if there are no focusable elements', () => {
        const { container } = render(<div />);
        const div = container.firstChild as HTMLDivElement;

        fireEvent.keyDown(div, { key: 'ArrowDown', code: 'ArrowDown' });

        expect(document.activeElement).toBe(document.body);
    });
});
