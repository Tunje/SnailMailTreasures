import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Registration from "./components/Registration.tsx";
import Login from "./components/Login.tsx";
import Navbar from "./components/navbar.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Login />
    </BrowserRouter>
  </StrictMode>
);
