import "./App.css";
import { createContext, useState } from "react";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import StoreDisplay from "./components/store-display/StoreDisplay";
import Test from "./components/Test";

export const AdminContext = createContext();
export const CartContext = createContext();

function App() {
  const [admin, setAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Test />
        <br />
        <button onClick={() => setAdmin(!admin)}>
          {admin ? "remove admin" : "set admin"}
        </button>
        {admin ? <AdminDashboard /> : <StoreDisplay />}
      </CartContext.Provider>
    </AdminContext.Provider>
  );
}

export default App;
