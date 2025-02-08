import React, { createContext, useContext, useState } from 'react';

// Create context
const FilterContext = createContext();

// Provider component
export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({});

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use filters
export const useFilters = () => useContext(FilterContext);
