import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/Login.css";

const LOGIN_URL = "/auth";

//const USER_REGEX = /^[a-ZA-Z][a-zA-Z0-9-_]{3,23}$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //this is to test the user login//the accesstoken and roles are optional and might not be used here
    const fakeResponseData = {
      accessToken: "your-access-token",
      roles: ["role1", "role2"],
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = { data: fakeResponseData };
      //const response =  await axios.post(LOGIN_URL, JSON.stringify(user, pwd), {
      //   headers: { "Content-Type": "application/json" },
      //   withCredentials: true,
      // });

      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
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
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
