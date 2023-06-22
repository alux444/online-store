import "./App.css";
import { createContext, useState } from "react";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import StoreDisplay from "./components/store-display/StoreDisplay";
import Test from "./components/Test";
import Header from "./components/misc-components/Header";
import Footer from "./components/misc-components/Footer";

export const AdminContext = createContext();
export const UserContext = createContext();
export const CartContext = createContext();

function App() {
  const [admin, setAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({ loggedIn: false, email: "" });

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Test />
          <br />
          <button onClick={() => setAdmin(!admin)}>
            {admin ? "remove admin" : "set admin"}
          </button>
          {admin ? <AdminDashboard /> : <StoreDisplay />}
          <Footer />
        </UserContext.Provider>
      </CartContext.Provider>
    </AdminContext.Provider>
  );
}

export default App;
