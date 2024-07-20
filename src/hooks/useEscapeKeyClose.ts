import { useEffect } from 'react';

/**
 * useEscapeKeyClose
 *
 * A custom hook to handle the Escape key press event and trigger a callback.
 *
 * @param {() => void} closeCallback - The callback function to execute on Escape key press.
 */
const useEscapeKeyClose = (closeCallback: () => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeCallback();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeCallback]);
};

export default useEscapeKeyClose;
