import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useFocusOrder } from '@/hooks/useFocusOrder';

const TestComponent: React.FC<{ order: number }> = ({ order }) => {
    const ref = useFocusOrder(order);
    return (
        // @ts-ignore
        <div ref={ref} data-testid="focusable-element">
            Focusable Element
        </div>
    );
};

describe('useFocusOrder Hook', () => {
    it('sets the tabIndex of the element based on the order prop', () => {
        const order = 5;
        render(<TestComponent order={order} />);
        const element = screen.getByTestId('focusable-element');
        expect(element).toHaveAttribute('tabindex', order.toString());
    });

    it('updates the tabIndex when the order prop changes', () => {
        const { rerender } = render(<TestComponent order={1} />);
        const element = screen.getByTestId('focusable-element');
        expect(element).toHaveAttribute('tabindex', '1');

        rerender(<TestComponent order={2} />);
        expect(element).toHaveAttribute('tabindex', '2');
    });

    it('does not set tabIndex if the ref is not attached to an element', () => {
        const TestComponentWithoutElement: React.FC<{ order: number }> = ({ order }) => {
            useFocusOrder(order);
            return null;
        };

        const { container } = render(<TestComponentWithoutElement order={3} />);
        expect(container.firstChild).toBeNull();
    });
});
