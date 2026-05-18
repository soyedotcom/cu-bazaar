import { Routes, Route } from "react-router";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Services from "./pages/Services";
import DealsandDiscounts from "./pages/DealsandDiscounts";
import NewsandEvents from "./pages/NewsandEvents";
import Deliveries from "./Deliveries";
import UserProfile from "./UserProfile";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import Showcase from "./pages/Showcase";

function App() {
  const isProfile = useLocation().pathname === "/signup" || "/signin";

  return (
    <>
      <main className="flex flex-col">
        {isProfile ? <></> : <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dealsanddiscounts" element={<DealsandDiscounts />} />
          <Route path="/newsandevents" element={<NewsandEvents />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/showcase" element={<Showcase />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
