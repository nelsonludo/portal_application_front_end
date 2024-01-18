import SideBar from "./SideBar.js";
import Sections from "./Sections.js";
import AddSection from "./AddSectionPanel.js";
import AddApp from "./AddAppPanel.js";

import useAuth from "./hooks/UseAuth.js";
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

  const { setUser, setAccess, access, axiosPrivate, refresh, refreshToken } =
    useAuth();
  const navigate = useNavigate();

  const accessToken = access;

  useEffect(() => {
    refreshToken(refresh);
  }, []);

  useEffect(() => {
    async function trys() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const { data } = await axiosPrivate(accessToken).post("/apps/");

        console.log("this is the response?.data:", data);

        const tryArray = data;

        setApp(tryArray[0]);
      } catch (err) {
        console.log(err);
      }
    }

    trys();
  }, []);

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
    setUser({
      name: "",
      pwd: "",
    });
    setAccess("");
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
