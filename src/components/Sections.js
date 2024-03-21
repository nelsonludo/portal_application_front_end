import React, { useState, useEffect } from "react";
import "../css/sections.css";
import useAuth from "./hooks/UseAuth.js";
import Myapps from "./Myapps.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisV,
  faTrash,
  faTrashAlt,
  faChevronCircleUp,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import MouseOverPopover from "./Popover.js";

export default function Sections({
  sectionList,
  setSectionList,
  apps,
  defineCategoryId,
  defineCategoryName,
  OpenUpdateCategory,
  setErrMsg,
}) {
  const [isActiveList, setIsActiveList] = useState(
    Array(sectionList.length).fill(false)
  );

  const [buttonDropdown, setButtonDropdown] = useState(
    Array(sectionList.length).fill(false)
  );

  const { access, axiosPrivate, user, displayError } = useAuth();

  const accessToken = access;

  const handleDeleteAppClick = async (app) => {
    try {
      const { data } = await axiosPrivate(accessToken).delete(
        `/app/delete/${app.id}`
      );
      setSectionList(apps.filter((f) => f.title !== app?.title));
      displayError({
        message: "App removed from section Successfully!",
        setErrMsg: setErrMsg,
        good: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSectionClick = async (section) => {
    try {
      const { data } = await axiosPrivate(accessToken).delete(
        `/category/delete/${section.id}`
      );
      setSectionList(sectionList.filter((f) => f.name !== section?.name));
      displayError({
        message: "Section Deleted Successfully!",
        setErrMsg: setErrMsg,
        good: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  function handleOnDrag(e, appIndex, sectionIndex, sectionName) {
    e.dataTransfer.setData(
      "text/plain",
      `${appIndex}\n${sectionName}\n${sectionIndex}`
    );
  }

  function handleDragOver(e) {
    e.preventDefault();
    console.log("drag over");
  }

  async function handleOnDrop(e, sectionIndex) {
    const data = e.dataTransfer.getData("text/plain");
    const [appIndex, sectionName] = data.split("\n");
    //check if the update app category functions also get the category id and the app id
    try {
      const { data } = await axiosPrivate(access).put(
        `/app/category/${appIndex}`,
        {
          user: user.id,
          name: sectionName,
        }
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  function togggleDropdown(index) {
    try {
      const newDropdown = [...buttonDropdown];
      newDropdown[index] = !newDropdown[index];
      setButtonDropdown(newDropdown);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleSection(index) {
    const newIsActiveList = [...isActiveList];
    newIsActiveList[index] = !newIsActiveList[index];
    setIsActiveList(newIsActiveList);
  }

  return (
    <div className="bodyContainer">
      <div className="allSectionsContainer">
        <Myapps
          sectionList={sectionList}
          setSectionList={setSectionList}
          appsList={apps}
        />
        {sectionList.map(
          (
            section,
            index /**mapping through the sectionList array to access all the section objects which are elements in this array */
          ) => (
            <div
              key={index}
              className="singleSectionContainer"
              onDrop={(e) => handleOnDrop(e, index)}
              onDragOver={handleDragOver}
            >
              <div className="sectionTopContainer">
                <button
                  className="sectionDropDownBtn"
                  onClick={() => toggleSection(index)}
                >
                  {isActiveList[index] ? (
                    <FontAwesomeIcon
                      icon={faChevronCircleDown}
                      size="sm"
                      color="#7a7a7a"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faChevronCircleUp}
                      size="sm"
                      color="#7a7a7a"
                    />
                  )}
                  {section?.name}
                </button>
                <span
                  className="appOptionsButton"
                  onClick={() => togggleDropdown(index)}
                >
                  <FontAwesomeIcon icon={faEllipsisV} />
                  <div
                    className={
                      buttonDropdown[index]
                        ? "reportButtons show"
                        : "reportButtons hide"
                    }
                  >
                    <button
                      onClick={() => {
                        OpenUpdateCategory();
                        defineCategoryId(section.id);
                        defineCategoryName(section.name);
                      }}
                    >
                      Edit Category <FontAwesomeIcon icon={faEdit} size="xs" />
                    </button>
                    <button
                      style={{ color: "red" }}
                      onClick={() => {
                        handleDeleteSectionClick(section);
                      }}
                    >
                      Delete Category{" "}
                      <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                    </button>
                  </div>
                </span>
              </div>

              {isActiveList[index] && (
                <AppSection
                  sectionApps={apps.filter((i) => i.category === section.name)}
                  handleDeleteAppClick={handleDeleteAppClick}
                  handleOnDrag={handleOnDrag}
                  sectionIndex={section.id}
                  sectionName={section.name}
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function AppSection({
  sectionApps,
  handleOnDrag,
  sectionIndex,
  sectionName,
  handleDeleteAppClick,
}) {
  return (
    <div className="singleSectionApps">
      {sectionApps?.map(
        (
          app,
          index /** mapping through the single section apps array to get all apps in one section */
        ) => (
          <div
            key={index}
            className="app"
            draggable
            onDragStart={(e) =>
              handleOnDrag(e, app.id, sectionIndex, sectionName)
            }
          >
            <div className="topIcons">
              <span>
                <MouseOverPopover data={app} />
              </span>
              <span
                onClick={() => {
                  handleDeleteAppClick(app);
                }}
              >
                <FontAwesomeIcon icon={faTrash} color="#da2525" size="xs" />
              </span>
            </div>{" "}
            <img
              className="appImage"
              src="/logo192.png"
              alt="this is the app"
            />{" "}
            {/*app.image*/}
            <span>{app.name}</span>
            {/* <span>{app.description}</span> */}
            <a href={app.link}>link to the app</a>
          </div>
        )
      )}
    </div>
  );
}
