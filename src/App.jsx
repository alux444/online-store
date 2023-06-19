import "./App.css";
import testDb from "./utils/testDb";
import getAllItems from "./utils/getAllItems";
import { useState } from "react";
import convertDate from "./utils/convertDate";

function App() {
  const [data, setData] = useState();

  const getResults = async () => {
    const results = await getAllItems();
    setData(results);
    console.log(results);
    console.log(convertDate(results[0].timeCreated.seconds));
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
