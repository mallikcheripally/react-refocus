import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

/**
 * FocusContextType
 *
 * This interface defines the structure for the focus context, which includes:
 * - `focusedElement`: The current element that is focused.
 * - `setFocusedElement`: A function to update the focused element.
 * - `focusElement`: A function to set focus on a specified element and update the state.
 */
interface FocusContextType {
    focusedElement: HTMLElement | null;
    setFocusedElement: (element: HTMLElement | null) => void;
    focusElement: (element: HTMLElement) => void;
}

// Create a context with a default undefined value for type safety
const FocusContext = createContext<FocusContextType | undefined>(undefined);

/**
 * FocusProvider
 *
 * A provider component that encapsulates the focus management logic and provides context
 * to its children. It manages the currently focused element and allows components to update
 * focus programmatically.
 *
 * @param {ReactNode} children - The child components that need access to the focus context.
 * @returns {JSX.Element} - The provider component wrapping its children.
 */
export const FocusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
    const previousFocusedElement = useRef<HTMLElement | null>(null);

    const focusElement = (element: HTMLElement) => {
        if (previousFocusedElement.current) {
            previousFocusedElement.current.blur();
        }
        element.focus();
        setFocusedElement(element);
        previousFocusedElement.current = element;
    };

    return (
        <FocusContext.Provider value={{ focusedElement, setFocusedElement, focusElement }}>
            {children}
        </FocusContext.Provider>
    );
};

/**
 * useFocusContext
 *
 * A custom hook that provides access to the focus context. It throws an error if used outside
 * of the FocusProvider to ensure the hook is used correctly within the component tree.
 *
 * @returns {FocusContextType} - The current context value for focus management.
 */
export const useFocusContext = (): FocusContextType => {
    const context = useContext(FocusContext);
    if (!context) {
        throw new Error('useFocusContext must be used within a FocusProvider');
    }
    return context;
};
