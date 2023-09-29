import { useSelector } from "react-redux";
import "./register.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { currentUser } = useSelector((state: any) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (username && email && password) {
        await axios.post("http://localhost:8080/api/auth/register", {
          username,
          email,
          password,
        });
        navigate("/login");
      } else {
        alert("Fill all Inputs");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        <div className="username">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btns">
          <button>Sign Up</button>
        </div>
        <p>
          You already Have an Account? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
