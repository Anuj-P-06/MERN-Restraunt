import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  /* ---------------- AUTH ---------------- */
  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data.success) setUser(data.user);
    } catch (error) {
      console.log("Auth check failed");
    }
  };

  /* ---------------- CATEGORIES ---------------- */
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) setCategories(data.categories);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  /* ---------------- MENUS ---------------- */
  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      if (data.success) setMenus(data.menuItems);
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };

  /* ---------------- CART ---------------- */
  const fetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/cart/get");
      if (data.success) setCart(data.cart);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  const addToCart = async (menuId) => {
    try {
      const { data } = await axios.post("/api/cart/add", {
        menuId,
        quantity: 1,
      });

      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Add to cart failed");
    }
  };

  /* ---------------- DERIVED STATE ---------------- */
  useEffect(() => {
    if (cart?.items) {
      const total = cart.items.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [cart]);

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    isAuth();
    fetchCategories();
    fetchMenus();
    fetchCartData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        navigate,
        loading,
        setLoading,
        user,
        setUser,
        categories,
        menus,
        cart,
        cartCount,
        totalPrice,
        fetchMenus,
        fetchCategories,
        fetchCartData,
        addToCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
