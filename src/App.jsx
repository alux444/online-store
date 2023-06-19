import "./App.css";
import testDb from "./utils/testDb";
import getAllItems from "./utils/getAllItems";
import { useState } from "react";

function App() {
  const [data, setData] = useState();

  const getResults = async () => {
    const results = await getAllItems();
    setData(results);
    console.log(results);
  };

  return (
    <>
      <button onClick={testDb}>Test Database</button>
      <button onClick={getResults}>Test getitems</button>
      <p className="text-red-500">Red Font</p>
    </>
  );
}

export default App;
