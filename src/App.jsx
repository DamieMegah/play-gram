import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import Favourite from "./pages/Favourites";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
