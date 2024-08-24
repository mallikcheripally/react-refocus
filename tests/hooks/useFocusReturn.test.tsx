import { renderHook } from '@testing-library/react-hooks';
import { useFocusReturn } from '@/hooks/useFocusReturn';
import { isBrowser } from '@/utils/environment';
import { isFocusable } from '@/utils/focusUtils';

jest.mock('@/utils/environment', () => ({
    isBrowser: jest.fn(),
}));

jest.mock('@/utils/focusUtils', () => ({
    isFocusable: jest.fn(),
}));

describe('useFocusReturn', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
        document.body.focus();
    });

    it('should save the currently focused element when mounted', () => {
        (isBrowser as jest.Mock).mockReturnValue(true);

        const inputElement = document.createElement('input');
        document.body.appendChild(inputElement);
        inputElement.focus();

        const { unmount } = renderHook(() => useFocusReturn());

        expect(document.activeElement).toBe(inputElement);

        unmount();
    });

    it('should return focus to the previously focused element on unmount', () => {
        (isBrowser as jest.Mock).mockReturnValue(true);

        const inputElement = document.createElement('input');
        const focusSpy = jest.spyOn(inputElement, 'focus');
        document.body.appendChild(inputElement);
        inputElement.focus();

        const { unmount } = renderHook(() => useFocusReturn());

        const newElement = document.createElement('button');
        document.body.appendChild(newElement);
        newElement.focus();
        (isFocusable as jest.Mock).mockReturnValue(true);
        unmount();
        expect(focusSpy).toHaveBeenCalled();
    });

    it('should not save focus if the active element is the body', () => {
        (isBrowser as jest.Mock).mockReturnValue(true);
        document.body.focus();
        const { unmount } = renderHook(() => useFocusReturn());
        expect(document.activeElement?.tagName).toBe('BODY');
        unmount();
        expect(document.activeElement?.tagName).toBe('BODY');
    });

    it('should log an error if focus restoration fails', () => {
        (isBrowser as jest.Mock).mockReturnValue(true);
        const inputElement = document.createElement('input');
        document.body.appendChild(inputElement);
        inputElement.focus();
        const { unmount } = renderHook(() => useFocusReturn());
        const focusSpy = jest.spyOn(inputElement, 'focus').mockImplementation(() => {
            throw new Error('Focus failed');
        });
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        unmount();
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Failed to return focus to the previous element:',
            expect.any(Error),
        );

        focusSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});
