import { createContext, useState, useEffect, useContext } from 'react'

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("darkMode");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useDarkMode = () => {
    return useContext(ThemeContext)
}
