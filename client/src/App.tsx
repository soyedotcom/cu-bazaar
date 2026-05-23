import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ShopPage from "./pages/ShopPage";
import Product from "./pages/ProductPage";
import Services from "./pages/Services";
import DealsandDiscounts from "./pages/DealsandDiscounts";
import NewsandEvents from "./pages/NewsandEvents";
import Showcase from "./pages/Showcase";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Deliveries from "./pages/Deliveries";
import UserProfile from "./pages/UserProfile";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

function App() {
  const page = useLocation();
  const isAuth = page.pathname === "/signin" || page.pathname === "/signup";

  return (
    <main className="flex flex-col">
      {!isAuth && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:shopName" element={<ShopPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/dealsanddiscounts" element={<DealsandDiscounts />} />
        <Route path="/newsandevents" element={<NewsandEvents />} />
        <Route path="/showcase" element={<Showcase />} />

        {/* Auth (redirect if already logged in) */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Protected */}
        <Route
          path="/deliveries"
          element={
            <ProtectedRoute>
              <Deliveries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
