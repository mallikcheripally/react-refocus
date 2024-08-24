import { isFocusable, getFocusableElements } from '@/utils/focusUtils';

describe('focusUtils', () => {

    describe('isFocusable', () => {
        it('should return false if the element is null', () => {
            expect(isFocusable(null as unknown as HTMLElement)).toBe(false);
        });

        it('should return true for a focusable anchor element', () => {
            const element = document.createElement('a');
            element.setAttribute('href', '#');
            expect(isFocusable(element)).toBe(true);
        });

        it('should return true for a focusable button element', () => {
            const element = document.createElement('button');
            expect(isFocusable(element)).toBe(true);
        });

        it('should return true for a focusable textarea element', () => {
            const element = document.createElement('textarea');
            expect(isFocusable(element)).toBe(true);
        });

        it('should return true for a focusable input element', () => {
            const element = document.createElement('input');
            expect(isFocusable(element)).toBe(true);
        });

        it('should return true for a focusable select element', () => {
            const element = document.createElement('select');
            expect(isFocusable(element)).toBe(true);
        });

        it('should return true for a focusable iframe element', () => {
            const element = document.createElement('iframe');
            expect(isFocusable(element)).toBe(true);
        });

        it('should return true for a contenteditable element', () => {
            const element = document.createElement('div');
            element.setAttribute('contenteditable', 'true');
            expect(isFocusable(element)).toBe(true);
        });

        it('should return true for an element with a positive tabindex', () => {
            const element = document.createElement('div');
            element.setAttribute('tabindex', '0');
            expect(isFocusable(element)).toBe(true);
        });

        it('should return false for an element with tabindex -1', () => {
            const element = document.createElement('div');
            element.setAttribute('tabindex', '-1');
            expect(isFocusable(element)).toBe(false);
        });

        it('should return false for a non-focusable element', () => {
            const element = document.createElement('div');
            expect(isFocusable(element)).toBe(false);
        });
    });

    describe('getFocusableElements', () => {
        it('should return an empty NodeList if there are no focusable elements', () => {
            const container = document.createElement('div');
            const focusableElements = getFocusableElements(container);
            expect(focusableElements.length).toBe(0);
        });

        it('should return all focusable elements within a container', () => {
            const container = document.createElement('div');
            container.innerHTML = `
                <a href="#">Link</a>
                <button>Button</button>
                <textarea></textarea>
                <input type="text" />
                <select><option>Option</option></select>
                <iframe></iframe>
                <div contenteditable="true"></div>
                <div tabindex="0">Tabindex 0</div>
            `;
            const focusableElements = getFocusableElements(container);
            expect(focusableElements.length).toBe(8);
        });

        it('should ignore elements with tabindex -1', () => {
            const container = document.createElement('div');
            container.innerHTML = `
                <a href="#">Link</a>
                <div tabindex="-1">Tabindex -1</div>
            `;
            const focusableElements = getFocusableElements(container);
            expect(focusableElements.length).toBe(1);
        });
    });
});
