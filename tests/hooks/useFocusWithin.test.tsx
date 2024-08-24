import { renderHook, act } from '@testing-library/react-hooks';
import { useFocusWithin } from '@/hooks/useFocusWithin';
import { isBrowser } from '@/utils/environment';

jest.mock('@/utils/environment', () => ({
    isBrowser: jest.fn(),
}));

describe('useFocusWithin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
        (isBrowser as jest.Mock).mockReturnValue(true);
    });

    it('should return a function that sets the ref', () => {
        const { result } = renderHook(() => useFocusWithin());
        expect(typeof result.current).toBe('function');
    });

    it('should add "focus-within" class on focus within the container', () => {
        const { result } = renderHook(() => useFocusWithin());
        const container = document.createElement('div');
        result.current(container);

        act(() => {
            const inputElement = document.createElement('input');
            container.appendChild(inputElement);

            const focusEvent = new FocusEvent('focusin', {
                // @ts-ignore
                target: inputElement
            });
            container.dispatchEvent(focusEvent);
        });

        expect(container.classList.contains('focus-within')).toBe(true);
    });

    it('should remove "focus-within" class on focus out of the container', () => {
        const { result } = renderHook(() => useFocusWithin());
        const container = document.createElement('div');
        result.current(container);

        act(() => {
            container.classList.add('focus-within');
            const inputElement = document.createElement('input');
            container.appendChild(inputElement);
            const focusOutEvent = new FocusEvent('focusout', {
                // @ts-ignore
                target: inputElement,
                relatedTarget: null
            });
            container.dispatchEvent(focusOutEvent);
        });

        expect(container.classList.contains('focus-within')).toBe(false);
    });

    it('should clean up event listeners on unmount', () => {
        const addEventListenerSpy = jest.spyOn(HTMLElement.prototype, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(HTMLElement.prototype, 'removeEventListener');

        const { result, unmount } = renderHook(() => useFocusWithin());
        const container = document.createElement('div');
        result.current(container);

        unmount();

        expect(addEventListenerSpy).toHaveBeenCalledWith('focusin', expect.any(Function));
        expect(addEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('focusin', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });

    it('should not add or remove event listeners if the ref is null', () => {
        const container = document.createElement('div');

        const addEventListenerSpy = jest.spyOn(container, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(container, 'removeEventListener');

        const { result } = renderHook(() => useFocusWithin());

        act(() => {
            result.current(null);
        });

        expect(addEventListenerSpy).not.toHaveBeenCalled();
        expect(removeEventListenerSpy).not.toHaveBeenCalled();
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });


    it('should not do anything if not in a browser environment', () => {
        (isBrowser as jest.Mock).mockReturnValue(false);
        const container = document.createElement('div');
        const addEventListenerSpy = jest.spyOn(container, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(container, 'removeEventListener');

        const { result } = renderHook(() => useFocusWithin());
        result.current(container);

        expect(addEventListenerSpy).not.toHaveBeenCalled();
        expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });

    it('should handle setting the ref multiple times', () => {
        const { result } = renderHook(() => useFocusWithin());
        const container1 = document.createElement('div');
        const container2 = document.createElement('div');

        act(() => {
            result.current(container1);
        });

        act(() => {
            result.current(container2);
        });

        expect(container1.classList.contains('focus-within')).toBe(false);
        expect(container2.classList.contains('focus-within')).toBe(false);
    });

    it('should remove event listeners and set ref to null when element is set to null', () => {
        const { result } = renderHook(() => useFocusWithin());
        const container = document.createElement('div');

        const addEventListenerSpy = jest.spyOn(container, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(container, 'removeEventListener');

        act(() => {
            result.current(container);
        });

        expect(addEventListenerSpy).toHaveBeenCalledWith('focusin', expect.any(Function));
        expect(addEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));

        act(() => {
            result.current(null);
        });

        expect(removeEventListenerSpy).toHaveBeenCalledWith('focusin', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
        expect(container.classList.contains('focus-within')).toBe(false);
    });
});
