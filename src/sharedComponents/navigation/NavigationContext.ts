import React, { createContext, useContext, useState } from "react";

interface NavigationContextValue {
    openCategory: (title: string) => void;
    closeCategory: (title: string) => void;
    closeAllCategories: () => void;
    focusFirstOpenCategory: () => void;
    getLinks: () => Array<{ name: string; path?: string; itemList?: { name: string; path: string }[] }>;
    isCategoryOpen: (title: string) => boolean;
    toggleCategory: (title: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

/** ----------------------------------------------------------------------------------------- *
 * Custom hook to access the navigation context.
 * @returns The navigation context value.
 ** ----------------------------------------------------------------------------------------- */
export function useNavigation(): NavigationContextValue {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error("useNavigation must be used within a NavigationProvider");
    }
    return context;
}

/** ----------------------------------------------------------------------------------------- *
 * NavigationContextProvider component that provides navigation state and functions to its children.
 * @param children - The child components that will have access to the navigation context.
 * @returns A provider component that wraps its children with the navigation context. 
 ** ----------------------------------------------------------------------------------------- */
const NavigationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [openCategories, setOpenCategories] = useState<string[]>([])

/** ----------------------------------------------------------------------------------------- *
 * Opens a navigation category by adding its title to the list of open categories.
 * If the category is already open, it does nothing.
 * @param title - The title of the category to open.
 ** ----------------------------------------------------------------------------------------- */
    const openCategory = (title: string) => setOpenCategories(prev => prev.includes(title) ? prev : [...prev, title])

/** ----------------------------------------------------------------------------------------- *
 * Closes a specific navigation category by removing its title from the list of open categories.
 * If the category is not open, it does nothing.
 * @param title - The title of the category to close.
 ** ----------------------------------------------------------------------------------------- */
    const closeCategory = (title: string) => setOpenCategories(prev => prev.filter(t => t !== title))

/** ----------------------------------------------------------------------------------------- *
 * Closes all open navigation categories by clearing the list of open categories.
 ** ----------------------------------------------------------------------------------------- */
    const closeAllCategories = () => setOpenCategories([])

/** ----------------------------------------------------------------------------------------- *
 * @param title - The title of the category to toggle.
 * Toggles the open/closed state of a navigation category. If the category is open, 
 * it will be closed; if it is closed, it will be opened.
 ** ----------------------------------------------------------------------------------------- */
    const toggleCategory = (title: string) => (openCategories.includes(title)) ? closeCategory(title) : openCategory(title)

/** ----------------------------------------------------------------------------------------- *
 * Checks if a category is open.
 * @param title - The title of the category to check.
 * @returns True if the category is open, false otherwise.
 ** ----------------------------------------------------------------------------------------- */
    const isCategoryOpen = (title: string) => openCategories.includes(title)

/** ----------------------------------------------------------------------------------------- *
 * Focuses the first open category if any are open.
 ** ----------------------------------------------------------------------------------------- */
    const focusFirstOpenCategory = () => {
        if (openCategories.length > 0) {
            // Focus management would go here
        }
    };

/** ----------------------------------------------------------------------------------------- *
 * Returns navigation links.
 ** ----------------------------------------------------------------------------------------- */
    const getLinks = () => {
        return [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
            { name: "Dashboard", itemList: [
                { name: "Analytics", path: "/dashboard/analytics" },
                { name: "Reports", path: "/dashboard/reports" },
                { name: "Settings", path: "/dashboard/settings" }
            ] },
            { name: "Test Item", path: "/test" },
        ];
    };
    
/** ----------------------------------------------------------------------------------------- *
 * Renders the navigation context provider with the current state and functions.
 ** ----------------------------------------------------------------------------------------- */
return React.createElement(
        NavigationContext.Provider,
        { value: { openCategory, closeCategory, closeAllCategories, focusFirstOpenCategory, getLinks, isCategoryOpen, toggleCategory } },
        children
    );
};

export { NavigationContextProvider, type NavigationContextValue };
