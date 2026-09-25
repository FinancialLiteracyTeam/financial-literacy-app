import { useState } from "react";
import axios from "axios";

function Register({ switchToLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleRegister = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          phoneNumber,
          password
        }
      );


      console.log(response.data);


      // Save JWT
      localStorage.setItem(
        "token",
        response.data.token
      );


      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      setMessage(
        "Registration successful!"
      );


      // Clear form
      setName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");


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

      <h2>Create Account 🚀</h2>

      <p className="form-subtitle">
        Start your financial learning journey
      </p>


      <form onSubmit={handleRegister}>

        <label>Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />


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


        <label>Phone Number</label>

        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) =>
            setPhoneNumber(e.target.value)
          }
          required
        />


        <label>Password</label>

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />


        <button type="submit">
          Register
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

        Already have an account?

        <button
          className="link-button"
          onClick={switchToLogin}
        >
          Login
        </button>

      </p>

    </div>

  );
}

export default Register;