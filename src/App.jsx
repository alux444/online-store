import "./App.css";
import getAllItems from "./utils/getAllItems";
import convertDate from "./utils/convertDate";
import { createContext, useState } from "react";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import StoreDisplay from "./components/store-display/StoreDisplay";
import Test from "./components/Test";

const AdminContext = createContext();

function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      <Test />
      <br />
      <button onClick={() => setAdmin(!admin)}>
        {admin ? "remove admin" : "set admin"}
      </button>
      {admin ? <AdminDashboard /> : <StoreDisplay />}
    </AdminContext.Provider>
  );
}

export default App;
