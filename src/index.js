import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PromptProvider } from "./context/PromptContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PromptProvider>
      <App />
    </PromptProvider>
  </BrowserRouter>
);