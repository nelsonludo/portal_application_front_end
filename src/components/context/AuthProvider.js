import { createContext, useState, useEffect } from "react";
import axios from "../../api/axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const refresh = localStorage.getItem("refresh");
  const [refreshTokenLoading, setRefreshTokenLoading] = useState(true);
  const [access, setAccess] = useState("");
  const [user, setUser] = useState({
    name: "",
    pwd: "",
  });
  const [loading, setLoading] = useState(false);

  const axiosPrivate = (accessToken) => {
    const privateAxios = axios.create({
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return privateAxios;
  };

  const refreshToken = async (theRefreshToken) => {
    try {
      const { data } = await axios.post(
        "/token/refresh/",
        {
          refresh: theRefreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAccess(data?.access);
    } catch (error) {
      setUser({
        name: "",
        pwd: "",
      });
    } finally {
      setRefreshTokenLoading(false);
    }
  };

  const displayError = (dislpayErrorObject) => {
    dislpayErrorObject.setErrMsg({
      display: true,
      msg: dislpayErrorObject.message,
    });
    setTimeout(() => {
      dislpayErrorObject.setErrMsg({ display: false });
    }, 30000);

    if (dislpayErrorObject.good) {
      dislpayErrorObject.setErrMsg({
        display: true,
        msg: dislpayErrorObject.message,
        good: true,
      });
      setTimeout(() => {
        dislpayErrorObject.setErrMsg({ display: false });
      }, 30000);
    }
  };

  useEffect(() => {
    refreshToken(refresh);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (access && user.email) {
        refreshToken(refresh);
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        axiosPrivate,
        access,
        setAccess,
        user,
        setUser,
        refreshToken,
        refresh,
        refreshTokenLoading,
        displayError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
