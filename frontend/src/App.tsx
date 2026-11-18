import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <main className="dashboard-content">
        <h1>Welcome to IncidentIQ</h1>
        <p>Monitor and investigte your incidents</p>
      </main>
    </div>
  );
}
export default App;
