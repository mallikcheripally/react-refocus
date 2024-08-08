import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import useFocusCycling from '@/hooks/useFocusCycling';

describe('useFocusCycling', () => {
    const TestComponent = () => {
        const containerRef = useRef<HTMLDivElement>(null);
        useFocusCycling(containerRef);

        return (
            <div ref={containerRef}>
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
            </div>
        );
    };

    it('cycles focus forward through focusable elements', () => {
        const { getByText } = render(<TestComponent />);
        const button1 = getByText('Button 1');
        const button2 = getByText('Button 2');
        const button3 = getByText('Button 3');

        button1.focus();
        expect(button1).toHaveFocus();

        fireEvent.keyDown(button1, { key: 'Tab', code: 'Tab' });
        expect(button2).toHaveFocus();

        fireEvent.keyDown(button2, { key: 'Tab', code: 'Tab' });
        expect(button3).toHaveFocus();

        fireEvent.keyDown(button3, { key: 'Tab', code: 'Tab' });
        expect(button1).toHaveFocus();
    });

    it('cycles focus backward through focusable elements', () => {
        const { getByText } = render(<TestComponent />);
        const button1 = getByText('Button 1');
        const button2 = getByText('Button 2');
        const button3 = getByText('Button 3');

        button1.focus();
        expect(button1).toHaveFocus();

        fireEvent.keyDown(button1, { key: 'Tab', code: 'Tab', shiftKey: true });
        expect(button3).toHaveFocus();

        fireEvent.keyDown(button3, { key: 'Tab', code: 'Tab', shiftKey: true });
        expect(button2).toHaveFocus();

        fireEvent.keyDown(button2, { key: 'Tab', code: 'Tab', shiftKey: true });
        expect(button1).toHaveFocus();
    });
});
