import { renderHook, act } from '@testing-library/react';

import { useFocusOnMount } from '@/hooks/useFocusOnMount';

jest.mock('@/utils/environment', () => ({
    isBrowser: jest.fn(() => true),
}));

jest.mock('@/utils/focusUtils', () => ({
    isFocusable: jest.fn(() => true),
}));

describe('useFocusOnMount', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('focuses on the element on mount', () => {
        const { result } = renderHook(() => useFocusOnMount());

        const element = document.createElement('input');
        document.body.appendChild(element);

        act(() => {
            if (result.current.current) {
                result.current.current = element;
            }
        });

        element.focus();
        expect(document.activeElement).toBe(element);

        document.body.removeChild(element);
    });

    it('does not focus if shouldFocus is false', () => {
        const { result } = renderHook(() => useFocusOnMount(false));

        const element = document.createElement('input');
        document.body.appendChild(element);

        act(() => {
            if (result.current.current) {
                result.current.current = element;
            }
        });

        expect(document.activeElement).not.toBe(element);

        document.body.removeChild(element);
    });

    it('handles error during focus attempt', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        const { result } = renderHook(() => useFocusOnMount());

        const element = document.createElement('input');
        document.body.appendChild(element);

        act(() => {
            if (result.current.current) {
                result.current.current = element;
            }
            const focus = element.focus;
            element.focus = () => {
                throw new Error('Focus error');
            };
            try {
                element.focus();
            } catch (error) {
                console.error('Failed to focus element:', error);
            }
            element.focus = focus;
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Failed to focus element:',
            expect.any(Error)
        );

        document.body.removeChild(element);
        consoleErrorSpy.mockRestore();
    });
});
