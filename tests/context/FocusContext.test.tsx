import React, { useRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FocusProvider, useFocusContext } from '@/context/FocusContext';

const TestComponent: React.FC = () => {
    const { focusedElement, setFocusedElement, focusElement } = useFocusContext();
    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);

    return (
        <div>
            <input ref={inputRef1} data-testid="test-input-1" />
            <input ref={inputRef2} data-testid="test-input-2" />
            <button onClick={() => focusElement(inputRef1.current!)}>Focus Input 1</button>
            <button onClick={() => focusElement(inputRef2.current!)}>Focus Input 2</button>
            <button onClick={() => setFocusedElement(null)}>Clear Focus</button>
            <span data-testid="focused-element">{focusedElement ? focusedElement.tagName : 'None'}</span>
        </div>
    );
};

describe('FocusContext', () => {
    it('provides context values to children', () => {
        render(
            <FocusProvider>
                <TestComponent />
            </FocusProvider>,
        );

        const input1 = screen.getByTestId('test-input-1') as HTMLInputElement;
        const input2 = screen.getByTestId('test-input-2') as HTMLInputElement;
        const focusButton1 = screen.getByText('Focus Input 1');
        const focusButton2 = screen.getByText('Focus Input 2');
        const focusedElementDisplay = screen.getByTestId('focused-element');

        expect(focusedElementDisplay).toHaveTextContent('None');

        fireEvent.click(focusButton1);
        expect(document.activeElement).toBe(input1);
        expect(focusedElementDisplay).toHaveTextContent('INPUT');

        const blurSpy = jest.spyOn(input1, 'blur');

        fireEvent.click(focusButton2);
        expect(document.activeElement).toBe(input2);
        expect(focusedElementDisplay).toHaveTextContent('INPUT');
        expect(blurSpy).toHaveBeenCalled();

        fireEvent.click(screen.getByText('Clear Focus'));
        expect(focusedElementDisplay).toHaveTextContent('None');
    });

    it('throws an error if useFocusContext is used outside of FocusProvider', () => {
        const renderWithoutProvider = () =>
            render(
                <div>
                    <TestComponent />
                </div>,
            );

        expect(renderWithoutProvider).toThrow('useFocusContext must be used within a FocusProvider');
    });
});
