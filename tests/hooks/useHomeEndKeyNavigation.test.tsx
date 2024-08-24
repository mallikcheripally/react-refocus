import { renderHook } from '@testing-library/react-hooks';
import useHomeEndKeyNavigation from '@/hooks/useHomeEndKeyNavigation';

describe('useHomeEndKeyNavigation', () => {
    let containerRef: React.RefObject<HTMLElement>;

    beforeEach(() => {
        containerRef = { current: document.createElement('div') };
        document.body.appendChild(containerRef.current!);
    });

    afterEach(() => {
        document.body.removeChild(containerRef.current!);
    });

    it('should focus the first element when Home key is pressed', () => {
        const firstElement = document.createElement('button');
        const secondElement = document.createElement('button');

        containerRef.current?.appendChild(firstElement);
        containerRef.current?.appendChild(secondElement);

        renderHook(() => useHomeEndKeyNavigation(containerRef));

        const event = new KeyboardEvent('keydown', { key: 'Home' });
        containerRef.current?.dispatchEvent(event);

        expect(firstElement).toHaveFocus();
    });

    it('should focus the last element when End key is pressed', () => {
        const firstElement = document.createElement('button');
        const lastElement = document.createElement('button');

        containerRef.current?.appendChild(firstElement);
        containerRef.current?.appendChild(lastElement);

        renderHook(() => useHomeEndKeyNavigation(containerRef));

        const event = new KeyboardEvent('keydown', { key: 'End' });
        containerRef.current?.dispatchEvent(event);

        expect(lastElement).toHaveFocus();
    });

    it('should prevent default behavior when Home key is pressed', () => {
        const firstElement = document.createElement('button');
        containerRef.current?.appendChild(firstElement);

        renderHook(() => useHomeEndKeyNavigation(containerRef));

        const event = new KeyboardEvent('keydown', { key: 'Home' });
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        containerRef.current?.dispatchEvent(event);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should prevent default behavior when End key is pressed', () => {
        const lastElement = document.createElement('button');
        containerRef.current?.appendChild(lastElement);

        renderHook(() => useHomeEndKeyNavigation(containerRef));

        const event = new KeyboardEvent('keydown', { key: 'End' });
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        containerRef.current?.dispatchEvent(event);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not do anything if there are no focusable elements', () => {
        renderHook(() => useHomeEndKeyNavigation(containerRef));

        const event = new KeyboardEvent('keydown', { key: 'Home' });
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        containerRef.current?.dispatchEvent(event);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should clean up event listeners on unmount', () => {
        const addEventListenerSpy = jest.spyOn(containerRef.current!, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(containerRef.current!, 'removeEventListener');

        const { unmount } = renderHook(() => useHomeEndKeyNavigation(containerRef));

        unmount();

        expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('should support custom focusable element selectors', () => {
        const customElement = document.createElement('custom-element');
        customElement.setAttribute('tabindex', '0');
        containerRef.current?.appendChild(customElement);

        renderHook(() => useHomeEndKeyNavigation(containerRef, ['custom-element']));

        const event = new KeyboardEvent('keydown', { key: 'Home' });
        containerRef.current?.dispatchEvent(event);

        expect(customElement).toHaveFocus();
    });

    it('should not trigger focus or prevent default for other keys', () => {
        const firstElement = document.createElement('button');
        containerRef.current?.appendChild(firstElement);
        firstElement.focus();

        renderHook(() => useHomeEndKeyNavigation(containerRef));

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        containerRef.current?.dispatchEvent(event);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
        expect(firstElement).toHaveFocus();
    });
});
