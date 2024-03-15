import React, { useState } from "react";
import "../css/sections.css";
import useAuth from "./hooks/UseAuth.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faTrash,
  faTimesCircle,
  faCheckCircle,
  faArrowAltCircleDown,
  faArrowCircleDown,
  faArrowDownShortWide,
  faArrowCircleUp,
  faArrowTrendDown,
  faArrowsAlt,
  faFileArrowDown,
  faChevronCircleUp,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Myapps({ sectionList, setSectionList, appsList }) {
  const [IsActive, setIsActive] = useState(false);

  const { access, axiosPrivate } = useAuth();

  const accessToken = access;

  function handleDeleteAppClick(appTitle) {
    let newSectionList = sectionList.map((section) => {
      let newApps = section.apps.filter((f) => f.name !== appTitle);
      return {
        ...section,
        apps: newApps,
      };
    });
    setSectionList(newSectionList);
  }

  const handleDeleteSectionClick = async (section) => {
    try {
      const { data } = await axiosPrivate(accessToken).delete(
        `/category/delete/${section.id}`
      );
      setSectionList(sectionList.filter((f) => f.title !== section?.title));
    } catch (err) {
      console.log(err);
    }
  };

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

      if (draggedSectionIndex !== sectionIndex.toString()) {
        const newSectionList = sectionList.map((section, index) => {
          if (index === parseInt(draggedSectionIndex)) {
            const newApps = section.apps.filter((app) => app.name !== appTitle);
            return {
              ...section,
              apps: newApps,
            };
          } else if (index === sectionIndex) {
            const newApps = [
              ...section.apps,
              { name: appTitle, image: appImage },
            ];
            return {
              ...section,
              apps: newApps,
            };
          } else {
            return section;
          }
        });

        setSectionList(newSectionList);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleSection() {
    setIsActive(!IsActive);
  }

  return (
    <div className="singleSectionContainer">
      <button className="sectionDropDownBtn" onClick={toggleSection}>
        {IsActive ? (
          <FontAwesomeIcon icon={faChevronCircleDown} />
        ) : (
          <FontAwesomeIcon icon={faChevronCircleUp} />
        )}
        My Apps
      </button>
      {IsActive && (
        <AppSection
          sectionApps={appsList}
          handleDeleteAppClick={handleDeleteAppClick}
          handleOnDrag={handleOnDrag}
          sectionIndex={0}
        />
      )}
    </div>
  );
}

function AppSection({
  sectionApps,
  handleDeleteAppClick,
  handleOnDrag,
  sectionIndex,
}) {
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
            {/**this is temporarily the delete app button i shall add those in the "..." of the app button */}
            <div className="topIcons">
              <span>
                <FontAwesomeIcon icon={faInfoCircle} color="grey" size="xs" />
              </span>
              <span>
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
            <span>{app.description}</span>
            <a href={app.link}>link to the app</a>
          </div>
        )
      )}
    </div>
  );
}
