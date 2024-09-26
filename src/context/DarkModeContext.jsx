/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  //Here we can also used useState to toggle but when we reload the page, the mode will be changed into default one which is light-mode
  //But if we use useLocalStorageState, even when we reload,the mode will still stay the same mode
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches, //This line is for set the defalut mode
    "isDarkMode"
  );

  //Here how we can add class at the whole documet body
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext is used outside of the DarkModeProvider!");
  return context;
}
