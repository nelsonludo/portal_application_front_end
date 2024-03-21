//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import useAuth from "./hooks/UseAuth";
import axios from "../api/axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import "../css/Login.css";
import ErrorMsg from "./ErrorMsg";

//const LOGIN_URL = "http://siigusp.pheoc.cm/api/token";

//const USER_REGEX = /^[a-ZA-Z][a-zA-Z0-9-_]{3,23}$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const { setAccess, user, setUser, displayError } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [ErrMsg, setErrMsg] = useState({
    display: false,
    msg: "",
  });

  useEffect(() => {
    if (ErrMsg.display) {
      const timer = setTimeout(() => {
        setErrMsg({ display: false, msg: "" });
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [ErrMsg.display]);

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

    if (!user.name || !user.pwd) {
      displayError({
        message: "Please fill all the fields",
        setErrMsg: setErrMsg,
      });
    }
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
    } catch (error) {
      if (error.response?.status === 400) {
        displayError({
          message: "Please fill all the fields",
          setErrMsg: setErrMsg,
        });
      } else if (error.response?.status === 401) {
        displayError({
          message: "Email or password incorrect",
          setErrMsg: setErrMsg,
        });
      } else {
        displayError({ message: "Login failed", setErrMsg: setErrMsg });
      }
      errRef?.current?.focus();
    }
  };

  if (location.state) {
    if (location.state.prevRoute.pathname !== "") {
      return <Navigate to={location.state.prevRoute.pathname} replace />;
    }
  }

  return (
    <div className="loginContainer">
      <ErrorMsg errorMsg={ErrMsg} />
      <div className="middle">
        <img src="cems_logo.png" alt="pheoc_logo" />
        <h1> SIIGUSP</h1>
        <h2>Employee Users</h2>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="block">
            <label htmlFor="username">Username:</label>
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
          </div>
          <div className="block">
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
          </div>
          <button>Sign In</button>
        </form>
        <div className="externalUsers">
          <div className="or">
            <div className="orRight" />
            <span>OR</span>
            <div className="orLeft" />
          </div>
          <h2>External Users</h2>
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
