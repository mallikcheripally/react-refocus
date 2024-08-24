import { renderHook, act } from '@testing-library/react-hooks';
import { useFocusVisible } from '@/hooks/useFocusVisible';

describe('useFocusVisible', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return false initially', () => {
        const { result } = renderHook(() => useFocusVisible());
        expect(result.current).toBe(false);
    });

    it('should set focus visibility to true on "Tab" key press', () => {
        const { result } = renderHook(() => useFocusVisible());

        act(() => {
            const event = new KeyboardEvent('keydown', { key: 'Tab' });
            document.dispatchEvent(event);
        });

        expect(result.current).toBe(true);
    });

    it('should set focus visibility to true on "Shift" key press', () => {
        const { result } = renderHook(() => useFocusVisible());

        act(() => {
            const event = new KeyboardEvent('keydown', { key: 'Shift' });
            document.dispatchEvent(event);
        });

        expect(result.current).toBe(true);
    });

    it('should set focus visibility to false on mouse down', () => {
        const { result } = renderHook(() => useFocusVisible());

        act(() => {
            const keyEvent = new KeyboardEvent('keydown', { key: 'Tab' });
            document.dispatchEvent(keyEvent);
        });

        expect(result.current).toBe(true);

        act(() => {
            const mouseEvent = new MouseEvent('mousedown');
            document.dispatchEvent(mouseEvent);
        });

        expect(result.current).toBe(false);
    });

    it('should clean up event listeners on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

        const { unmount } = renderHook(() => useFocusVisible());

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

        removeEventListenerSpy.mockRestore();
    });
});
