import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Header/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./Profile/Profile";
import Tools from "./Tools/Tools";
import './App.css'; // Import the CSS file for styling

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <div className="profileToolsWrapper">
          <div className="profileContainer">
            <Profile
              name="Joonas Ronimus"
              address="Metropolia"
              zip="03453"
              email="joonas.ronimus@metropolia.fi"
              profilePicture="./src/profileImage.jpeg"
            />
          </div>
          <div className="toolsContainer">
            <Tools />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
