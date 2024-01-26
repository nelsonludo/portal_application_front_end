import React, { useState } from "react";
import "../css/sections.css";
import useAuth from "./hooks/UseAuth.js";

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
