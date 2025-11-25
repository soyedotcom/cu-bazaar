import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import SellerProfile from "./pages/SellerProfile";
import ProductDetails from "./pages/ProductDetails";
import UserCart from "./pages/UserCart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/:id/profile" element={<UserProfile />}></Route>
        <Route path="/:id/shop" element={<SellerProfile />}></Route>
        <Route path="/:id/details" element={<ProductDetails />}></Route>
        <Route path="/:id/cart" element={<UserCart />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
