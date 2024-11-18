import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AppRoutes from "./AppRoutes.jsx";
import { ThemeProvider } from './context/ThemeContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
          <Router>
            <AppRoutes />

          </Router>

      </ThemeProvider>

    </QueryClientProvider>

  </StrictMode>
);


