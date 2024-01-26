import React, { useState, useEffect } from "react";
import "../css/sections.css";
import useAuth from "./hooks/UseAuth.js";
import Myapps from "./Myapps.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisV,
  faSignIn,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { isValidDateValue } from "@testing-library/user-event/dist/utils/index.js";

export default function Sections({
  sectionList,
  setSectionList,
  apps,
  defineCategoryId,
  defineCategoryName,
  OpenUpdateCategory,
}) {
  const [isActiveList, setIsActiveList] = useState(
    Array(sectionList.length).fill(false)
  );

  const [buttonDropdown, setButtonDropdown] = useState(
    Array(sectionList.length).fill(false)
  );

  const { access, axiosPrivate, user } = useAuth();

  const accessToken = access;

  useEffect(() => {
    console.log(accessToken);
    console.log(apps);
  }, []);

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
      setSectionList(sectionList.filter((f) => f.name !== section?.name));
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

      // if (draggedSectionIndex !== sectionIndex.toString()) {
      //   const newSectionList = sectionList.map((section, index) => {
      //     if (index === parseInt(draggedSectionIndex)) {
      //       const newApps = apps
      //         .filter((i) => i.category === section.name)
      //         .filter((app) => app.id !== appIndex);
      //       return {
      //         ...section,
      //         apps: newApps,
      //       };
      //     } else if (index === sectionIndex) {
      //       const newApps = [
      //         ...section.apps,
      //         { name: appTitle, image: appImage },
      //       ];
      //       return {
      //         ...section,
      //         apps: newApps,
      //       };
      //     } else {
      //       return section;
      //     }
      //   }
      //   );

      //   setSectionList(newSectionList);
      // }
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
              <button
                className="sectionDropDownBtn"
                onClick={() => toggleSection(index)}
              >
                {isActiveList[index] ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM377 271c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-87-87-87 87c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 167c9.4-9.4 24.6-9.4 33.9 0L377 271z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l87 87 87-87c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 345c-9.4 9.4-24.6 9.4-33.9 0L135 241z" />
                  </svg>
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

function AppSection({ sectionApps, handleOnDrag, sectionIndex, sectionName }) {
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
            {/**this is temporarily the delete app button i shall add those in the "..." of the app button */}
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
