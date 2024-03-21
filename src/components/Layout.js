import SideBar from "./SideBar.js";
import Sections from "./Sections.js";
import AddSection from "./AddSectionPanel.js";
import UpdateSection from "./UpdateSectionPanel.js";

import useAuth from "./hooks/UseAuth.js";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import axios from "../api/axios";
import ErrorMsg from "./ErrorMsg.js";

const Layout = () => {
  const [sectionList, setSectionList] = useState([]);
  const [isSectionAdd, setIsSectionAdd] = useState(false);
  const [isSectionUpdate, setIsSectionUpdate] = useState(false);
  const [apps, setApps] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState();
  const [currentCategoryName, setCurrentCategoryName] = useState();
  const [ErrMsg, setErrMsg] = useState({
    display: false,
    msg: "",
  });

  const {
    setUser,
    setAccess,
    access,
    axiosPrivate,
    refresh,
    refreshToken,
    user,
    displayError,
  } = useAuth();
  const navigate = useNavigate();

  const accessToken = access;

  useEffect(() => {
    if (ErrMsg.display) {
      const timer = setTimeout(() => {
        setErrMsg({ display: false });
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [ErrMsg.display]);

  useEffect(() => {
    if (user?.first_name) {
      displayError({
        message: "Welcom Back !",
        setErrMsg: setErrMsg,
        good: true,
      });
    }
  }, [user]);

  const getAllCategories = async () => {
    try {
      const { data } = await axiosPrivate(accessToken).get("/categories/", {});

      setSectionList(data);
    } catch (err) {
      console.log(err);
    }
  };

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

        setUser(data);
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
    if (!title) {
      displayError({
        message: "Please fill all the fields",
        setErrMsg: setErrMsg,
      });
    }

    try {
      const { data } = await axiosPrivate(accessToken).post("/category/", {
        user: user.id,
        name: title,
      });

      setIsSectionAdd(false);
      displayError({
        message: "Section Added Successfully!",
        setErrMsg: setErrMsg,
        good: true,
      });
    } catch (err) {
      console.log(err);
    } finally {
      getAllCategories();
    }
  };
  const handleUpdateSectionClick = async (title, categoryIndex) => {
    try {
      const { data } = await axiosPrivate(access).put(
        `/category/update/${categoryIndex}/`,
        {
          user: user.id,
          name: title,
        }
      );

      displayError({
        message: "Section Updated Successfully!",
        setErrMsg: setErrMsg,
        good: true,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsSectionUpdate(false);
      getAllCategories();
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
          currentName={currentCategoryName}
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
        <ErrorMsg errorMsg={ErrMsg} />
      </div>
      <div className="appBodyContainer">
        <SideBar sectionList={sectionList} setIsSectionAdd={setIsSectionAdd} />
        <Sections
          sectionList={sectionList}
          setSectionList={setSectionList}
          apps={apps}
          defineCategoryId={setCurrentCategoryId}
          defineCategoryName={setCurrentCategoryName}
          OpenUpdateCategory={() => {
            setIsSectionUpdate(true);
          }}
          setErrMsg={setErrMsg}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
