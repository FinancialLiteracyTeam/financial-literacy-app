import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {

  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="app">

      <div className="auth-container">

        <div className="logo-section">
          <h1>💰Financial Literacy App</h1>
          <p>Learn Money. Build Your Future.</p>
        </div>


        {showLogin ? (

          <Login
            switchToRegister={() => setShowLogin(false)}
          />

        ) : (

          <Register
            switchToLogin={() => setShowLogin(true)}
          />

        )}

      </div>

    </div>
  );
}

export default App;