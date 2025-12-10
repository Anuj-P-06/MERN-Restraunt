import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BookTable from "./pages/BookTable";
import MyBookings from "./pages/MyBookings";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from './components/Navbar';

const App = () => {

  const adminPath = useLocation().pathname.includes("admin")
  return (
    <div>
      {!adminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
