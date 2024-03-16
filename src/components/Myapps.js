import React, { useState } from "react";
import "../css/sections.css";
import useAuth from "./hooks/UseAuth.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleUp,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import MouseOverPopover from "./Popover.js";

export default function Myapps({ sectionList, setSectionList, appsList }) {
  const [IsActive, setIsActive] = useState(false);

  const { access, axiosPrivate } = useAuth();

  const accessToken = access;

  function handleOnDrag(e, appTitle, appImage, sectionIndex) {
    e.dataTransfer.setData(
      "text/plain",
      `${appTitle}\n${appImage}\n${sectionIndex}`
    );
  }

  function handleDragOver(e) {
    e.preventDefault();
    console.log("drag over");
  }

  async function handleOnDrop(e, sectionIndex) {
    const data = e.dataTransfer.getData("text/plain");
    const [appTitle, appImage, draggedSectionIndex] = data.split("\n");
    //check if the update app category functions also get the category id and the app id
    try {
      const { data } = await axiosPrivate(access).put("/app/category/", {
        user: 1,
        app: 1,
        category: 1,
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleSection() {
    if (sectionList.length > 4) {
      setIsActive(true);
    } else {
      setIsActive(!IsActive);
    }
  }

  return (
    <div className="singleSectionContainer">
      <button className="sectionDropDownBtn" onClick={toggleSection}>
        {sectionList.length > 4 ? (
          <>
            {IsActive ? (
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
          </>
        ) : (
          <></>
        )}
        My Apps
      </button>
      {sectionList.length > 4 ? (
        IsActive && (
          <AppSection
            sectionApps={appsList}
            handleOnDrag={handleOnDrag}
            sectionIndex={0}
          />
        )
      ) : (
        <AppSection
          sectionApps={appsList}
          handleOnDrag={handleOnDrag}
          sectionIndex={0}
        />
      )}
    </div>
  );
}

function AppSection({ sectionApps, handleOnDrag, sectionIndex }) {
  return (
    <div className="singleSectionApps">
      {sectionApps.map(
        (
          app,
          index /** mapping through the single section apps array to get all apps in one section */
        ) => (
          <div
            key={index}
            className="app"
            draggable
            onDragStart={(e) =>
              handleOnDrag(e, app.name, app.image, sectionIndex)
            }
          >
            <div className="topIcons">
              <span>
                <MouseOverPopover data={app} />
              </span>
              {/* <span onClick={handleDeleteAppClick}>
                <FontAwesomeIcon icon={faTrash} color="#da2525" size="xs" />
              </span> */}
            </div>{" "}
            <img
              className="appImage"
              src="/logo192.png"
              alt="this is the app"
            />{" "}
            {/*app.image*/}
            <span>{app.name}</span>
            <a href={app.link}>link to the app</a>
          </div>
        )
      )}
    </div>
  );
}
