import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/protectedRoute";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Login2 from "./pages/login2";
import Edit from "./pages/edit";
import Orders from "./pages/orders";
import Courier from "./pages/courier";
import EditCourier from "./pages/editCourier";
import Map from "./pages/map";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login2" element={<Login2 />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/courier" element={<Courier />} />
          <Route path="/editCourier/:id" element={<EditCourier />} />
          <Route path="/map" element={<Map/>} />
  
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
