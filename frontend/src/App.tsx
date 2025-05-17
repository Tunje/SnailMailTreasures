import "./index.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-blue-500 text-white p-4 rounded">Tailwind Works!</div>
      <div className="bg-green-500 text-white p-4 text-2xl rounded">
        ✅ Tailwind is working now!
      </div>
    </>
  );
}
export default App;
