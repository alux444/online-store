import "./App.css";
import testDb from "./utils/testDb";

function App() {
  return (
    <>
      <button onClick={testDb}>Test Database</button>
      <p className="text-red-500">Red Font</p>
    </>
  );
}

export default App;
