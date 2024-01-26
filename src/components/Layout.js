import SideBar from "./SideBar.js";
import Sections from "./Sections.js";
import AddSection from "./AddSectionPanel.js";
import UpdateSection from "./UpdateSectionPanel.js";

import useAuth from "./hooks/UseAuth.js";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import axios from "../api/axios";

const initialSectionList = [];

const Layout = () => {
  const [sectionList, setSectionList] = useState(initialSectionList);
  const [isSectionAdd, setIsSectionAdd] = useState(false);
  const [isSectionUpdate, setIsSectionUpdate] = useState(false);
  const [apps, setApps] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState();

  const {
    setUser,
    setAccess,
    access,
    axiosPrivate,
    refresh,
    refreshToken,
    user,
  } = useAuth();
  const navigate = useNavigate();

  const accessToken = access;

  useEffect(() => {
    refreshToken(refresh);

    async function trys() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const { data } = await axiosPrivate(accessToken).get("/apps/");

        const tryArray = data;

        setApps(tryArray);
      } catch (err) {
        console.log(err);
      }
    }

    const getUserInfo = async () => {
      try {
        const { data } = await axiosPrivate(accessToken).get("/user/", {});

        console.log(data);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    const getAllCategories = async () => {
      try {
        const { data } = await axiosPrivate(accessToken).get(
          "/categories/",
          {}
        );

        console.log(data);
        setSectionList(data);
      } catch (err) {
        console.log(err);
      }
    };

    trys();
    getUserInfo();
    getAllCategories();
  }, []);

  //test the add section click button to see if it works fine
  const handleAddSectionClick = async (title) => {
    try {
      const { data } = await axiosPrivate(accessToken).post("/category/", {
        user: user.id,
        name: title,
      });

      title !== "" &&
        setSectionList([
          ...sectionList,
          {
            id: sectionList.length + 1,
            name: title,
          },
        ]);
      setIsSectionAdd(false);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateSectionClick = async (title, categoryIndex) => {
    try {
      const { data } = await axiosPrivate(access).put(
        `/app/category/${categoryIndex}`,
        {
          user: user.id,
          name: title,
        }
      );

      setIsSectionUpdate(false);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

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
      {isSectionUpdate && (
        <UpdateSection
          handleUpdateSectionClick={handleUpdateSectionClick}
          setIsSectionUpdate={setIsSectionUpdate}
          currentId={currentCategoryId}
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
        <SideBar sectionList={sectionList} setIsSectionAdd={setIsSectionAdd} />
        <Sections
          sectionList={sectionList}
          setSectionList={setSectionList}
          apps={apps}
          defineCategory={setCurrentCategoryId}
          isUpdateOpen={() => {
            setIsSectionUpdate(true);
          }}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
