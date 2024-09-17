import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import Available from "./components/Available";
import Description from "./components/Description";
import Registration from "./components/Registration";
import Settings from "./components/Settings/Settings";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/available" element={<Available />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>

    
  );
}

export default App;