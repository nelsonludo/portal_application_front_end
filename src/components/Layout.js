import SideBar from "./sideBar.js";
import Sections from "./Sections.js";
import AddSection from "./addSectionPanel.js";
import AddApp from "./addAppPanel.js";

import useAuth from "../hooks/useAuth.js";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import axios from "../api/axios";

const initialAppList = [
  {
    title: "microsoftSuit",
    apps: [
      {
        image: "/logo192.png",
        id: 1,
        name: "microsoftWindows",
        description: "microsoftWindows Description",
        link: "https://redcap.pheoc.cm",
        owner: 2,
      },
      {
        image: "/logo192.png",
        id: 2,
        name: "microsoftWindows",
        description: "microsoftWindows Description",
        link: "https://redcap.pheoc.cm",
        owner: 2,
      },
      {
        image: "/logo192.png",
        id: 3,
        name: "microsoftWindows",
        description: "microsoftWindows Description",
        link: "https://redcap.pheoc.cm",
        owner: 2,
      },
    ],
  },
  {
    title: "Browsers",
    apps: [
      {
        image: "/logo192.png",
        id: 1,
        name: "microsoftWindows",
        description: "microsoftWindows Description",
        link: "https://redcap.pheoc.cm",
        owner: 2,
      },
      {
        image: "/logo192.png",
        id: 2,
        name: "microsoftWindows",
        description: "microsoftWindows Description",
        link: "https://redcap.pheoc.cm",
        owner: 2,
      },
      {
        image: "/logo192.png",
        id: 3,
        name: "microsoftWindows",
        description: "microsoftWindows Description",
        link: "https://redcap.pheoc.cm",
        owner: 2,
      },
    ],
  },
];

const Layout = () => {
  const [sectionList, setSectionList] = useState(initialAppList);
  const [isSectionAdd, setIsSectionAdd] = useState(false);
  const [isAppAdd, setIsAppAdd] = useState(false);
  const [app, setApp] = useState({});

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  let accessToken = auth.accessToken;
  let isLoggedIn = auth.isLoggedIn;
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("accessToken from login:", accessToken);

  let headersList = {
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    async function RefreshToken() {
      if (refreshToken) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const errResponse = await axios.post(
          "http://siigusp.pheoc.cm/api/token/refresh",
          {
            refresh: `${refreshToken}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
          //withCredentials: true,
        );

        accessToken = errResponse?.data?.access;
        isLoggedIn = true;
        localStorage.setItem("isLoggedIn", isLoggedIn);

        isLoggedIn = localStorage.getItem("isLoggedIn");

        console.log(accessToken);

        setAuth((prevAuth) => ({ ...prevAuth, accessToken, isLoggedIn }));

        console.log("the auth.isLoggedIn is:", auth.isLoggedIn);
      } else {
        isLoggedIn = false;
        localStorage.setItem("isLoggedIn", isLoggedIn);

        isLoggedIn = localStorage.getItem("isLoggedIn");

        setAuth((prevAuth) => ({ ...prevAuth, isLoggedIn }));
        console.log("isloggedin is false here");
        console.log(refreshToken);
      }
    }

    RefreshToken();
  }, []);

  useEffect(() => {
    console.log("isLoggedIn:", auth.isLoggedIn);
    console.log("refreshToken:", refreshToken);
  }, [auth]);

  useEffect(() => {}, []);

  useEffect(() => {
    async function trys() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        let response = await axios.get("http://siigusp.pheoc.cm/api/apps", {
          headers: headersList,
        });

        console.log("this is the response?.data:", response?.data);

        const tryArray = response?.data;

        setApp(tryArray[0]);

        console.log("this is the app:", app);
      } catch (err) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const errResponse = await axios.post(
          "http://siigusp.pheoc.cm/api/token/refresh",
          {
            refresh: `${refreshToken}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
          //withCredentials: true,
        );

        const accessToken = errResponse?.data?.access;
        console.log("accessToken from refreshToken:", accessToken);

        setAuth((prevAuth) => ({ ...prevAuth, accessToken }));
      }
    }

    trys();
  }, [accessToken]);

  function handleAddSectionClick(title) {
    title !== "" &&
      setSectionList([
        ...sectionList,
        {
          title: title,
          apps: [],
        },
      ]);
    setIsSectionAdd(false);
  }

  function handleAddAppClick(title, image, sectionTitle) {
    title !== "" &&
      image !== "" &&
      setSectionList(
        sectionList.map((section) => {
          if (section.title === sectionTitle) {
            return {
              ...section,
              apps: [...section.apps, app],
            };
          } else {
            return section;
          }
        })
      );

    setIsAppAdd(false);
  }

  function handleLogout() {
    const isLoggedIn = localStorage.setItem("isLoggedIn", false);
    setAuth((prevAuth) => ({ ...prevAuth, isLoggedIn }));
  }

  return (
    <div className="App">
      {isSectionAdd && (
        <AddSection
          handleAddSectionClick={handleAddSectionClick}
          setIsSectionAdd={setIsSectionAdd}
        />
      )}
      {isAppAdd && (
        <AddApp
          handleAddAppClick={handleAddAppClick}
          sectionList={sectionList}
          setIsAppAdd={setIsAppAdd}
        />
      )}
      <div className="header">
        <div className="logoContainer">
          <img src="/cems_logo.png" alt="ccousp logo" className="ccouspLogo" />
          <h6>Ccousp Portal App</h6>
        </div>
        <div className="searchBar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
          <input className="searchBarInput" placeholder="search you apps" />
        </div>
        <button className="logoutBtn" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="appBodyContainer">
        <SideBar
          sectionList={sectionList}
          setIsSectionAdd={setIsSectionAdd}
          setIsAppAdd={setIsAppAdd}
        />
        <Sections
          sectionList={sectionList}
          setSectionList={setSectionList}
          handleAddAppClick={handleAddAppClick}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
