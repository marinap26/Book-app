import "./App.css";

import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./router";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routers />
      </Router>
    </AuthProvider>
  );
}

export default App;
