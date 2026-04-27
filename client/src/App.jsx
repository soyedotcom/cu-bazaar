import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Services from "./pages/Services";
import DealsandDiscounts from "./pages/DealsandDiscounts";
import NewsandEvents from "./pages/NewsandEvents";

function App() {
  return (
    <>
      <main class="flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dealsanddiscounts" element={<DealsandDiscounts />} />
          <Route path="/newsandevents" element={<NewsandEvents />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
