import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import MenuPage from "./pages/MenuPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserProfilePage from "./pages/UserProfilePage";
import Cart from "./components/Cart";
import OrdersPage from "./pages/OrdersPage";
import OrderDetails from "./components/Orders/OrderDetails";
import OrderSuccess from "./components/Orders/OrderSuccess";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <div className="pt-12 lg:pt-20 min-h-screen">
          <Cart />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/my-profile" element={<UserProfilePage />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
