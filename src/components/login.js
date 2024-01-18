//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import useAuth from "./hooks/UseAuth";
import axios from "../api/axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import "../css/Login.css";

//const LOGIN_URL = "http://siigusp.pheoc.cm/api/token";

//const USER_REGEX = /^[a-ZA-Z][a-zA-Z0-9-_]{3,23}$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const { setAccess, user, setUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [clicked, setClicked] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user.pwd);
    //this is to test the user login//the accesstoken and roles are optional and might not be used here
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { data } = await axios.post(
        "/token/",
        {
          username: user.name,
          password: user.pwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        //withCredentials: true,
      );

      localStorage.setItem("refresh", data?.refresh);

      setAccess(data?.access);

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorised");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  if (location.state) {
    if (location.state.prevRoute.pathname !== "") {
      return <Navigate to={location.state.prevRoute.pathname} replace />;
    }
  }

  return (
    <div className="loginContainer">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
          value={user.name}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) =>
            setUser({
              ...user,
              pwd: e.target.value,
            })
          }
          value={user.pwd}
          required
        />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
