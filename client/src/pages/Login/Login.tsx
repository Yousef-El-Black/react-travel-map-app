import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/apiCalls";
import "./login.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch: any = useDispatch();

  const { isError, isFetching, currentUser } = useSelector(
    (state: any) => state.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email && password) {
      userLogin(dispatch, { email, password }).then(() => {
        navigate("/");
      });
    } else {
      alert("Fill Required inputs!");
    }
  };

  useEffect(() => {
    setError(isError);
    setIsLoading(isFetching);
  }, [isError, isFetching]);

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
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
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
        <p>
          You don't Have an Account? <Link to={"/register"}>Register</Link>
        </p>
        {error && "Something went Wrong!"}
      </form>
    </div>
  );
};

export default Login;
