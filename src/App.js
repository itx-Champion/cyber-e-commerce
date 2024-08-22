import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import ShowAllProducts from "./Pages/ShowAllProducts";
import FiltersProduct from "./Pages/FiltersProduct";
import ProductDetailsPage from "./Pages/ProductDetails";
import CartItems from "./Pages/CartItems";
import AddressPage from "./Pages/AddressPage";
import PagesNotFound from "./Pages/404";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Shipping from "./Components/Payments/Shipping";
import Payment from "./Components/Payments/Payment";
import PayAfterPage from "./Pages/payAfterPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/allproducts" element={<ShowAllProducts />} />
            <Route path="/allproducts/filter" element={<FiltersProduct />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/product/shoppingcart" element={<CartItems />} />
            <Route
              path="/product/shoppingcart/address"
              element={<AddressPage />}
            />
            <Route
              path="/product/shoppingcart/shipping"
              element={<Shipping />}
            />
            <Route path="/product/shoppingcart/payment" element={<Payment />} />
            <Route
              path="/product/shoppingcart/purchased"
              element={<PayAfterPage />}
            />
          </Route>
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="*" element={<PagesNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
