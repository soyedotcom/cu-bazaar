import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";
import { WishlistProvider } from "./context/WishlistProvider";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </StrictMode>,
);
