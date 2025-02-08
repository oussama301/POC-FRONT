import React, { createContext, useState } from "react";

const PromptContext = createContext();

export const PromptProvider = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [visualGroups, setVisualGroups] = useState([]);
  const [visuals, setVisuals] = useState([]);
  const [role, setRole] = useState(""); // New state for role
  const [businessDomain, setBusinessDomain] = useState(""); 
  return (
    <PromptContext.Provider
      value={{
        prompt,
        setPrompt,
        visualGroups,
        setVisualGroups,         
        visuals,
        setVisuals,
        role,
        setRole, // Add setRole to the provider
        businessDomain,
        setBusinessDomain
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export default PromptContext;
