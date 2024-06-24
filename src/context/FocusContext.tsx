import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

interface FocusContextType {
    focusedElement: HTMLElement | null;
    setFocusedElement: (element: HTMLElement | null) => void;
    focusElement: (element: HTMLElement) => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

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

export const useFocusContext = (): FocusContextType => {
    const context = useContext(FocusContext);
    if (!context) {
        throw new Error('useFocusContext must be used within a FocusProvider');
    }
    return context;
};
