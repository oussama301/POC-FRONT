import { createContext, useState } from "react";

export const SearchMenuContext = createContext();

export const SearchMenuProvider = ({ children }) => {
  const [activeDashboard, setActiveDashboard] = useState(null); // Track active dashboard

  return (
    <SearchMenuContext.Provider value={{ activeDashboard, setActiveDashboard }}>
      {children}
    </SearchMenuContext.Provider>
  );
};
