import { isBrowser } from '@/utils/environment';

describe('isBrowser', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return true when running in a browser environment', () => {
        Object.defineProperty(globalThis, 'window', { value: {}, writable: true });
        Object.defineProperty(globalThis, 'document', { value: {}, writable: true });

        expect(isBrowser()).toBe(true);
    });

    it('should return false when window is undefined', () => {
        Object.defineProperty(globalThis, 'window', { value: undefined, writable: true });
        Object.defineProperty(globalThis, 'document', { value: {}, writable: true });

        expect(isBrowser()).toBe(false);
    });

    it('should return false when document is undefined', () => {
        Object.defineProperty(globalThis, 'window', { value: {}, writable: true });
        Object.defineProperty(globalThis, 'document', { value: undefined, writable: true });

        expect(isBrowser()).toBe(false);
    });

    it('should return false when both window and document are undefined', () => {
        Object.defineProperty(globalThis, 'window', { value: undefined, writable: true });
        Object.defineProperty(globalThis, 'document', { value: undefined, writable: true });

        expect(isBrowser()).toBe(false);
    });
});
