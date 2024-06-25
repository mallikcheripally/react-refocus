import { useEffect, useState } from 'react';

/**
 * useFocusVisible
 *
 * A hook to manage focus visibility state, helping to distinguish
 * between keyboard focus and mouse focus.
 *
 * @returns {boolean} - Whether the focus is visible due to keyboard interaction.
 */
export const useFocusVisible = (): boolean => {
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Tab' || event.key === 'Shift') {
                setIsFocusVisible(true);
            }
        };

        const handleMouseDown = () => {
            setIsFocusVisible(false);
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    return isFocusVisible;
};
