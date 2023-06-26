import "./App.css";
import { createContext, useState } from "react";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import StoreDisplay from "./components/store-display/StoreDisplay";
import Header from "./components/misc-components/Header";
import Footer from "./components/misc-components/Footer";
import { validateName } from "./utils/validateName";

export const AdminContext = createContext();
export const UserContext = createContext();
export const CartContext = createContext();

function App() {
  const [admin, setAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({ loggedIn: false, email: "" });

  return (
    <div className="flex flex-col items-center justify-center">
      <AdminContext.Provider value={{ admin, setAdmin }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <UserContext.Provider value={{ user, setUser }}>
            <Header />
            <br />
            {admin ? <AdminDashboard /> : <StoreDisplay />}
            <Footer />
          </UserContext.Provider>
        </CartContext.Provider>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
