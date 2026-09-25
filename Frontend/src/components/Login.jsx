import { useState } from "react";
import axios from "axios";

function Login({ switchToRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password
        }
      );

      console.log(response.data);

      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage("Login successful!");

    } catch (error) {

      if (error.response) {

        setError(
          error.response.data.message
        );

      } else {

        setError(
          "Unable to connect to server"
        );

      }

    }
  };


  return (

    <div className="form-container">

      <h2>Welcome Back 👋</h2>

      <p className="form-subtitle">
        Login to continue learning
      </p>


      <form onSubmit={handleLogin}>

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />


        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />


        <button type="submit">
          Login
        </button>

      </form>


      {message && (
        <p className="success-message">
          {message}
        </p>
      )}


      {error && (
        <p className="error-message">
          {error}
        </p>
      )}


      <p className="switch-text">

        Don't have an account?

        <button
          className="link-button"
          onClick={switchToRegister}
        >
          Register
        </button>

      </p>

    </div>

  );
}

export default Login;