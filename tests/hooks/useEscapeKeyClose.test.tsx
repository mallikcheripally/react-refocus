import { renderHook } from '@testing-library/react-hooks';
import useEscapeKeyClose from '@/hooks/useEscapeKeyClose';

describe('useEscapeKeyClose', () => {
    let closeCallback: jest.Mock;

    beforeEach(() => {
        closeCallback = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call closeCallback when Escape key is pressed', () => {
        renderHook(() => useEscapeKeyClose(closeCallback));

        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);

        expect(closeCallback).toHaveBeenCalled();
    });

    it('should not call closeCallback when other keys are pressed', () => {
        renderHook(() => useEscapeKeyClose(closeCallback));

        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        document.dispatchEvent(event);

        expect(closeCallback).not.toHaveBeenCalled();
    });

    it('should remove event listener on unmount', () => {
        const { unmount } = renderHook(() => useEscapeKeyClose(closeCallback));

        unmount();
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);

        expect(closeCallback).not.toHaveBeenCalled();
    });
});
