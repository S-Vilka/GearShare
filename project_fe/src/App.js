import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile/Profile";
import Available from "./components/Available";
import Description from "./components/Description";
import Login from "./components/Login";
import Join from "./components/Join";
import Settings from "./components/Settings/Settings";
import ProtectedRoute from "./components/ProtectedRoute"; 
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />{" "}
          <Route path="/available" element={<Available />} />
          <Route
            path="/description/:id"
            element={<ProtectedRoute component={Description} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route
            path="/settings"
            element={<ProtectedRoute component={Settings} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// test to merge branches in github 