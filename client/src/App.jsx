import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import Footer from "./componenets/Footer";
import Navbar from "./componenets/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import MenuPage from "./pages/MenuPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <div className="pt-12 lg:pt-20 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;