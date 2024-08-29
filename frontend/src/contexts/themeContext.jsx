import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const setDarkTheme = () => {
    setTheme("dark");
  };

  const setLightTheme = () => {
    setTheme("light");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setDarkTheme, setLightTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useColorTheme() {
  return useContext(ThemeContext);
}