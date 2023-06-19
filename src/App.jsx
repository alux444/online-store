import "./App.css";
import getAllItems from "./utils/getAllItems";
import convertDate from "./utils/convertDate";
import { createContext, useState } from "react";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import StoreDisplay from "./components/store-display/StoreDisplay";

const AdminContext = createContext();

function App() {
  const [admin, setAdmin] = useState(false);

  const getResults = async () => {
    const results = await getAllItems();
    console.log(results);
    console.log(convertDate(results[0].timeCreated.seconds));
  };

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      <button onClick={getResults}>Test get items</button>
      <br />
      <button onClick={() => setAdmin(!admin)}>Set Admin (for testing)</button>
      <p className="text-red-500">Red Font</p>
      {admin ? <AdminDashboard /> : <StoreDisplay />}
    </AdminContext.Provider>
  );
}

export default App;
